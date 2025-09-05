import type { IUnitStrategy } from './IUnitStrategy';
import type { UnitContext } from '../interfaces/IUnit';
import type { IStrategyInput } from '../interfaces/IStrategyInput';
import { ScaleValue } from '../enums/ScaleValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
import { DEFAULT_FALLBACK_VALUES, STRATEGY_PRIORITIES } from '../constants';
import { ScaleValueStrategyRegistry } from './registry/ScaleValueStrategyRegistry';

/**
 * Scale Unit Strategy
 * Handles scale-related calculations using the ScaleUnitCalculator
 */
export class ScaleUnitStrategy implements IUnitStrategy {
  readonly unitType = 'scale';
  private readonly factory = UnitCalculatorFactory.getInstance();
  private strategyRegistry: ScaleValueStrategyRegistry;

  // Scale value mappings using enums
  private readonly SCALE_VALUE_MAP = {
    [ScaleValue.FACTOR]: 1,
    [ScaleValue.FIT]: 0.5,
    [ScaleValue.STRETCH]: 2,
    [ScaleValue.FILL]: 1,
    [ScaleValue.MAINTAIN_ASPECT]: 1,
    [ScaleValue.IGNORE_ASPECT]: 1,
  } as const;

  constructor() {
    this.strategyRegistry = ScaleValueStrategyRegistry.getInstance();
  }

  /**
   * Calculate scale value using the appropriate strategy
   */
  calculate(input: IStrategyInput, context: UnitContext): number {
    // Handle direct numbers
    if (typeof input === 'number') {
      return input;
    }

    // Handle string keywords
    if (typeof input === 'string') {
      return this.calculateStringScale(input, context);
    }

    // Handle ScaleValue enum
    if (this.isScaleValue(input)) {
      return this.calculateScaleValue(input, context);
    }

    // Handle ScaleUnit enum
    if (this.isScaleUnit(input)) {
      return this.calculateScaleUnit(input, context);
    }

    // Handle random values
    if (this.isRandomValue(input)) {
      return input.getRandomValue();
    }

    // Handle legacy parent scale classes
    if (this.isParentScale(input)) {
      return this.calculateParentScale(input, context);
    }

    // Default fallback
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Check if this strategy can handle the input
   */
  canHandle(input: IStrategyInput): boolean {
    return (
      typeof input === 'number' ||
      typeof input === 'string' ||
      this.isScaleValue(input) ||
      this.isScaleUnit(input) ||
      this.isRandomValue(input) ||
      this.isParentScale(input)
    );
  }

  /**
   * Get strategy priority (lower = higher priority)
   */
  getPriority(): number {
    return STRATEGY_PRIORITIES.SCALE; // Medium priority for scale calculations
  }

  /**
   * Calculate scale from string keywords using enum logic
   */
  private calculateStringScale(input: string, context: UnitContext): number {
    // Map string to ScaleValue enum
    const scaleValue = this.mapStringToScaleValue(input);
    if (scaleValue) {
      return this.calculateScaleValue(scaleValue, context);
    }

    // Handle special scale keywords
    const specialScaleKeywords: Record<string, (context: UnitContext) => number> = {
      'fit': (context) => this.calculateFitScale(context),
      'fill': (context) => this.calculateFillScale(context),
    };

    const specialStrategy = specialScaleKeywords[input.toLowerCase()];
    if (specialStrategy) {
      return specialStrategy(context);
    }

    return 1;
  }

  /**
   * Map string input to ScaleValue enum
   */
  private mapStringToScaleValue(input: string): ScaleValue | null {
    const stringToScaleValueMap: Record<string, ScaleValue> = {
      'normal': ScaleValue.FACTOR,
      'factor': ScaleValue.FACTOR,
      'small': ScaleValue.FIT,
      'large': ScaleValue.STRETCH,
      'tiny': ScaleValue.MAINTAIN_ASPECT,
      'huge': ScaleValue.IGNORE_ASPECT,
    };

    return stringToScaleValueMap[input.toLowerCase()] || null;
  }

  /**
   * Calculate scale from ScaleValue enum using registry
   */
  private calculateScaleValue(input: ScaleValue, context: UnitContext): number {
    const scaleValueStrategy = this.strategyRegistry.getScaleValueStrategy(input);
    return scaleValueStrategy(context);
  }

  /**
   * Calculate scale from ScaleUnit enum
   */
  private calculateScaleUnit(input: ScaleUnit, context: UnitContext): number {
    const calculator = this.factory.createScaleUnit('dynamic', 'dynamic-scale', input, 1);
    return calculator.calculateScale(context);
  }

  /**
   * Calculate scale from parent scale classes
   */
  private calculateParentScale(input: unknown, context: UnitContext): number {
    if (
      context.parent &&
      typeof input === 'object' &&
      input !== null &&
      'getValue' in input &&
      typeof (input as { getValue(parent: unknown): number }).getValue === 'function'
    ) {
      return (input as { getValue(parent: unknown): number }).getValue(context.parent);
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Calculate fit scale based on context
   */
  private calculateFitScale(context: UnitContext): number {
    if (!context.parent) return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;

    const parentWidth = context.parent.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const parentHeight = context.parent.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const contentWidth = context.content?.width || DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const contentHeight = context.content?.height || DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;

    const scaleX = parentWidth / contentWidth;
    const scaleY = parentHeight / contentHeight;

    return Math.min(scaleX, scaleY);
  }

  /**
   * Calculate fill scale based on context
   */
  private calculateFillScale(context: UnitContext): number {
    if (!context.parent) return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;

    const parentWidth = context.parent.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const parentHeight = context.parent.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const contentWidth = context.content?.width || DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const contentHeight = context.content?.height || DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;

    const scaleX = parentWidth / contentWidth;
    const scaleY = parentHeight / contentHeight;

    return Math.max(scaleX, scaleY);
  }

  /**
   * Calculate using calculator for complex cases
   */
  private calculateWithCalculator(input: ScaleValue, context: UnitContext): number {
    const calculator = this.factory.createScaleUnit(
      'dynamic',
      'dynamic-scale',
      ScaleUnit.FACTOR,
      input
    );
    return calculator.calculateScale(context);
  }

  /**
   * Type guards
   */
  private isScaleValue(input: unknown): input is ScaleValue {
    return Object.values(ScaleValue).includes(input as ScaleValue);
  }

  private isScaleUnit(input: unknown): input is ScaleUnit {
    return Object.values(ScaleUnit).includes(input as ScaleUnit);
  }

  private isRandomValue(input: unknown): input is { getRandomValue(): number } {
    return (
      input !== null &&
      input !== undefined &&
      typeof (input as { getRandomValue(): number }).getRandomValue === 'function'
    );
  }

  private isParentScale(input: unknown): input is { getValue(parent: unknown): number } {
    return (
      input !== null &&
      input !== undefined &&
      typeof (input as { getValue(parent: unknown): number }).getValue === 'function'
    );
  }

  /**
   * Get scale strategy information
   */
  getStrategyInfo(): {
    unitType: string;
    priority: number;
    supportedInputs: string[];
    capabilities: string[];
  } {
    return {
      unitType: this.unitType,
      priority: this.getPriority(),
      supportedInputs: ['number', 'string', 'ScaleValue', 'ScaleUnit', 'array', 'object'],
      capabilities: [
        'direct numeric values',
        'string keywords',
        'enum values',
        'array expressions',
        'configuration objects',
        'CSS-like strings',
        'parent-relative scaling',
        'aspect ratio preservation',
        'constraint-based scaling',
      ],
    };
  }
}

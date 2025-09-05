import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Refactored ScaleUnitCalculator class
 * Uses strategy pattern and DI for better maintainability
 */
export class RefactoredScaleUnitCalculator implements IScaleUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SCALE;
  public readonly scaleUnit: ScaleUnit;
  public readonly baseValue: number | ScaleValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  private strategyRegistry: any;

  constructor(
    id: string,
    name: string,
    scaleUnit: ScaleUnit,
    baseValue: number | ScaleValue,
    maintainAspectRatio: boolean = false,
    strategyRegistry?: any
  ) {
    this.id = id;
    this.name = name;
    this.scaleUnit = scaleUnit;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;
    
    // Resolve strategy registry from DI container
    this.strategyRegistry = strategyRegistry || container.resolve(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY);
  }

  /**
   * Calculate the actual scale value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculateScale(context);
  }

  /**
   * Calculate scale based on context using strategy pattern
   */
  calculateScale(context: UnitContext): number {
    // For numeric values, return directly
    if (typeof this.baseValue === 'number') {
      return this.baseValue;
    }

    // Use strategy pattern for ScaleValue enum
    try {
      const strategy = this.strategyRegistry.getScaleValueStrategy(this.baseValue as ScaleValue);
      if (strategy) {
        return strategy(context);
      }
    } catch (error) {
      // Fallback to switch statement if strategy not available
      return this.fallbackScaleValue(context);
    }

    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Fallback scale value calculation when strategy is not available
   */
  private fallbackScaleValue(context: UnitContext): number {
    if (this.baseValue && Object.values(ScaleValue).includes(this.baseValue as ScaleValue)) {
      switch (this.baseValue as ScaleValue) {
        case ScaleValue.FILL:
          return this.calculateFillScale(context);
        case ScaleValue.FIT:
          return this.calculateFitScale(context);
        case ScaleValue.COVER:
          return this.calculateCoverScale(context);
        case ScaleValue.CONTAIN:
          return this.calculateContainScale(context);
        case ScaleValue.STRETCH:
          return this.calculateStretchScale(context);
        case ScaleValue.CENTER:
          return this.calculateCenterScale(context);
        case ScaleValue.TOP:
          return this.calculateTopScale(context);
        case ScaleValue.BOTTOM:
          return this.calculateBottomScale(context);
        case ScaleValue.LEFT:
          return this.calculateLeftScale(context);
        case ScaleValue.RIGHT:
          return this.calculateRightScale(context);
        case ScaleValue.AUTO:
          return this.calculateAutoScale(context);
        default:
          return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
      }
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Validate unit in given context
   */
  validate(context: UnitContext): boolean {
    if (typeof this.baseValue === 'number') {
      return true; // Numeric values are always valid
    }

    // Check if the baseValue requires specific context
    if (this.baseValue === ScaleValue.FILL || this.baseValue === ScaleValue.FIT) {
      return !!(context.parent || context.scene);
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `RefactoredScaleUnitCalculator(${this.name}, ${this.scaleUnit})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<IScaleUnit>): RefactoredScaleUnitCalculator {
    const cloned = new RefactoredScaleUnitCalculator(
      this.id,
      this.name,
      this.scaleUnit,
      this.baseValue,
      this.maintainAspectRatio,
      this.strategyRegistry
    );
    return cloned;
  }

  // Scale calculation methods
  private calculateFillScale(context: UnitContext): number {
    if (context.parent) {
      return Math.min(
        context.parent.width / (context.content?.width || 1),
        context.parent.height / (context.content?.height || 1)
      );
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateFitScale(context: UnitContext): number {
    if (context.parent && context.content) {
      const scaleX = context.parent.width / context.content.width;
      const scaleY = context.parent.height / context.content.height;
      return Math.min(scaleX, scaleY);
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateCoverScale(context: UnitContext): number {
    if (context.parent && context.content) {
      const scaleX = context.parent.width / context.content.width;
      const scaleY = context.parent.height / context.content.height;
      return Math.max(scaleX, scaleY);
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateContainScale(context: UnitContext): number {
    if (context.parent && context.content) {
      const scaleX = context.parent.width / context.content.width;
      const scaleY = context.parent.height / context.content.height;
      return Math.min(scaleX, scaleY);
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateStretchScale(context: UnitContext): number {
    if (context.parent && context.content) {
      const scaleX = context.parent.width / context.content.width;
      const scaleY = context.parent.height / context.content.height;
      return this.maintainAspectRatio ? Math.min(scaleX, scaleY) : scaleX;
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateCenterScale(context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateTopScale(context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateBottomScale(context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateLeftScale(context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateRightScale(context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateAutoScale(context: UnitContext): number {
    if (context.content) {
      return Math.min(
        (context.parent?.width || 800) / context.content.width,
        (context.parent?.height || 600) / context.content.height
      );
    }
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Get scale information for debugging
   */
  getScaleInfo(): {
    scaleUnit: ScaleUnit;
    maintainAspectRatio: boolean;
    isResponsive: boolean;
  } {
    return {
      scaleUnit: this.scaleUnit,
      maintainAspectRatio: this.maintainAspectRatio,
      isResponsive: this.isResponsive(),
    };
  }
}

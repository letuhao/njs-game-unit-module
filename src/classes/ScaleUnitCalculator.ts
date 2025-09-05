import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { ScaleUnitStrategyRegistry } from '../strategies/registry/ScaleUnitStrategyRegistry';

/**
 * ScaleUnitCalculator class
 * Implements scale unit calculations for responsive scaling
 */
export class ScaleUnitCalculator implements IScaleUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SCALE;
  public readonly scaleUnit: ScaleUnit;
  public readonly baseValue: number | ScaleValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  private minScale?: number;
  private maxScale?: number;
  private uniformScaling: boolean = false;
  private strategyRegistry: ScaleUnitStrategyRegistry;

  constructor(
    id: string,
    name: string,
    scaleUnit: ScaleUnit,
    baseValue: number | ScaleValue,
    maintainAspectRatio: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.scaleUnit = scaleUnit;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;
    this.strategyRegistry = ScaleUnitStrategyRegistry.getInstance();
  }

  /**
   * Calculate the actual scale value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculateScale(context);
  }

  /**
   * Calculate scale based on context
   */
  calculateScale(context: UnitContext): number {
    // Get the appropriate strategy for the scale unit
    const scaleUnitStrategy = this.strategyRegistry.getScaleUnitStrategy(this.scaleUnit);
    const baseScale = scaleUnitStrategy(this.baseValue, context);

    // Apply the behavior based on ScaleValue
    return this.applyScaleValue(baseScale, context);
  }

  /**
   * Apply scale value behavior to base scale
   */
  private applyScaleValue(baseScale: number, context: UnitContext): number {
    // If baseValue is a ScaleValue enum, use it for behavior
    if (
      typeof this.baseValue === 'string' &&
      Object.values(ScaleValue).includes(this.baseValue as ScaleValue)
    ) {
      const scaleValueStrategy = this.strategyRegistry.getScaleValueStrategy(this.baseValue as ScaleValue);
      return this.applyConstraints(scaleValueStrategy(baseScale, context));
    }

    // If baseValue is a number, just return the base scale (direct value)
    return this.applyConstraints(baseScale);
  }

  /**
   * Calculate X scale specifically
   */
  calculateScaleX(context: UnitContext): number {
    if (this.uniformScaling) {
      return this.calculateScale(context);
    }
    return this.calculateScale(context);
  }

  /**
   * Calculate Y scale specifically
   */
  calculateScaleY(context: UnitContext): number {
    if (this.uniformScaling) {
      return this.calculateScale(context);
    }
    return this.calculateScale(context);
  }

  /**
   * Calculate both X and Y scales
   */
  calculateBoth(context: UnitContext): { scaleX: number; scaleY: number } {
    const scale = this.calculateScale(context);
    return { scaleX: scale, scaleY: scale };
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Get minimum scale constraint
   */
  getMinScale(): number | undefined {
    return this.minScale;
  }

  /**
   * Get maximum scale constraint
   */
  getMaxScale(): number | undefined {
    return this.maxScale;
  }

  /**
   * Set scale constraints
   */
  setScaleConstraints(min?: number, max?: number): void {
    this.minScale = min;
    this.maxScale = max;
  }

  /**
   * Check if scaling should be uniform
   */
  isUniformScaling(): boolean {
    return this.uniformScaling;
  }

  /**
   * Set uniform scaling mode
   */
  setUniformScaling(uniform: boolean): void {
    this.uniformScaling = uniform;
  }

  /**
   * Validate unit in given context
   */
  validate(context: UnitContext): boolean {
    // Check if the scaleUnit requires specific context
    if (
      this.scaleUnit === ScaleUnit.PARENT_SCALE ||
      this.scaleUnit === ScaleUnit.PARENT_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.PARENT_HEIGHT_SCALE
    ) {
      return !!context.parent;
    }
    if (
      this.scaleUnit === ScaleUnit.SCENE_SCALE ||
      this.scaleUnit === ScaleUnit.SCENE_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.SCENE_HEIGHT_SCALE
    ) {
      return !!context.scene;
    }
    if (
      this.scaleUnit === ScaleUnit.VIEWPORT_SCALE ||
      this.scaleUnit === ScaleUnit.VIEWPORT_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.VIEWPORT_HEIGHT_SCALE
    ) {
      return !!context.viewport;
    }
    // Check if the baseValue requires specific context
    if (
      this.baseValue === ScaleValue.CONTENT_SCALE ||
      this.baseValue === ScaleValue.INTRINSIC_SCALE
    ) {
      return !!context.content;
    }
    if (this.baseValue === ScaleValue.BREAKPOINT_SCALE) {
      return !!context.breakpoint;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `ScaleUnitCalculator(${this.name}, ${this.scaleUnit})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<IScaleUnit>): ScaleUnitCalculator {
    const cloned = new ScaleUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.scaleUnit ?? this.scaleUnit,
      overrides?.baseValue ?? this.baseValue,
      overrides?.maintainAspectRatio ?? this.maintainAspectRatio
    );

    if (this.minScale !== undefined) cloned.setScaleConstraints(this.minScale, this.maxScale);
    cloned.setUniformScaling(this.uniformScaling);
    return cloned;
  }

  /**
   * Apply constraints to scale value
   */
  private applyConstraints(value: number): number {
    if (this.minScale !== undefined && value < this.minScale) {
      return this.minScale;
    }
    if (this.maxScale !== undefined && value > this.maxScale) {
      return this.maxScale;
    }
    return value;
  }

  /**
   * Check if the scale has constraints
   */
  hasConstraints(): boolean {
    return this.minScale !== undefined || this.maxScale !== undefined;
  }

  /**
   * Get constraint information
   */
  getConstraintInfo(): { min?: number; max?: number; hasConstraints: boolean } {
    return {
      min: this.minScale,
      max: this.maxScale,
      hasConstraints: this.hasConstraints(),
    };
  }

  /**
   * Validate if scale value is within constraints
   */
  validateScale(value: number): boolean {
    if (this.minScale !== undefined && value < this.minScale) {
      return false;
    }
    if (this.maxScale !== undefined && value > this.maxScale) {
      return false;
    }
    return true;
  }

  /**
   * Get scale information for debugging
   */
  getScaleInfo(): {
    scaleUnit: ScaleUnit;
    maintainAspectRatio: boolean;
    uniformScaling: boolean;
    hasConstraints: boolean;
    isResponsive: boolean;
  } {
    return {
      scaleUnit: this.scaleUnit,
      maintainAspectRatio: this.maintainAspectRatio,
      uniformScaling: this.uniformScaling,
      hasConstraints: this.hasConstraints(),
      isResponsive: this.isResponsive(),
    };
  }

  /**
   * Calculate the optimal scale for a given content and container
   */
  calculateOptimalScale(
    contentWidth: number,
    contentHeight: number,
    containerWidth: number,
    containerHeight: number
  ): number {
    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }
}

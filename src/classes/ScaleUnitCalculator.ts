import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

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
    // For numeric values, return directly
    if (typeof this.baseValue === 'number') {
      return this.baseValue;
    }

    // Use strategy pattern for ScaleValue enum
    try {
      const strategyRegistry = container.resolve(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY);
      const strategy = (strategyRegistry as any).getScaleValueStrategy(this.baseValue as ScaleValue);
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
    return `ScaleUnitCalculator(${this.name}, ${this.scaleUnit})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<IScaleUnit>): ScaleUnitCalculator {
    const cloned = new ScaleUnitCalculator(
      this.id,
      this.name,
      this.scaleUnit,
      this.baseValue,
      this.maintainAspectRatio
    );
    return cloned;
  }

  /**
   * Format the unit value
   */
  format(format: string): string {
    const value = this.calculate({} as UnitContext);
    return `${value}${this.scaleUnit}`;
  }

  /**
   * Calculate X scale specifically
   */
  calculateScaleX(context: UnitContext): number {
    return this.calculate(context);
  }

  /**
   * Calculate Y scale specifically
   */
  calculateScaleY(context: UnitContext): number {
    return this.calculate(context);
  }

  /**
   * Calculate both X and Y scale
   */
  calculateBoth(context: UnitContext): { scaleX: number; scaleY: number } {
    const scale = this.calculate(context);
    return { scaleX: scale, scaleY: scale };
  }

  /**
   * Get minimum scale value
   */
  getMinScale(): number | undefined {
    return 0.1;
  }

  /**
   * Get maximum scale value
   */
  getMaxScale(): number | undefined {
    return 10.0;
  }

  /**
   * Check if scale is valid
   */
  isValidScale(scale: number): boolean {
    const minScale = this.getMinScale();
    const maxScale = this.getMaxScale();
    return (minScale === undefined || scale >= minScale) && (maxScale === undefined || scale <= maxScale);
  }

  /**
   * Get scale constraints
   */
  getScaleConstraints(): { min: number | undefined; max: number | undefined } {
    return {
      min: this.getMinScale(),
      max: this.getMaxScale(),
    };
  }

  /**
   * Set scale constraints
   */
  setScaleConstraints(min?: number, max?: number): void {
    // Implementation for setting scale constraints
    // This would typically store the constraints in the class
  }

  /**
   * Check if scaling is uniform
   */
  isUniformScaling(): boolean {
    return true; // Default to uniform scaling
  }

  /**
   * Set uniform scaling
   */
  setUniformScaling(uniform: boolean): void {
    // Implementation for setting uniform scaling
    // This would typically store the uniform scaling preference
  }

  // Scale calculation methods
  private calculateFillScale(context: UnitContext): number {
    if (context.parent && context.content) {
      return Math.min(
        context.parent.width / context.content.width,
        context.parent.height / context.content.height
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
import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * SizeUnitCalculator class
 * Implements size unit calculations for responsive sizing
 */
export class SizeUnitCalculator implements ISizeUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SIZE;
  public readonly sizeUnit: SizeUnit;
  public readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  public readonly baseValue: number | SizeValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  constructor(
    id: string,
    name: string,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    baseValue: number | SizeValue,
    maintainAspectRatio: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.sizeUnit = sizeUnit;
    this.dimension = dimension;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;
  }

  /**
   * Calculate the actual size value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculateSize(context);
  }

  /**
   * Calculate size based on context
   */
  calculateSize(context: UnitContext): number {
    // For numeric values, return directly
    if (typeof this.baseValue === 'number') {
      return this.baseValue;
    }

    // Use strategy pattern for SizeValue enum
    try {
      const strategyRegistry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
      const strategy = (strategyRegistry as any).getSizeValueStrategy(this.baseValue as SizeValue);
      if (strategy) {
        return strategy(context);
      }
    } catch (error) {
      // Fallback to switch statement if strategy not available
      return this.fallbackSizeValue(context);
    }

    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Fallback size value calculation when strategy is not available
   */
  private fallbackSizeValue(context: UnitContext): number {
    if (this.baseValue && Object.values(SizeValue).includes(this.baseValue as SizeValue)) {
      switch (this.baseValue as SizeValue) {
        case SizeValue.PIXEL:
          return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
        case SizeValue.FILL:
          return this.calculateFillSize(context);
        case SizeValue.AUTO:
          return this.calculateAutoSize(context);
        case SizeValue.CONTENT:
          return this.calculateContentSize(context);
        case SizeValue.PARENT:
          return this.calculateParentSize(context);
        case SizeValue.VIEWPORT:
          return this.calculateViewportSize(context);
        case SizeValue.SCENE:
          return this.calculateSceneSize(context);
        default:
          return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      }
    }
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate width specifically
   */
  calculateWidth(context: UnitContext): number {
    if (this.dimension === Dimension.HEIGHT) {
      throw new Error('Cannot calculate width for height-only dimension');
    }
    return this.calculateSize(context);
  }

  /**
   * Calculate height specifically
   */
  calculateHeight(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      throw new Error('Cannot calculate height for width-only dimension');
    }
    return this.calculateSize(context);
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
    if (this.baseValue === SizeValue.FILL || this.baseValue === SizeValue.AUTO) {
      return !!(context.parent || context.scene);
    }
    if (this.baseValue === SizeValue.CONTENT) {
      return !!context.content;
    }
    if (this.baseValue === SizeValue.VIEWPORT) {
      return !!context.viewport;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `SizeUnitCalculator(${this.name}, ${this.sizeUnit}, ${this.dimension})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<ISizeUnit>): SizeUnitCalculator {
    const cloned = new SizeUnitCalculator(
      this.id,
      this.name,
      this.sizeUnit,
      this.dimension,
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
    return `${value}${this.sizeUnit}`;
  }

  /**
   * Get minimum size value
   */
  getMinSize(): number | undefined {
    return 1;
  }

  /**
   * Get maximum size value
   */
  getMaxSize(): number | undefined {
    return 10000;
  }

  /**
   * Set size constraints
   */
  setSizeConstraints(min?: number, max?: number): void {
    // Implementation for setting size constraints
    // This would typically store the constraints in the class
  }

  // Size calculation methods
  private calculateFillSize(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      return context.parent?.width || context.scene?.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }
    if (this.dimension === Dimension.HEIGHT) {
      return context.parent?.height || context.scene?.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }
    return Math.min(
      context.parent?.width || context.scene?.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT,
      context.parent?.height || context.scene?.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT
    );
  }

  private calculateAutoSize(context: UnitContext): number {
    if (context.content) {
      if (this.dimension === Dimension.WIDTH) {
        return context.content.width;
      }
      if (this.dimension === Dimension.HEIGHT) {
        return context.content.height;
      }
      return Math.max(context.content.width, context.content.height);
    }
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  private calculateContentSize(context: UnitContext): number {
    if (context.content) {
      if (this.dimension === Dimension.WIDTH) {
        return context.content.width;
      }
      if (this.dimension === Dimension.HEIGHT) {
        return context.content.height;
      }
      return Math.max(context.content.width, context.content.height);
    }
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  private calculateParentSize(context: UnitContext): number {
    if (context.parent) {
      if (this.dimension === Dimension.WIDTH) {
        return context.parent.width;
      }
      if (this.dimension === Dimension.HEIGHT) {
        return context.parent.height;
      }
      return Math.min(context.parent.width, context.parent.height);
    }
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  private calculateViewportSize(context: UnitContext): number {
    if (context.viewport) {
      if (this.dimension === Dimension.WIDTH) {
        return context.viewport.width;
      }
      if (this.dimension === Dimension.HEIGHT) {
        return context.viewport.height;
      }
      return Math.min(context.viewport.width, context.viewport.height);
    }
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  private calculateSceneSize(context: UnitContext): number {
    if (context.scene) {
      if (this.dimension === Dimension.WIDTH) {
        return context.scene.width;
      }
      if (this.dimension === Dimension.HEIGHT) {
        return context.scene.height;
      }
      return Math.min(context.scene.width, context.scene.height);
    }
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Get size information for debugging
   */
  getSizeInfo(): {
    sizeUnit: SizeUnit;
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
    maintainAspectRatio: boolean;
    isResponsive: boolean;
  } {
    return {
      sizeUnit: this.sizeUnit,
      dimension: this.dimension,
      maintainAspectRatio: this.maintainAspectRatio,
      isResponsive: this.isResponsive(),
    };
  }
}
import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { SizeUnitStrategyRegistry } from '../strategies/registry/SizeUnitStrategyRegistry';

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
  public readonly maintainAspectRatio: boolean;
  public readonly baseValue: number | SizeValue;
  public readonly isActive: boolean = true;

  private minSize?: number;
  private maxSize?: number;
  private strategyRegistry: SizeUnitStrategyRegistry;

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
    this.strategyRegistry = SizeUnitStrategyRegistry.getInstance();
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
    // Get the appropriate strategy for the size unit
    const sizeUnitStrategy = this.strategyRegistry.getSizeUnitStrategy(this.sizeUnit);
    const measuredSize = sizeUnitStrategy(this.baseValue, context);

    // Apply the behavior based on SizeValue
    return this.applySizeValue(measuredSize, context);
  }

  /**
   * Apply size value behavior to measured size
   */
  private applySizeValue(measuredSize: number, context: UnitContext): number {
    // If baseValue is a SizeValue enum, use it for behavior
    if (this.baseValue && Object.values(SizeValue).includes(this.baseValue as SizeValue)) {
      const sizeValueStrategy = this.strategyRegistry.getSizeValueStrategy(this.baseValue as SizeValue);
      return this.applyConstraints(sizeValueStrategy(measuredSize, context));
    }

    // If baseValue is a number, just return the measured size (direct value)
    return this.applyConstraints(measuredSize);
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
   * Get minimum size constraint
   */
  getMinSize(): number | undefined {
    return this.minSize;
  }

  /**
   * Get maximum size constraint
   */
  getMaxSize(): number | undefined {
    return this.maxSize;
  }

  /**
   * Set size constraints
   */
  setSizeConstraints(min?: number, max?: number): void {
    this.minSize = min;
    this.maxSize = max;
  }

  /**
   * Validate unit in given context
   */
  validate(context: UnitContext): boolean {
    // Check if the sizeUnit requires specific context
    if (this.sizeUnit === SizeUnit.PARENT_WIDTH || this.sizeUnit === SizeUnit.PARENT_HEIGHT) {
      return !!context.parent;
    }
    if (this.sizeUnit === SizeUnit.SCENE_WIDTH || this.sizeUnit === SizeUnit.SCENE_HEIGHT) {
      return !!context.scene;
    }
    if (this.sizeUnit === SizeUnit.VIEWPORT_WIDTH || this.sizeUnit === SizeUnit.VIEWPORT_HEIGHT) {
      return !!context.viewport;
    }
    // Check if the baseValue requires specific context
    if (this.baseValue === SizeValue.CONTENT || this.baseValue === SizeValue.INTRINSIC) {
      return !!context.content;
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
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.sizeUnit ?? this.sizeUnit,
      overrides?.dimension ?? this.dimension,
      overrides?.baseValue ?? this.baseValue,
      overrides?.maintainAspectRatio ?? this.maintainAspectRatio
    );

    if (this.minSize !== undefined) cloned.setSizeConstraints(this.minSize, this.maxSize);
    return cloned;
  }

  /**
   * Apply constraints to size value
   */
  private applyConstraints(value: number): number {
    if (this.minSize !== undefined && value < this.minSize) {
      return this.minSize;
    }
    if (this.maxSize !== undefined && value > this.maxSize) {
      return this.maxSize;
    }
    return value;
  }

  /**
   * Get the aspect ratio if maintaining aspect ratio
   */
  getAspectRatio(): number | undefined {
    if (!this.maintainAspectRatio) return undefined;

    // If we have both width and height constraints, calculate aspect ratio
    if (this.minSize !== undefined && this.maxSize !== undefined) {
      return this.maxSize / this.minSize;
    }

    return undefined;
  }

  /**
   * Check if the unit has size constraints
   */
  hasConstraints(): boolean {
    return this.minSize !== undefined || this.maxSize !== undefined;
  }

  /**
   * Get constraint information
   */
  getConstraintInfo(): { min?: number; max?: number; hasConstraints: boolean } {
    return {
      min: this.minSize,
      max: this.maxSize,
      hasConstraints: this.hasConstraints(),
    };
  }
}

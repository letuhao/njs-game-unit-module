import type { IPositionUnit } from '../interfaces/IPositionUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { Dimension } from '../enums/Dimension';
import { PositionValue } from '../enums/PositionValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Refactored PositionUnitCalculator class
 * Uses Strategy Pattern instead of large switch statements
 * Implements position unit calculations for responsive positioning
 * 
 * Note: This class focuses solely on position calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class RefactoredPositionUnitCalculator implements IPositionUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.POSITION;
  public readonly positionUnit: PositionUnit;
  public readonly axis: Dimension.X | Dimension.Y | Dimension.XY;
  public readonly baseValue: number | PositionValue;
  public readonly isActive: boolean = true;

  private minPosition: number | undefined;
  private maxPosition: number | undefined;
  private performanceMetrics = {
    totalCalculations: 0,
    averageCalculationTime: 0,
    strategyExecutions: 0,
  };

  constructor(
    id: string,
    name: string,
    positionUnit: PositionUnit,
    axis: Dimension.X | Dimension.Y | Dimension.XY,
    baseValue: number | PositionValue,
    maintainAspectRatio: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.positionUnit = positionUnit;
    this.axis = axis;
    this.baseValue = baseValue;
  }

  /**
   * Calculate position value using strategy pattern
   */
  public calculate(context: UnitContext): number {
    const startTime = performance.now();
    
    try {
      if (!this.validate(context)) {
        return this.getFallbackValue();
      }

      // Simple calculation based on position unit
      let result = this.calculatePosition(context);

      // Apply constraints
      const constrainedResult = this.applyConstraints(result);

      // Update performance metrics
      this.updatePerformanceMetrics(startTime);

      return constrainedResult;
    } catch (error) {
      // Return fallback value on error
      return this.getFallbackValue();
    }
  }

  /**
   * Calculate position based on unit type
   */
  public calculatePosition(context: UnitContext): number {
    switch (this.positionUnit) {
      case PositionUnit.PIXEL:
        return typeof this.baseValue === 'number' ? this.baseValue : 0;
      case PositionUnit.PERCENTAGE:
        return this.calculatePercentagePosition(context);
      case PositionUnit.CENTER:
        return this.calculateCenterPosition(context);
      case PositionUnit.LEFT:
        return 0;
      case PositionUnit.RIGHT:
        return context.parent?.width || context.scene?.width || 0;
      case PositionUnit.TOP:
        return 0;
      case PositionUnit.BOTTOM:
        return context.parent?.height || context.scene?.height || 0;
      case PositionUnit.RANDOM:
        return this.calculateRandomPosition(context);
      default:
        return this.getFallbackValue();
    }
  }

  /**
   * Calculate X position
   */
  public calculateX(context: UnitContext): number {
    if (this.axis === Dimension.Y) {
      return 0;
    }
    return this.calculatePosition(context);
  }

  /**
   * Calculate Y position
   */
  public calculateY(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      return 0;
    }
    return this.calculatePosition(context);
  }

  /**
   * Calculate both X and Y positions
   */
  public calculateBoth(context: UnitContext): { x: number; y: number } {
    return {
      x: this.calculateX(context),
      y: this.calculateY(context),
    };
  }

  /**
   * Calculate percentage position
   */
  private calculatePercentagePosition(context: UnitContext): number {
    const percentage = typeof this.baseValue === 'number' ? this.baseValue : 0;
    const maxValue = this.axis === Dimension.X 
      ? (context.parent?.width || context.scene?.width || context.viewport?.width || 0)
      : (context.parent?.height || context.scene?.height || context.viewport?.height || 0);
    
    return (maxValue * percentage) / 100;
  }

  /**
   * Calculate center position
   */
  private calculateCenterPosition(context: UnitContext): number {
    const maxValue = this.axis === Dimension.X 
      ? (context.parent?.width || context.scene?.width || context.viewport?.width || 0)
      : (context.parent?.height || context.scene?.height || context.viewport?.height || 0);
    
    return maxValue / 2;
  }

  /**
   * Calculate random position
   */
  private calculateRandomPosition(context: UnitContext): number {
    const maxValue = this.axis === Dimension.X 
      ? (context.parent?.width || context.scene?.width || context.viewport?.width || 0)
      : (context.parent?.height || context.scene?.height || context.viewport?.height || 0);
    
    return Math.random() * maxValue;
  }

  /**
   * Validate the calculator configuration and context
   */
  public validate(context: UnitContext): boolean {
    if (!context) {
      return false;
    }

    // Validate context properties
    if (!context.parent && !context.scene && !context.viewport) {
      return false;
    }

    // Validate axis-specific requirements
    if (this.axis === Dimension.X || this.axis === Dimension.XY) {
      if (!context.parent?.x && !context.scene?.width && !context.viewport?.width) {
        return false;
      }
    }

    if (this.axis === Dimension.Y || this.axis === Dimension.XY) {
      if (!context.parent?.y && !context.scene?.height && !context.viewport?.height) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the calculator is responsive to context changes
   */
  public isResponsive(): boolean {
    return this.positionUnit !== PositionUnit.PIXEL;
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics() {
    return { ...this.performanceMetrics };
  }

  /**
   * Clear performance metrics
   */
  public clearPerformanceMetrics(): void {
    this.performanceMetrics = {
      totalCalculations: 0,
      averageCalculationTime: 0,
      strategyExecutions: 0,
    };
  }

  /**
   * Set position constraints
   */
  public setPositionConstraints(minPosition?: number, maxPosition?: number): void {
    this.minPosition = minPosition ?? undefined;
    this.maxPosition = maxPosition ?? undefined;
  }

  /**
   * Get position constraints
   */
  public getPositionConstraints(): { minPosition?: number | undefined; maxPosition?: number | undefined } {
    return {
      minPosition: this.minPosition,
      maxPosition: this.maxPosition,
    };
  }

  /**
   * Clone the calculator with optional overrides
   */
  public clone(overrides?: Partial<IPositionUnit>): IPositionUnit {
    return new RefactoredPositionUnitCalculator(
      overrides?.id || this.id,
      overrides?.name || this.name,
      this.positionUnit,
      this.axis,
      this.baseValue,
      false // maintainAspectRatio not applicable for position
    );
  }

  /**
   * String representation
   */
  public toString(): string {
    return `RefactoredPositionUnitCalculator(${this.id})`;
  }

  /**
   * Format the calculator with a specific format
   */
  public format(format: string): string {
    switch (format) {
      case 'json':
        return JSON.stringify({
          id: this.id,
          name: this.name,
          unitType: this.unitType,
          positionUnit: this.positionUnit,
          axis: this.axis
        });
      case 'px':
        return `${this.baseValue}px`;
      case 'detailed':
        return `RefactoredPositionUnitCalculator(id: ${this.id}, name: ${this.name}, unit: ${this.positionUnit}, axis: ${this.axis})`;
      default:
        return this.toString();
    }
  }

  /**
   * Get alignment
   */
  public getAlignment(): string | undefined {
    return undefined; // Default implementation
  }

  /**
   * Set alignment
   */
  public setAlignment(alignment: string): void {
    // Default implementation - no-op
  }

  /**
   * Get offset
   */
  public getOffset(): number {
    return 0; // Default implementation
  }

  /**
   * Set offset
   */
  public setOffset(offset: number): void {
    // Default implementation - no-op
  }


  /**
   * Apply position constraints
   */
  private applyConstraints(value: number): number {
    if (this.minPosition !== undefined && value < this.minPosition) {
      return this.minPosition;
    }
    
    if (this.maxPosition !== undefined && value > this.maxPosition) {
      return this.maxPosition;
    }
    
    return value;
  }

  /**
   * Get fallback value
   */
  private getFallbackValue(): number {
    if (typeof this.baseValue === 'number') {
      return this.baseValue;
    }
    
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(startTime: number): void {
    const endTime = performance.now();
    const calculationTime = endTime - startTime;
    
    this.performanceMetrics.totalCalculations++;
    this.performanceMetrics.strategyExecutions++;
    
    // Update average calculation time
    const totalTime = this.performanceMetrics.averageCalculationTime * (this.performanceMetrics.totalCalculations - 1);
    this.performanceMetrics.averageCalculationTime = (totalTime + calculationTime) / this.performanceMetrics.totalCalculations;
  }
}
import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';

/**
 * Refactored SizeUnitCalculator class
 * Uses Strategy Pattern instead of large switch statements
 * Implements size unit calculations for responsive sizing
 * Optimized for high-performance real-time calculations
 * 
 * Note: This class focuses solely on size calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class RefactoredSizeUnitCalculator implements ISizeUnit {
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
  private readonly strategyRegistry: SizeValueCalculationStrategyRegistry;
  private performanceMetrics = {
    totalCalculations: 0,
    averageCalculationTime: 0,
    strategyExecutions: 0,
  };

  constructor(
    id: string,
    name: string,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    baseValue: number | SizeValue,
    maintainAspectRatio: boolean = false,
    strategyRegistry?: SizeValueCalculationStrategyRegistry
  ) {
    this.id = id;
    this.name = name;
    this.sizeUnit = sizeUnit;
    this.dimension = dimension;
    this.maintainAspectRatio = maintainAspectRatio;
    this.baseValue = baseValue;

    // Initialize strategy registry
    this.strategyRegistry = strategyRegistry || new SizeValueCalculationStrategyRegistry();
    
    this.initializeStrategies();
  }

  /**
   * Calculate size value using strategy pattern
   */
  public calculate(context: UnitContext): number {
    const startTime = performance.now();
    
    try {
      if (!this.validate(context)) {
        return this.getFallbackValue();
      }

      // Get calculation from strategy registry
      const result = this.strategyRegistry.executeStrategy(
        this.baseValue as SizeValue,
        this.sizeUnit,
        context
      );

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

    // Validate dimension-specific requirements
    if (this.dimension === Dimension.WIDTH || this.dimension === Dimension.BOTH) {
      if (!context.parent?.width && !context.scene?.width && !context.viewport?.width) {
        return false;
      }
    }

    if (this.dimension === Dimension.HEIGHT || this.dimension === Dimension.BOTH) {
      if (!context.parent?.height && !context.scene?.height && !context.viewport?.height) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the calculator is responsive to context changes
   */
  public isResponsive(): boolean {
    return this.sizeUnit !== SizeUnit.PIXEL;
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
   * Set size constraints
   */
  public setSizeConstraints(minSize?: number, maxSize?: number): void {
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  /**
   * Get size constraints
   */
  public getSizeConstraints() {
    return {
      minSize: this.minSize,
      maxSize: this.maxSize,
    };
  }

  /**
   * Clone the calculator with optional overrides
   */
  public clone(overrides?: Partial<ISizeUnit>): ISizeUnit {
    return new RefactoredSizeUnitCalculator(
      overrides?.id || this.id,
      overrides?.name || this.name,
      this.sizeUnit,
      this.dimension,
      this.baseValue,
      this.maintainAspectRatio,
      this.strategyRegistry
    );
  }

  /**
   * String representation
   */
  public toString(): string {
    return `RefactoredSizeUnitCalculator(${this.id})`;
  }

  /**
   * Initialize strategies in the registry
   */
  private initializeStrategies(): void {
    // This would typically register all available strategies
    // For now, we'll assume they're already registered
  }

  /**
   * Apply size constraints
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
   * Get fallback value
   */
  private getFallbackValue(): number {
    if (typeof this.baseValue === 'number') {
      return this.baseValue;
    }
    
    return DEFAULT_FALLBACK_VALUES.SIZE;
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
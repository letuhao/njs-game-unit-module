import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { ScaleValueCalculationStrategyRegistry } from '../strategies/value/ScaleValueCalculationStrategyRegistry';

/**
 * Refactored ScaleUnitCalculator class
 * Uses Strategy Pattern instead of large switch statements
 * Implements scale unit calculations for responsive scaling
 * 
 * Note: This class focuses solely on scale calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class RefactoredScaleUnitCalculator implements IScaleUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SCALE;
  public readonly scaleUnit: ScaleUnit;
  public readonly baseValue: number | ScaleValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  private minScale?: number;
  private maxScale?: number;
  private readonly strategyRegistry: ScaleValueCalculationStrategyRegistry;
  private performanceMetrics = {
    totalCalculations: 0,
    averageCalculationTime: 0,
    strategyExecutions: 0,
  };

  constructor(
    id: string,
    name: string,
    scaleUnit: ScaleUnit,
    baseValue: number | ScaleValue,
    maintainAspectRatio: boolean = false,
    strategyRegistry?: ScaleValueCalculationStrategyRegistry
  ) {
    this.id = id;
    this.name = name;
    this.scaleUnit = scaleUnit;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;

    // Initialize strategy registry
    this.strategyRegistry = strategyRegistry || new ScaleValueCalculationStrategyRegistry();
    
    this.initializeStrategies();
  }

  /**
   * Calculate scale value using strategy pattern
   */
  public calculate(context: UnitContext): number {
    const startTime = performance.now();
    
    try {
      if (!this.validate(context)) {
        return this.getFallbackValue();
      }

      // Get calculation from strategy registry
      const strategy = this.strategyRegistry.findBestStrategy(
        this.baseValue as ScaleValue,
        this.scaleUnit
      );
      const result = strategy ? strategy.calculate(this.baseValue as ScaleValue, this.scaleUnit, context) : this.getFallbackValue();

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

    // Validate scale-specific requirements
    if (this.scaleUnit === ScaleUnit.FACTOR) {
      // Factor scaling requires parent dimensions
      if (!context.parent?.width || !context.parent?.height) {
        return false;
      }
    }

    if (this.scaleUnit === ScaleUnit.PERCENTAGE) {
      // Percentage scaling requires viewport dimensions
      if (!context.viewport?.width || !context.viewport?.height) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the calculator is responsive to context changes
   */
  public isResponsive(): boolean {
    return this.scaleUnit !== ScaleUnit.FACTOR;
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
   * Set scale constraints
   */
  public setScaleConstraints(minScale?: number, maxScale?: number): void {
    if (minScale !== undefined) this.minScale = minScale;
    if (maxScale !== undefined) this.maxScale = maxScale;
  }

  /**
   * Get scale constraints
   */
  public getScaleConstraints() {
    return {
      minScale: this.minScale,
      maxScale: this.maxScale,
    };
  }

  /**
   * Clone the calculator with optional overrides
   */
  public clone(overrides?: Partial<IScaleUnit>): IScaleUnit {
    return new RefactoredScaleUnitCalculator(
      overrides?.id || this.id,
      overrides?.name || this.name,
      this.scaleUnit,
      this.baseValue,
      this.maintainAspectRatio,
      this.strategyRegistry
    );
  }

  /**
   * String representation
   */
  public toString(): string {
    return `RefactoredScaleUnitCalculator(${this.id})`;
  }

  /**
   * Initialize strategies in the registry
   */
  private initializeStrategies(): void {
    // This would typically register all available strategies
    // For now, we'll assume they're already registered
  }

  /**
   * Apply scale constraints
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
   * Get fallback value
   */
  private getFallbackValue(): number {
    if (typeof this.baseValue === 'number') {
      return this.baseValue;
    }
    
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Calculate scale based on context
   */
  public calculateScale(context: UnitContext): number {
    return this.calculate(context);
  }

  /**
   * Calculate X scale specifically
   */
  public calculateScaleX(context: UnitContext): number {
    return this.calculate(context);
  }

  /**
   * Calculate Y scale specifically
   */
  public calculateScaleY(context: UnitContext): number {
    return this.calculate(context);
  }

  /**
   * Calculate both X and Y scales
   */
  public calculateBoth(context: UnitContext): { scaleX: number; scaleY: number } {
    const scale = this.calculate(context);
    return { scaleX: scale, scaleY: scale };
  }

  /**
   * Get the minimum scale constraint
   */
  public getMinScale(): number | undefined {
    return this.minScale;
  }

  /**
   * Get the maximum scale constraint
   */
  public getMaxScale(): number | undefined {
    return this.maxScale;
  }


  /**
   * Check if scaling should be uniform (same for X and Y)
   */
  public isUniformScaling(): boolean {
    return this.maintainAspectRatio;
  }

  /**
   * Set uniform scaling mode
   */
  public setUniformScaling(uniform: boolean): void {
    // This would require changing the maintainAspectRatio property
    // For now, we'll just log that this is not directly modifiable
    console.warn('setUniformScaling: maintainAspectRatio is readonly, cannot be changed at runtime');
  }

  /**
   * Format method for IUnit interface
   */
  public format(format: string): string {
    switch (format) {
      case 'json':
        return JSON.stringify({
          id: this.id,
          name: this.name,
          unitType: this.unitType,
          scaleUnit: this.scaleUnit,
          baseValue: this.baseValue
        });
      case 'px':
        return `${this.baseValue}px`;
      case 'detailed':
        return `RefactoredScaleUnitCalculator(id: ${this.id}, name: ${this.name}, unit: ${this.scaleUnit}, value: ${this.baseValue})`;
      default:
        return this.toString();
    }
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
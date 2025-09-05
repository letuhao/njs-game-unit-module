import { BaseUnitComposite } from './IUnitComposite';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { CalculationStrategy } from '../enums/CalculationStrategy';

/**
 * Unit Group Composite
 * Groups multiple units together and manages their collective behavior
 * 
 * Note: This class focuses solely on composite unit management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class UnitGroupComposite extends BaseUnitComposite {
  private calculationStrategy: CalculationStrategy = CalculationStrategy.SUM;
  private customCalculator?: (results: number[]) => number;

  constructor(
    id: string,
    name: string,
    baseValue: number = 0,
    calculationStrategy: CalculationStrategy = CalculationStrategy.SUM
  ) {
    super(id, name, baseValue);
    this.calculationStrategy = calculationStrategy;
  }

  /**
   * Get the composite ID
   */
  get id(): string {
    return this.compositeId;
  }

  /**
   * Get the composite name
   */
  get name(): string {
    return this.compositeName;
  }

  /**
   * Add a unit to the composite
   */
  addUnit(unit: IUnit): void {
    this.units.push(unit);
  }

  /**
   * Remove a unit from the composite
   */
  removeUnit(unitId: string): void {
    const index = this.units.findIndex(unit => unit.id === unitId);
    if (index !== -1) {
      this.units.splice(index, 1);
    }
  }

  /**
   * Get the number of units in the composite
   */
  getUnitCount(): number {
    return this.units.length;
  }

  /**
   * Check if a unit exists in the composite
   */
  hasUnit(unitId: string): boolean {
    return this.units.some(unit => unit.id === unitId);
  }

  /**
   * Get units by type
   */
  getUnitsByType(unitType: UnitType): IUnit[] {
    return this.units.filter(unit => unit.unitType === unitType);
  }

  /**
   * Get all units in the composite
   */
  getAllUnits(): IUnit[] {
    return [...this.units];
  }

  /**
   * Clear all units from the composite
   */
  clearUnits(): void {
    this.units = [];
  }

  /**
   * Validate units by type
   */
  validateUnitsByType(unitType: UnitType, context: UnitContext): boolean {
    const unitsOfType = this.getUnitsByType(unitType);
    return unitsOfType.every(unit => unit.validate(context));
  }

  /**
   * Calculate the composite result using the specified strategy
   */
  public calculate(context: UnitContext): number {
    try {
      if (this.units.length === 0) {
        return this.baseValue;
      }

      const results: number[] = [];
      
      for (const unit of this.units) {
        if (unit.isActive) {
          const result = unit.calculate(context);
          results.push(result);
        }
      }

      if (results.length === 0) {
        return this.baseValue;
      }

      return this.applyCalculationStrategy(results);
    } catch (error) {
      return this.baseValue;
    }
  }

  /**
   * Validate all units in the composite
   */
  public validate(context: UnitContext): boolean {
    if (!context) {
      return false;
    }

    // Validate all units
    for (const unit of this.units) {
      if (!unit.validate(context)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if any unit is responsive
   */
  public isResponsive(): boolean {
    return this.units.some(unit => unit.isResponsive());
  }

  /**
   * Set calculation strategy
   */
  public setCalculationStrategy(strategy: CalculationStrategy): void {
    this.calculationStrategy = strategy;
  }

  /**
   * Get calculation strategy
   */
  public getCalculationStrategy(): CalculationStrategy {
    return this.calculationStrategy;
  }

  /**
   * Set custom calculator function
   */
  public setCustomCalculator(calculator: (results: number[]) => number): void {
    this.customCalculator = calculator;
  }

  /**
   * Get custom calculator function
   */
  public getCustomCalculator(): ((results: number[]) => number) | undefined {
    return this.customCalculator;
  }

  /**
   * Get composite statistics
   */
  public getCompositeStatistics() {
    const activeUnits = this.units.filter(unit => unit.isActive);
    const responsiveUnits = this.units.filter(unit => unit.isResponsive());
    
    return {
      totalUnits: this.units.length,
      activeUnits: activeUnits.length,
      responsiveUnits: responsiveUnits.length,
      calculationStrategy: this.calculationStrategy,
      hasCustomCalculator: this.customCalculator !== undefined,
    };
  }

  /**
   * Apply calculation strategy to results
   */
  private applyCalculationStrategy(results: number[]): number {
    if (this.customCalculator) {
      return this.customCalculator(results);
    }

    switch (this.calculationStrategy) {
      case CalculationStrategy.SUM:
        return results.reduce((sum, result) => sum + result, 0);
      
      case CalculationStrategy.AVERAGE:
        return results.reduce((sum, result) => sum + result, 0) / results.length;
      
      case CalculationStrategy.MIN:
        return Math.min(...results);
      
      case CalculationStrategy.MAX:
        return Math.max(...results);
      
      case CalculationStrategy.MEDIAN:
        return this.calculateMedian(results);
      
      case CalculationStrategy.WEIGHTED_AVERAGE:
        return this.calculateWeightedAverage(results);
      
      case CalculationStrategy.CUSTOM:
        return this.customCalculator ? this.customCalculator(results) : results[0];
      
      default:
        return results[0];
    }
  }

  /**
   * Calculate median value
   */
  private calculateMedian(results: number[]): number {
    const sorted = [...results].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      return sorted[middle];
    }
  }

  /**
   * Calculate weighted average
   */
  private calculateWeightedAverage(results: number[]): number {
    // Simple weighted average - can be enhanced with actual weights
    const weights = results.map((_, index) => 1 / (index + 1));
    const weightedSum = results.reduce((sum, result, index) => sum + result * weights[index], 0);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    return weightedSum / totalWeight;
  }
}
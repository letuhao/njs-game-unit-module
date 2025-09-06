// IUnitStrategy interface not found, using any for now
import type { UnitContext } from '../interfaces/IUnit';
import type { IStrategyInput } from '../interfaces/strategy/IStrategyInputTypes';
import { Dimension } from '../enums/Dimension';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Mixed Unit Strategy
 * Handles complex calculations involving multiple unit types
 * Coordinates between size, position, and scale strategies
 * 
 * Note: This class focuses solely on mixed unit calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class MixedUnitStrategy {
  readonly unitType = 'mixed';
  private strategyStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  /**
   * Calculate mixed unit value using the appropriate strategy
   */
  public calculate(input: IStrategyInput, context: UnitContext): number {
    const startTime = performance.now();
    
    try {
      let result: number;

      // Handle arrays of mixed units
      if (Array.isArray(input)) {
        result = this.calculateMixedArray(input, context);
      }
      // Handle objects with mixed unit properties
      else if (typeof input === 'object' && input !== null) {
        result = this.calculateMixedObject(input, context);
      }
      // Handle primitive values
      else {
        result = this.calculatePrimitive(input, context);
      }

      this.updateStatistics(true, performance.now() - startTime, 'mixed');
      return result;
    } catch (error) {
      this.updateStatistics(false, performance.now() - startTime, 'mixed');
      throw new Error(`Mixed unit calculation failed: ${error}`);
    }
  }

  /**
   * Check if this strategy can handle the input
   */
  public canHandle(input: IStrategyInput): boolean {
    return (
      Array.isArray(input) ||
      (typeof input === 'object' && input !== null) ||
      typeof input === 'number' ||
      typeof input === 'string'
    );
  }

  /**
   * Get strategy priority
   */
  public getPriority(): number {
    return 5; // Medium priority for mixed calculations
  }

  /**
   * Get strategy statistics
   */
  public getStrategyStatistics() {
    return { ...this.strategyStatistics };
  }

  /**
   * Reset strategy statistics
   */
  public resetStatistics(): void {
    this.strategyStatistics = {
      totalCalculations: 0,
      successfulCalculations: 0,
      failedCalculations: 0,
      averageCalculationTime: 0,
      totalCalculationTime: 0,
      calculationsByType: {},
    };
  }

  /**
   * Calculate mixed array
   */
  private calculateMixedArray(input: IStrategyInput[], context: UnitContext): number {
    if (input.length === 0) {
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }

    const results: number[] = [];
    
    for (const item of input) {
      try {
        const result = this.calculateSingleItem(item, context);
        results.push(result);
      } catch (error) {
        // Skip invalid items
        continue;
      }
    }

    if (results.length === 0) {
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }

    // Calculate average of all results
    return results.reduce((sum, result) => sum + result, 0) / results.length;
  }

  /**
   * Calculate mixed object
   */
  private calculateMixedObject(input: any, context: UnitContext): number {
    const values: number[] = [];
    
    // Extract numeric values from object properties
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === 'number' && !isNaN(value)) {
        values.push(value);
      } else if (typeof value === 'string' && !isNaN(Number(value))) {
        values.push(Number(value));
      } else if (typeof value === 'object' && value !== null) {
        try {
          const nestedResult = this.calculateSingleItem(value, context);
          values.push(nestedResult);
        } catch (error) {
          // Skip invalid nested objects
          continue;
        }
      }
    }

    if (values.length === 0) {
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }

    // Calculate weighted average based on property names
    return this.calculateWeightedAverage(values, input);
  }

  /**
   * Calculate primitive value
   */
  private calculatePrimitive(input: IStrategyInput, context: UnitContext): number {
    if (typeof input === 'number') {
      return input;
    }
    
    if (typeof input === 'string') {
      const parsed = Number(input);
      return isNaN(parsed) ? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT : parsed;
    }
    
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate single item
   */
  private calculateSingleItem(item: IStrategyInput, context: UnitContext): number {
    if (typeof item === 'number') {
      return item;
    }
    
    if (typeof item === 'string') {
      const parsed = Number(item);
      return isNaN(parsed) ? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT : parsed;
    }
    
    if (typeof item === 'object' && item !== null) {
      // Handle strategy input objects
      if ('value' in item && typeof item.value === 'number') {
        return item.value;
      }
      
      // Handle complex objects with multiple properties
      const values = Object.values(item).filter(v => typeof v === 'number' && !isNaN(v as number));
      if (values.length > 0) {
        return (values as number[]).reduce((sum, val) => sum + val, 0) / values.length;
      }
    }
    
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate weighted average
   */
  private calculateWeightedAverage(values: number[], input: any): number {
    const weights = this.calculateWeights(input);
    
    if (weights.length !== values.length) {
      // Fallback to simple average
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    }
    
    const weightedSum = values.reduce((sum, val, index) => sum + val * (weights[index] || 1), 0);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    return totalWeight > 0 ? weightedSum / totalWeight : values[0] ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate weights based on property names
   */
  private calculateWeights(input: any): number[] {
    const weights: number[] = [];
    
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === 'number' && !isNaN(value)) {
        // Assign weights based on property names
        let weight = 1;
        
        if (key.includes('size') || key.includes('width') || key.includes('height')) {
          weight = 1.2; // Size properties get higher weight
        } else if (key.includes('position') || key.includes('x') || key.includes('y')) {
          weight = 1.0; // Position properties get normal weight
        } else if (key.includes('scale') || key.includes('factor')) {
          weight = 0.8; // Scale properties get lower weight
        }
        
        weights.push(weight);
      }
    }
    
    return weights;
  }

  /**
   * Update strategy statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.strategyStatistics.totalCalculations++;
    this.strategyStatistics.totalCalculationTime += duration;
    this.strategyStatistics.averageCalculationTime = 
      this.strategyStatistics.totalCalculationTime / this.strategyStatistics.totalCalculations;
    
    this.strategyStatistics.calculationsByType[type] = 
      (this.strategyStatistics.calculationsByType[type] || 0) + 1;
    
    if (success) {
      this.strategyStatistics.successfulCalculations++;
    } else {
      this.strategyStatistics.failedCalculations++;
    }
  }

  /**
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.strategyStatistics.totalCalculations === 0) return 1;
    return this.strategyStatistics.successfulCalculations / this.strategyStatistics.totalCalculations;
  }

  /**
   * Get calculations by type
   */
  public getCalculationsByType(): Record<string, number> {
    return { ...this.strategyStatistics.calculationsByType };
  }

  /**
   * Check if strategy is performing well
   */
  public isPerformingWell(): boolean {
    const successRate = this.getSuccessRate();
    const averageTime = this.strategyStatistics.averageCalculationTime;
    
    return successRate > 0.9 && averageTime < 100; // 90% success rate and < 100ms average
  }
}
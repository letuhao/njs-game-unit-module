import type { IScaleValueCalculationStrategy } from '../value-calculation/IScaleValueCalculationStrategy';
import type { UnitContext } from '../../interfaces/IUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Pixel Scale Value Calculation Strategy
 * Handles pixel-based scale calculations
 * 
 * Note: This class focuses solely on scale calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class PixelScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'pixel-scale-calculation';
  readonly scaleValue = ScaleValue.FACTOR;
  readonly scaleUnit = ScaleUnit.FACTOR;

  private strategyStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  public canHandle(scaleValue: ScaleValue, scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.FACTOR && scaleUnit === ScaleUnit.FACTOR;
  }

  public calculate(scaleValue: ScaleValue, scaleUnit: ScaleUnit, _context: UnitContext): number {
    const startTime = performance.now();
    this.strategyStatistics.totalCalculations++;

    try {
      if (!this.canHandle(scaleValue, scaleUnit)) {
        throw new Error('Strategy cannot handle the given scale value and unit');
      }

      // For pixel values, return the value directly
      if (typeof scaleValue === 'number') {
        this.strategyStatistics.successfulCalculations++;
        this.updateStatistics(true, performance.now() - startTime, 'pixel');
        return scaleValue;
      }

      // For string values, try to parse as number
      if (typeof scaleValue === 'string') {
        const parsed = Number(scaleValue);
        if (isNaN(parsed)) {
          throw new Error(`Invalid scale value: ${scaleValue}`);
        }
        this.strategyStatistics.successfulCalculations++;
        this.updateStatistics(true, performance.now() - startTime, 'pixel');
        return parsed;
      }

      // Default fallback
      this.strategyStatistics.successfulCalculations++;
      this.updateStatistics(true, performance.now() - startTime, 'pixel');
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    } catch (error) {
      this.strategyStatistics.failedCalculations++;
      this.updateStatistics(false, performance.now() - startTime, 'pixel');
      throw new Error(`Pixel scale calculation failed: ${error}`);
    }
  }

  getPriority(): number {
    return 1; // High priority for pixel calculations
  }

  validateContext(context: UnitContext): boolean {
    return context !== null && typeof context === 'object';
  }

  getDescription(): string {
    return 'Pixel scale calculation strategy';
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
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.strategyStatistics.totalCalculations === 0) return 1;
    return this.strategyStatistics.successfulCalculations / this.strategyStatistics.totalCalculations;
  }

  /**
   * Update statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.strategyStatistics.totalCalculationTime += duration;
    this.strategyStatistics.averageCalculationTime = 
      this.strategyStatistics.totalCalculationTime / this.strategyStatistics.totalCalculations;
    
    this.strategyStatistics.calculationsByType[type] = 
      (this.strategyStatistics.calculationsByType[type] || 0) + 1;
  }
}

/**
 * Percentage Scale Value Calculation Strategy
 * Handles percentage-based scale calculations
 * 
 * Note: This class focuses solely on scale calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class PercentageScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'percentage-scale-calculation';
  readonly scaleValue = ScaleValue.PERCENTAGE;
  readonly scaleUnit = ScaleUnit.PERCENTAGE;

  private strategyStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  public canHandle(scaleValue: ScaleValue, scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.PERCENTAGE && scaleUnit === ScaleUnit.PERCENTAGE;
  }

  public calculate(scaleValue: ScaleValue, scaleUnit: ScaleUnit, context: UnitContext): number {
    const startTime = performance.now();
    this.strategyStatistics.totalCalculations++;

    try {
      if (!this.canHandle(scaleValue, scaleUnit)) {
        throw new Error('Strategy cannot handle the given scale value and unit');
      }

      // Convert percentage to factor
      let percentage: number;
      
      if (typeof scaleValue === 'number') {
        percentage = scaleValue;
      } else if (typeof scaleValue === 'string') {
        const parsed = Number(scaleValue);
        if (isNaN(parsed)) {
          throw new Error(`Invalid percentage value: ${scaleValue}`);
        }
        percentage = parsed;
      } else {
        throw new Error(`Unsupported scale value type: ${typeof scaleValue}`);
      }

      // Convert percentage to factor (divide by 100)
      const factor = percentage / 100;
      
      this.strategyStatistics.successfulCalculations++;
      this.updateStatistics(true, performance.now() - startTime, 'percentage');
      return factor;
    } catch (error) {
      this.strategyStatistics.failedCalculations++;
      this.updateStatistics(false, performance.now() - startTime, 'percentage');
      throw new Error(`Percentage scale calculation failed: ${error}`);
    }
  }

  getPriority(): number {
    return 2; // Medium priority for percentage calculations
  }

  validateContext(context: UnitContext): boolean {
    return context !== null && typeof context === 'object';
  }

  getDescription(): string {
    return 'Percentage scale calculation strategy';
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
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.strategyStatistics.totalCalculations === 0) return 1;
    return this.strategyStatistics.successfulCalculations / this.strategyStatistics.totalCalculations;
  }

  /**
   * Update statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.strategyStatistics.totalCalculationTime += duration;
    this.strategyStatistics.averageCalculationTime = 
      this.strategyStatistics.totalCalculationTime / this.strategyStatistics.totalCalculations;
    
    this.strategyStatistics.calculationsByType[type] = 
      (this.strategyStatistics.calculationsByType[type] || 0) + 1;
  }
}

/**
 * Factor Scale Value Calculation Strategy
 * Handles factor-based scale calculations
 * 
 * Note: This class focuses solely on scale calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class FactorScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'factor-scale-calculation';
  readonly scaleValue = ScaleValue.FACTOR;
  readonly scaleUnit = ScaleUnit.FACTOR;

  private strategyStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  public canHandle(scaleValue: ScaleValue, scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.FACTOR && scaleUnit === ScaleUnit.FACTOR;
  }

  public calculate(scaleValue: ScaleValue, scaleUnit: ScaleUnit, _context: UnitContext): number {
    const startTime = performance.now();
    this.strategyStatistics.totalCalculations++;

    try {
      if (!this.canHandle(scaleValue, scaleUnit)) {
        throw new Error('Strategy cannot handle the given scale value and unit');
      }

      // For factor values, return the value directly
      if (typeof scaleValue === 'number') {
        this.strategyStatistics.successfulCalculations++;
        this.updateStatistics(true, performance.now() - startTime, 'factor');
        return scaleValue;
      }

      // For string values, try to parse as number
      if (typeof scaleValue === 'string') {
        const parsed = Number(scaleValue);
        if (isNaN(parsed)) {
          throw new Error(`Invalid factor value: ${scaleValue}`);
        }
        this.strategyStatistics.successfulCalculations++;
        this.updateStatistics(true, performance.now() - startTime, 'factor');
        return parsed;
      }

      // Default fallback
      this.strategyStatistics.successfulCalculations++;
      this.updateStatistics(true, performance.now() - startTime, 'factor');
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    } catch (error) {
      this.strategyStatistics.failedCalculations++;
      this.updateStatistics(false, performance.now() - startTime, 'factor');
      throw new Error(`Factor scale calculation failed: ${error}`);
    }
  }

  getPriority(): number {
    return 3; // Medium priority for factor calculations
  }

  validateContext(context: UnitContext): boolean {
    return context !== null && typeof context === 'object';
  }

  getDescription(): string {
    return 'Factor scale calculation strategy';
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
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.strategyStatistics.totalCalculations === 0) return 1;
    return this.strategyStatistics.successfulCalculations / this.strategyStatistics.totalCalculations;
  }

  /**
   * Update statistics
   */
  private updateStatistics(success: boolean, duration: number, type: string): void {
    this.strategyStatistics.totalCalculationTime += duration;
    this.strategyStatistics.averageCalculationTime = 
      this.strategyStatistics.totalCalculationTime / this.strategyStatistics.totalCalculations;
    
    this.strategyStatistics.calculationsByType[type] = 
      (this.strategyStatistics.calculationsByType[type] || 0) + 1;
  }
}

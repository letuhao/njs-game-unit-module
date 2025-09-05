import type { IPositionValueCalculationStrategy } from '../value-calculation/IPositionValueCalculationStrategy';
import type { UnitContext } from '../../interfaces/IUnit';
import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { AxisUnit } from '../../enums/AxisUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Pixel Position Value Calculation Strategy
 * Handles pixel-based position calculations
 * 
 * Note: This class focuses solely on position calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class PixelPositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'pixel-position-calculation';
  readonly positionValue = PositionValue.PIXEL;
  readonly positionUnit = PositionUnit.PIXEL;
  readonly axisUnit = AxisUnit.X;

  private strategyStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  public canHandle(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    _axisUnit: AxisUnit
  ): boolean {
    return positionValue === PositionValue.PIXEL && positionUnit === PositionUnit.PIXEL;
  }

  public calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    _axisUnit: AxisUnit,
    context: UnitContext
  ): number {
    const startTime = performance.now();
    this.strategyStatistics.totalCalculations++;

    try {
      if (!this.canHandle(positionValue, positionUnit, _axisUnit)) {
        throw new Error('Strategy cannot handle the given position value and unit');
      }

      // Simple pixel calculation - return the value as-is
      const result = context.value || DEFAULT_FALLBACK_VALUES.POSITION;
      
      this.strategyStatistics.successfulCalculations++;
      this.updateStatistics(true, performance.now() - startTime, 'pixel');
      
      return result;
    } catch (error) {
      this.strategyStatistics.failedCalculations++;
      this.updateStatistics(false, performance.now() - startTime, 'pixel');
      throw new Error(`Pixel position calculation failed: ${error}`);
    }
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
 * Percentage Position Value Calculation Strategy
 * Handles percentage-based position calculations
 * 
 * Note: This class focuses solely on position calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class PercentagePositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'percentage-position-calculation';
  readonly positionValue = PositionValue.PERCENTAGE;
  readonly positionUnit = PositionUnit.PERCENTAGE;
  readonly axisUnit = AxisUnit.X;

  private strategyStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  public canHandle(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    _axisUnit: AxisUnit
  ): boolean {
    return positionValue === PositionValue.PERCENTAGE && positionUnit === PositionUnit.PERCENTAGE;
  }

  public calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    _axisUnit: AxisUnit,
    context: UnitContext
  ): number {
    const startTime = performance.now();
    this.strategyStatistics.totalCalculations++;

    try {
      if (!this.canHandle(positionValue, positionUnit, _axisUnit)) {
        throw new Error('Strategy cannot handle the given position value and unit');
      }

      // Percentage calculation - convert to pixel value
      const percentage = context.value || DEFAULT_FALLBACK_VALUES.POSITION;
      const parentSize = context.parent?.width || 100; // Default parent width
      const result = (percentage / 100) * parentSize;
      
      this.strategyStatistics.successfulCalculations++;
      this.updateStatistics(true, performance.now() - startTime, 'percentage');
      
      return result;
    } catch (error) {
      this.strategyStatistics.failedCalculations++;
      this.updateStatistics(false, performance.now() - startTime, 'percentage');
      throw new Error(`Percentage position calculation failed: ${error}`);
    }
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
 * Viewport Position Value Calculation Strategy
 * Handles viewport-based position calculations
 * 
 * Note: This class focuses solely on position calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class ViewportPositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'viewport-position-calculation';
  readonly positionValue = PositionValue.VIEWPORT;
  readonly positionUnit = PositionUnit.VIEWPORT;
  readonly axisUnit = AxisUnit.X;

  private strategyStatistics = {
    totalCalculations: 0,
    successfulCalculations: 0,
    failedCalculations: 0,
    averageCalculationTime: 0,
    totalCalculationTime: 0,
    calculationsByType: {} as Record<string, number>,
  };

  public canHandle(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    _axisUnit: AxisUnit
  ): boolean {
    return positionValue === PositionValue.VIEWPORT && positionUnit === PositionUnit.VIEWPORT;
  }

  public calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    _axisUnit: AxisUnit,
    context: UnitContext
  ): number {
    const startTime = performance.now();
    this.strategyStatistics.totalCalculations++;

    try {
      if (!this.canHandle(positionValue, positionUnit, _axisUnit)) {
        throw new Error('Strategy cannot handle the given position value and unit');
      }

      // Viewport calculation - convert to pixel value
      const viewportValue = context.value || DEFAULT_FALLBACK_VALUES.POSITION;
      const viewportWidth = context.viewport?.width || window.innerWidth || 1920;
      const result = (viewportValue / 100) * viewportWidth;
      
      this.strategyStatistics.successfulCalculations++;
      this.updateStatistics(true, performance.now() - startTime, 'viewport');
      
      return result;
    } catch (error) {
      this.strategyStatistics.failedCalculations++;
      this.updateStatistics(false, performance.now() - startTime, 'viewport');
      throw new Error(`Viewport position calculation failed: ${error}`);
    }
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
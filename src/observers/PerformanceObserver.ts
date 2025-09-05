import type { IUnitObserver } from './IUnitObserver';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Performance Observer
 * Monitors unit calculation performance and provides metrics
 * 
 * Note: This class focuses solely on performance monitoring logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class PerformanceObserver implements IUnitObserver {
  private readonly performanceMetrics = {
    totalCalculations: 0,
    totalCalculationTime: 0,
    averageCalculationTime: 0,
    minCalculationTime: Infinity,
    maxCalculationTime: 0,
    calculationTimes: [] as number[],
    errors: 0,
    unitTypeStats: new Map<
      string,
      {
        count: number;
        totalTime: number;
        averageTime: number;
        minTime: number;
        maxTime: number;
      }
    >(),
  };

  private readonly maxHistorySize = 1000; // Default max history size
  private readonly performanceThresholds = {
    slowCalculation: 100, // ms
    verySlowCalculation: 500, // ms
    errorRate: 0.05, // 5%
  };

  /**
   * Called when a unit value changes
   */
  public onUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    // Performance observer doesn't track value changes
  }

  /**
   * Called when a unit is created
   */
  public onUnitCreated(unitId: string, unitType: string): void {
    // Initialize unit type statistics if not exists
    if (!this.performanceMetrics.unitTypeStats.has(unitType)) {
      this.performanceMetrics.unitTypeStats.set(unitType, {
        count: 0,
        totalTime: 0,
        averageTime: 0,
        minTime: Infinity,
        maxTime: 0,
      });
    }
  }

  /**
   * Called when a unit is destroyed
   */
  public onUnitDestroyed(unitId: string): void {
    // Performance observer doesn't track unit destruction
  }

  /**
   * Called when a unit calculation starts
   */
  public onUnitCalculationStarted(unitId: string): void {
    // Performance observer doesn't track calculation start
  }

  /**
   * Called when a unit calculation completes
   */
  public onUnitCalculationCompleted(unitId: string, result: number, duration: number): void {
    this.recordCalculation(unitId, duration, true);
  }

  /**
   * Called when a unit calculation fails
   */
  public onUnitCalculationFailed(unitId: string, error: Error): void {
    this.recordCalculation(unitId, 0, false);
  }

  /**
   * Called when a unit validation starts
   */
  public onUnitValidationStarted(unitId: string, context: any): void {
    // Performance observer doesn't track validation start
  }

  /**
   * Called when a unit validation completes
   */
  public onUnitValidationCompleted(unitId: string, isValid: boolean, errors: string[]): void {
    // Performance observer doesn't track validation completion
  }

  /**
   * Called when a unit strategy changes
   */
  public onUnitStrategyChanged(unitId: string, oldStrategy: string, newStrategy: string): void {
    // Performance observer doesn't track strategy changes
  }

  /**
   * Called when a unit configuration changes
   */
  public onUnitConfigurationChanged(unitId: string, oldConfig: any, newConfig: any): void {
    // Performance observer doesn't track configuration changes
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      unitTypeStats: Object.fromEntries(this.performanceMetrics.unitTypeStats),
    };
  }

  /**
   * Get performance summary
   */
  public getPerformanceSummary() {
    const metrics = this.performanceMetrics;
    const errorRate = metrics.totalCalculations > 0 ? metrics.errors / metrics.totalCalculations : 0;
    
    return {
      totalCalculations: metrics.totalCalculations,
      averageCalculationTime: metrics.averageCalculationTime,
      minCalculationTime: metrics.minCalculationTime === Infinity ? 0 : metrics.minCalculationTime,
      maxCalculationTime: metrics.maxCalculationTime,
      errorRate,
      isPerformanceDegraded: this.isPerformanceDegraded(),
      slowCalculations: this.getSlowCalculations().length,
      unitTypeBreakdown: this.getUnitTypeBreakdown(),
    };
  }

  /**
   * Get slow calculations
   */
  public getSlowCalculations(): Array<{ unitId: string; duration: number; timestamp: number }> {
    return this.performanceMetrics.calculationTimes
      .filter(time => time > this.performanceThresholds.slowCalculation)
      .map((time, index) => ({
        unitId: `unit_${index}`, // Placeholder - would need to track actual unit IDs
        duration: time,
        timestamp: Date.now() - (this.performanceMetrics.calculationTimes.length - index) * 1000,
      }));
  }

  /**
   * Get unit type breakdown
   */
  public getUnitTypeBreakdown(): Record<string, any> {
    const breakdown: Record<string, any> = {};
    
    this.performanceMetrics.unitTypeStats.forEach((stats, unitType) => {
      breakdown[unitType] = {
        count: stats.count,
        averageTime: stats.averageTime,
        minTime: stats.minTime === Infinity ? 0 : stats.minTime,
        maxTime: stats.maxTime,
        totalTime: stats.totalTime,
      };
    });

    return breakdown;
  }

  /**
   * Check if performance is degraded
   */
  public isPerformanceDegraded(): boolean {
    const metrics = this.performanceMetrics;
    const errorRate = metrics.totalCalculations > 0 ? metrics.errors / metrics.totalCalculations : 0;
    
    return (
      metrics.averageCalculationTime > this.performanceThresholds.verySlowCalculation ||
      errorRate > this.performanceThresholds.errorRate
    );
  }

  /**
   * Get performance alerts
   */
  public getPerformanceAlerts(): string[] {
    const alerts: string[] = [];
    const metrics = this.performanceMetrics;
    const errorRate = metrics.totalCalculations > 0 ? metrics.errors / metrics.totalCalculations : 0;

    if (metrics.averageCalculationTime > this.performanceThresholds.verySlowCalculation) {
      alerts.push(`Average calculation time ${metrics.averageCalculationTime.toFixed(2)}ms exceeds threshold`);
    }

    if (errorRate > this.performanceThresholds.errorRate) {
      alerts.push(`Error rate ${(errorRate * 100).toFixed(1)}% exceeds threshold`);
    }

    if (metrics.maxCalculationTime > this.performanceThresholds.verySlowCalculation * 2) {
      alerts.push(`Maximum calculation time ${metrics.maxCalculationTime}ms is very high`);
    }

    return alerts;
  }

  /**
   * Reset performance metrics
   */
  public resetMetrics(): void {
    this.performanceMetrics.totalCalculations = 0;
    this.performanceMetrics.totalCalculationTime = 0;
    this.performanceMetrics.averageCalculationTime = 0;
    this.performanceMetrics.minCalculationTime = Infinity;
    this.performanceMetrics.maxCalculationTime = 0;
    this.performanceMetrics.calculationTimes = [];
    this.performanceMetrics.errors = 0;
    this.performanceMetrics.unitTypeStats.clear();
  }

  /**
   * Set performance thresholds
   */
  public setPerformanceThresholds(thresholds: Partial<typeof this.performanceThresholds>): void {
    this.performanceThresholds.slowCalculation = thresholds.slowCalculation ?? this.performanceThresholds.slowCalculation;
    this.performanceThresholds.verySlowCalculation = thresholds.verySlowCalculation ?? this.performanceThresholds.verySlowCalculation;
    this.performanceThresholds.errorRate = thresholds.errorRate ?? this.performanceThresholds.errorRate;
  }

  /**
   * Get performance thresholds
   */
  public getPerformanceThresholds() {
    return { ...this.performanceThresholds };
  }

  /**
   * Record a calculation
   */
  private recordCalculation(unitId: string, duration: number, success: boolean): void {
    const metrics = this.performanceMetrics;
    
    metrics.totalCalculations++;
    metrics.totalCalculationTime += duration;
    metrics.averageCalculationTime = metrics.totalCalculationTime / metrics.totalCalculations;
    
    if (duration < metrics.minCalculationTime) {
      metrics.minCalculationTime = duration;
    }
    
    if (duration > metrics.maxCalculationTime) {
      metrics.maxCalculationTime = duration;
    }

    // Add to history (with size limit)
    metrics.calculationTimes.push(duration);
    if (metrics.calculationTimes.length > this.maxHistorySize) {
      metrics.calculationTimes.shift();
    }

    if (!success) {
      metrics.errors++;
    }

    // Update unit type statistics (if we can determine unit type from unitId)
    this.updateUnitTypeStatistics(unitId, duration);
  }

  /**
   * Update unit type statistics
   */
  private updateUnitTypeStatistics(unitId: string, duration: number): void {
    // Try to extract unit type from unitId (this is a simplified approach)
    const unitType = this.extractUnitTypeFromId(unitId);
    
    if (unitType) {
      const stats = this.performanceMetrics.unitTypeStats.get(unitType);
      if (stats) {
        stats.count++;
        stats.totalTime += duration;
        stats.averageTime = stats.totalTime / stats.count;
        
        if (duration < stats.minTime) {
          stats.minTime = duration;
        }
        
        if (duration > stats.maxTime) {
          stats.maxTime = duration;
        }
      }
    }
  }

  /**
   * Extract unit type from unit ID (simplified approach)
   */
  private extractUnitTypeFromId(unitId: string): string | null {
    // This is a simplified approach - in a real implementation, you'd have a better way to determine unit type
    if (unitId.includes('size')) return 'size';
    if (unitId.includes('position')) return 'position';
    if (unitId.includes('scale')) return 'scale';
    return null;
  }
}
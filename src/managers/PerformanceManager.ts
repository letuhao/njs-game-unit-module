import type { IPerformanceManager } from './IPerformanceManager';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Performance Manager Implementation
 * Concrete implementation of performance management using DI
 */
export class PerformanceManager implements IPerformanceManager {
  private operationHistory: Map<string, number[]> = new Map();
  private activeMeasurements: Map<string, number> = new Map();
  private logger: any;

  private performanceThreshold: number = DEFAULT_FALLBACK_VALUES.PERFORMANCE.ERROR_THRESHOLD;
  private memoryLimit: number = DEFAULT_FALLBACK_VALUES.PERFORMANCE.DEFAULT_MEMORY_LIMIT;
  private totalOperations: number = 0;
  private totalErrors: number = 0;

  constructor() {
    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  /**
   * Start measuring an operation
   */
  public startMeasurement(operationId: string): void {
    const startTime = performance.now();
    this.activeMeasurements.set(operationId, startTime);
    
    this.logger.debug('PerformanceManager', 'startMeasurement', 'Started measurement', {
      operationId,
      startTime,
    });
  }

  /**
   * End measuring an operation
   */
  public endMeasurement(operationId: string): number {
    const endTime = performance.now();
    const startTime = this.activeMeasurements.get(operationId);
    
    if (startTime === undefined) {
      this.logger.warn('PerformanceManager', 'endMeasurement', 'No start time found for operation', {
        operationId,
      });
      return 0;
    }

    const duration = endTime - startTime;
    this.activeMeasurements.delete(operationId);
    
    // Store in history
    if (!this.operationHistory.has(operationId)) {
      this.operationHistory.set(operationId, []);
    }
    this.operationHistory.get(operationId)!.push(duration);
    
    this.totalOperations++;
    
    this.logger.debug('PerformanceManager', 'endMeasurement', 'Ended measurement', {
      operationId,
      duration,
      totalOperations: this.totalOperations,
    });

    return duration;
  }

  /**
   * Get performance statistics for an operation
   */
  public getOperationStats(operationId: string): {
    count: number;
    averageTime: number;
    minTime: number;
    maxTime: number;
    totalTime: number;
  } {
    const times = this.operationHistory.get(operationId) || [];
    
    if (times.length === 0) {
      return {
        count: 0,
        averageTime: 0,
        minTime: 0,
        maxTime: 0,
        totalTime: 0,
      };
    }

    const totalTime = times.reduce((sum, time) => sum + time, 0);
    const averageTime = totalTime / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    return {
      count: times.length,
      averageTime,
      minTime,
      maxTime,
      totalTime,
    };
  }

  /**
   * Get overall performance statistics
   */
  public getOverallStats(): {
    totalOperations: number;
    totalErrors: number;
    errorRate: number;
    averageOperationTime: number;
    memoryUsage: number;
    activeMeasurements: number;
  } {
    const allTimes: number[] = [];
    for (const times of this.operationHistory.values()) {
      allTimes.push(...times);
    }

    const totalTime = allTimes.reduce((sum, time) => sum + time, 0);
    const averageOperationTime = allTimes.length > 0 ? totalTime / allTimes.length : 0;
    const errorRate = this.totalOperations > 0 ? (this.totalErrors / this.totalOperations) * 100 : 0;

    return {
      totalOperations: this.totalOperations,
      totalErrors: this.totalErrors,
      errorRate,
      averageOperationTime,
      memoryUsage: this.getMemoryUsage(),
      activeMeasurements: this.activeMeasurements.size,
    };
  }

  /**
   * Check if performance is within acceptable limits
   */
  public isPerformanceAcceptable(operationId: string): boolean {
    const stats = this.getOperationStats(operationId);
    return stats.averageTime <= this.performanceThreshold;
  }

  /**
   * Record an error
   */
  public recordError(operationId: string, error: Error): void {
    this.totalErrors++;
    
    this.logger.error('PerformanceManager', 'recordError', 'Performance error recorded', {
      operationId,
      error: error.message,
      totalErrors: this.totalErrors,
    });
  }

  /**
   * Set performance threshold
   */
  public setPerformanceThreshold(threshold: number): void {
    this.performanceThreshold = threshold;
    
    this.logger.debug('PerformanceManager', 'setPerformanceThreshold', 'Performance threshold updated', {
      threshold,
    });
  }

  /**
   * Set memory limit
   */
  public setMemoryLimit(limit: number): void {
    this.memoryLimit = limit;
    
    this.logger.debug('PerformanceManager', 'setMemoryLimit', 'Memory limit updated', {
      limit,
    });
  }

  /**
   * Clear performance history
   */
  public clearHistory(): void {
    this.operationHistory.clear();
    this.activeMeasurements.clear();
    this.totalOperations = 0;
    this.totalErrors = 0;
    
    this.logger.debug('PerformanceManager', 'clearHistory', 'Performance history cleared');
  }

  /**
   * Get memory usage (simplified)
   */
  private getMemoryUsage(): number {
    // Simplified memory usage calculation
    // In a real implementation, this would use performance.memory or similar
    return this.operationHistory.size * 100; // Approximate bytes per operation
  }

  /**
   * Get performance report
   */
  public getPerformanceReport(): {
    overall: {
      totalOperations: number;
      totalErrors: number;
      errorRate: number;
      averageOperationTime: number;
      memoryUsage: number;
      activeMeasurements: number;
    };
    operations: Record<string, {
      count: number;
      averageTime: number;
      minTime: number;
      maxTime: number;
      totalTime: number;
    }>;
    thresholds: {
      performanceThreshold: number;
      memoryLimit: number;
    };
  } {
    const overall = this.getOverallStats();
    const operations: Record<string, any> = {};
    
    for (const [operationId] of this.operationHistory) {
      operations[operationId] = this.getOperationStats(operationId);
    }

    return {
      overall,
      operations,
      thresholds: {
        performanceThreshold: this.performanceThreshold,
        memoryLimit: this.memoryLimit,
      },
    };
  }

  /**
   * Export performance data
   */
  public exportData(): {
    operationHistory: Record<string, number[]>;
    totalOperations: number;
    totalErrors: number;
    performanceThreshold: number;
    memoryLimit: number;
    timestamp: string;
  } {
    const operationHistory: Record<string, number[]> = {};
    for (const [operationId, times] of this.operationHistory) {
      operationHistory[operationId] = [...times];
    }

    return {
      operationHistory,
      totalOperations: this.totalOperations,
      totalErrors: this.totalErrors,
      performanceThreshold: this.performanceThreshold,
      memoryLimit: this.memoryLimit,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Import performance data
   */
  public importData(data: {
    operationHistory: Record<string, number[]>;
    totalOperations: number;
    totalErrors: number;
    performanceThreshold: number;
    memoryLimit: number;
  }): void {
    this.operationHistory.clear();
    for (const [operationId, times] of Object.entries(data.operationHistory)) {
      this.operationHistory.set(operationId, [...times]);
    }

    this.totalOperations = data.totalOperations;
    this.totalErrors = data.totalErrors;
    this.performanceThreshold = data.performanceThreshold;
    this.memoryLimit = data.memoryLimit;

    this.logger.debug('PerformanceManager', 'importData', 'Performance data imported', {
      operationCount: Object.keys(data.operationHistory).length,
      totalOperations: data.totalOperations,
    });
  }
}
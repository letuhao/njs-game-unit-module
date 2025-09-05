import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Performance Manager
 * Handles performance monitoring, metrics collection, and performance analysis
 * Follows Single Responsibility Principle - only manages performance
 * 
 * Note: This class focuses solely on performance management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export interface IPerformanceManager {
  // Performance tracking
  startMeasurement(operationId: string): void;
  endMeasurement(operationId: string): number;
  recordMeasurement(operationId: string, duration: number): void;

  // Performance metrics
  getPerformanceMetrics(): {
    totalOperations: number;
    averageExecutionTime: number;
    memoryUsage: number;
    errorRate: number;
    slowestOperations: Array<{ operationId: string; duration: number }>;
  };

  // Memory monitoring
  getMemoryUsage(): number;
  getMemoryLimit(): number;
  setMemoryLimit(limit: number): void;

  // Performance analysis
  getSlowestOperations(count?: number): Array<{ operationId: string; duration: number }>;
  getFastestOperations(count?: number): Array<{ operationId: string; duration: number }>;
  getAverageExecutionTime(operationId?: string): number;

  // Performance statistics
  getTotalOperations(): number;
  getErrorCount(): number;
  getSuccessRate(): number;
  getPerformanceScore(): number;

  // Performance alerts
  isPerformanceDegraded(): boolean;
  getPerformanceAlerts(): string[];
  clearPerformanceAlerts(): void;

  // Performance reset
  resetPerformanceMetrics(): void;
  clearPerformanceHistory(): void;
}

/**
 * Performance Manager Implementation
 * Manages performance monitoring, metrics collection, and analysis
 */
export class PerformanceManager implements IPerformanceManager {
  private measurements: Map<string, number> = new Map();
  private performanceHistory: Array<{ operationId: string; duration: number; timestamp: number }> = [];
  private memoryLimit: number = 100 * 1024 * 1024; // 100MB default
  private errorCount: number = 0;
  private totalOperations: number = 0;
  private totalExecutionTime: number = 0;

  /**
   * Start performance measurement
   */
  public startMeasurement(operationId: string): void {
    this.measurements.set(operationId, performance.now());
  }

  /**
   * End performance measurement and return duration
   */
  public endMeasurement(operationId: string): number {
    const startTime = this.measurements.get(operationId);
    if (!startTime) {
      return 0;
    }

    const duration = performance.now() - startTime;
    this.recordMeasurement(operationId, duration);
    this.measurements.delete(operationId);
    
    return duration;
  }

  /**
   * Record a performance measurement
   */
  public recordMeasurement(operationId: string, duration: number): void {
    this.performanceHistory.push({
      operationId,
      duration,
      timestamp: Date.now(),
    });

    this.totalOperations++;
    this.totalExecutionTime += duration;

    // Check for performance degradation
    this.checkPerformanceDegradation(operationId, duration);
  }

  /**
   * Get comprehensive performance metrics
   */
  public getPerformanceMetrics() {
    const averageExecutionTime = this.totalOperations > 0 
      ? this.totalExecutionTime / this.totalOperations 
      : 0;

    const errorRate = this.totalOperations > 0 
      ? this.errorCount / this.totalOperations 
      : 0;

    return {
      totalOperations: this.totalOperations,
      averageExecutionTime,
      memoryUsage: this.getMemoryUsage(),
      errorRate,
      slowestOperations: this.getSlowestOperations(5),
    };
  }

  /**
   * Get current memory usage
   */
  public getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Get memory limit
   */
  public getMemoryLimit(): number {
    return this.memoryLimit;
  }

  /**
   * Set memory limit
   */
  public setMemoryLimit(limit: number): void {
    this.memoryLimit = limit;
  }

  /**
   * Get slowest operations
   */
  public getSlowestOperations(count: number = 5): Array<{ operationId: string; duration: number }> {
    return this.performanceHistory
      .sort((a, b) => b.duration - a.duration)
      .slice(0, count)
      .map(({ operationId, duration }) => ({ operationId, duration }));
  }

  /**
   * Get fastest operations
   */
  public getFastestOperations(count: number = 5): Array<{ operationId: string; duration: number }> {
    return this.performanceHistory
      .sort((a, b) => a.duration - b.duration)
      .slice(0, count)
      .map(({ operationId, duration }) => ({ operationId, duration }));
  }

  /**
   * Get average execution time for specific operation or all operations
   */
  public getAverageExecutionTime(operationId?: string): number {
    if (operationId) {
      const operationHistory = this.performanceHistory.filter(h => h.operationId === operationId);
      if (operationHistory.length === 0) return 0;
      
      const totalTime = operationHistory.reduce((sum, h) => sum + h.duration, 0);
      return totalTime / operationHistory.length;
    }

    return this.totalOperations > 0 ? this.totalExecutionTime / this.totalOperations : 0;
  }

  /**
   * Get total operations count
   */
  public getTotalOperations(): number {
    return this.totalOperations;
  }

  /**
   * Get error count
   */
  public getErrorCount(): number {
    return this.errorCount;
  }

  /**
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.totalOperations === 0) return 1;
    return (this.totalOperations - this.errorCount) / this.totalOperations;
  }

  /**
   * Get performance score (0-100)
   */
  public getPerformanceScore(): number {
    const successRate = this.getSuccessRate();
    const averageTime = this.getAverageExecutionTime();
    const memoryUsage = this.getMemoryUsage();
    
    // Simple scoring algorithm
    let score = successRate * 100;
    
    // Penalize slow operations
    if (averageTime > 100) {
      score -= Math.min(20, (averageTime - 100) / 10);
    }
    
    // Penalize high memory usage
    if (memoryUsage > this.memoryLimit * 0.8) {
      score -= Math.min(20, (memoryUsage / this.memoryLimit) * 20);
    }
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Check if performance is degraded
   */
  public isPerformanceDegraded(): boolean {
    const averageTime = this.getAverageExecutionTime();
    const successRate = this.getSuccessRate();
    const memoryUsage = this.getMemoryUsage();
    
    return (
      averageTime > 200 || // Slow operations
      successRate < 0.9 || // High error rate
      memoryUsage > this.memoryLimit * 0.9 // High memory usage
    );
  }

  /**
   * Get performance alerts
   */
  public getPerformanceAlerts(): string[] {
    const alerts: string[] = [];
    const averageTime = this.getAverageExecutionTime();
    const successRate = this.getSuccessRate();
    const memoryUsage = this.getMemoryUsage();
    
    if (averageTime > 200) {
      alerts.push(`Slow operations detected: average time ${averageTime.toFixed(2)}ms`);
    }
    
    if (successRate < 0.9) {
      alerts.push(`High error rate: ${((1 - successRate) * 100).toFixed(1)}%`);
    }
    
    if (memoryUsage > this.memoryLimit * 0.8) {
      alerts.push(`High memory usage: ${(memoryUsage / 1024 / 1024).toFixed(1)}MB`);
    }
    
    return alerts;
  }

  /**
   * Clear performance alerts
   */
  public clearPerformanceAlerts(): void {
    // Alerts are generated dynamically, so no need to clear
  }

  /**
   * Reset performance metrics
   */
  public resetPerformanceMetrics(): void {
    this.totalOperations = 0;
    this.totalExecutionTime = 0;
    this.errorCount = 0;
    this.measurements.clear();
  }

  /**
   * Clear performance history
   */
  public clearPerformanceHistory(): void {
    this.performanceHistory = [];
  }

  /**
   * Check for performance degradation
   */
  private checkPerformanceDegradation(operationId: string, duration: number): void {
    if (duration > 1000) { // Operations taking more than 1 second
      this.errorCount++;
    }
  }
}
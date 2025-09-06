import type { IUnitDecorator } from '../interfaces/IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { DiContainer } from '../container/DiContainer';
import { BaseUnitDecorator } from '../interfaces/IUnitDecorator';
import { UnitType } from '../enums/UnitType';
import { TOKENS } from '../container/Tokens';

/**
 * Performance Logging Decorator
 * Adds performance monitoring and logging to any unit
 * Follows Single Responsibility Principle - only handles performance concerns
 */
export class PerformanceLoggingDecorator extends BaseUnitDecorator {
  private logger: any;
  private performanceManager: any;
  private performanceMetrics: {
    totalCalls: number;
    totalTime: number;
    averageTime: number;
    minTime: number;
    maxTime: number;
    errorCount: number;
    lastCallTime: Date | null;
  } = {
    totalCalls: 0,
    totalTime: 0,
    averageTime: 0,
    minTime: Infinity,
    maxTime: 0,
    errorCount: 0,
    lastCallTime: null
  };

  constructor(
    wrappedUnit: IUnit,
    private container: DiContainer,
    private options: {
      logThreshold?: number; // Log if operation takes longer than this (ms)
      trackMetrics?: boolean;
      logSlowOperations?: boolean;
    } = {}
  ) {
    super(
      `performance-logging-${wrappedUnit.id}`,
      `Performance Logging Decorator for ${wrappedUnit.name}`,
      wrappedUnit.unitType,
      wrappedUnit
    );
    
    // Resolve dependencies from DI container
    try {
      this.logger = this.container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console;
    }

    try {
      this.performanceManager = this.container.resolve(TOKENS.PERFORMANCE_MANAGER);
    } catch (error) {
      this.performanceManager = null;
    }
  }

  /**
   * Get the decorated unit
   */
  getDecoratedUnit(): IUnit {
    return this.wrappedUnit;
  }

  /**
   * Calculate with performance monitoring
   */
  // Override performCalculation to add performance monitoring
  protected performCalculation(context: UnitContext): number {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();
    
    try {
      // Perform calculation
      const result = this.wrappedUnit.calculate(context);
      
      // Record performance metrics
      this.recordPerformance(startTime, startMemory, false);
      
      return result;
    } catch (error) {
      // Record error metrics
      this.recordPerformance(startTime, startMemory, true);
      throw error;
    }
  }

  // Override validateDecorator to add performance validation
  protected validateDecorator(context: UnitContext): boolean {
    return true; // PerformanceLoggingDecorator doesn't add validation constraints
  }





  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): typeof this.performanceMetrics {
    return { ...this.performanceMetrics };
  }

  /**
   * Reset performance metrics
   */
  resetPerformanceMetrics(): void {
    this.performanceMetrics = {
      totalCalls: 0,
      totalTime: 0,
      averageTime: 0,
      minTime: Infinity,
      maxTime: 0,
      errorCount: 0,
      lastCallTime: null
    };
  }

  /**
   * Get performance report
   */
  getPerformanceReport(): {
    unitId: string;
    unitType: string;
    metrics: {
      totalCalls: number;
      totalTime: number;
      averageTime: number;
      minTime: number;
      maxTime: number;
      errorCount: number;
      lastCallTime: Date | null;
    };
    health: 'excellent' | 'good' | 'fair' | 'poor';
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let health: 'excellent' | 'good' | 'fair' | 'poor' = 'excellent';

    // Analyze performance
    if (this.performanceMetrics.averageTime > 100) {
      recommendations.push('Consider optimizing calculation logic - average time is high');
      health = 'poor';
    } else if (this.performanceMetrics.averageTime > 50) {
      recommendations.push('Consider caching frequently used calculations');
      health = 'fair';
    } else if (this.performanceMetrics.averageTime > 10) {
      health = 'good';
    }

    if (this.performanceMetrics.errorCount > this.performanceMetrics.totalCalls * 0.1) {
      recommendations.push('High error rate detected - investigate error sources');
      health = health === 'excellent' ? 'fair' : 'poor';
    }

    if (this.performanceMetrics.maxTime > 1000) {
      recommendations.push('Some operations are very slow - consider async processing');
      health = health === 'excellent' ? 'fair' : 'poor';
    }

    return {
      unitId: this.wrappedUnit.id,
      unitType: this.wrappedUnit.unitType,
      metrics: this.performanceMetrics,
      health,
      recommendations
    };
  }

  /**
   * Record performance metrics
   */
  private recordPerformance(
    startTime: number,
    startMemory: number,
    isError: boolean,
    operation: string = 'calculate'
  ): void {
    const endTime = performance.now();
    const duration = endTime - startTime;
    const endMemory = this.getMemoryUsage();
    const memoryDelta = endMemory - startMemory;

    // Update metrics
    this.performanceMetrics.totalCalls++;
    this.performanceMetrics.totalTime += duration;
    this.performanceMetrics.averageTime = this.performanceMetrics.totalTime / this.performanceMetrics.totalCalls;
    this.performanceMetrics.minTime = Math.min(this.performanceMetrics.minTime, duration);
    this.performanceMetrics.maxTime = Math.max(this.performanceMetrics.maxTime, duration);
    this.performanceMetrics.lastCallTime = new Date();

    if (isError) {
      this.performanceMetrics.errorCount++;
    }

    // Log slow operations
    if (this.options.logSlowOperations && duration > (this.options.logThreshold || 50)) {
      this.log('warn', `Slow operation detected: ${operation}`, {
        unitId: this.wrappedUnit.id,
        operation,
        duration: `${duration.toFixed(2)}ms`,
        threshold: `${this.options.logThreshold || 50}ms`
      });
    }

    // Log performance metrics
    this.log('debug', `Performance recorded: ${operation}`, {
      unitId: this.wrappedUnit.id,
      operation,
      duration: `${duration.toFixed(2)}ms`,
      memoryDelta: `${memoryDelta.toFixed(2)}MB`,
      isError
    });

    // Send to performance manager if available
    if (this.performanceManager && this.options.trackMetrics !== false) {
      try {
        this.performanceManager.recordOperation({
          unitId: this.wrappedUnit.id,
          operation,
          duration,
          memoryDelta,
          isError,
          timestamp: new Date()
        });
      } catch (error) {
        this.log('warn', 'Failed to record performance metrics', {
          unitId: this.wrappedUnit.id,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Get current memory usage
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  /**
   * Internal logging method
   */
  private log(level: 'debug' | 'info' | 'warn' | 'error', message: string, meta?: Record<string, unknown>): void {
    if (this.logger && typeof this.logger[level] === 'function') {
      this.logger[level](message, {
        timestamp: new Date().toISOString(),
        level,
        message,
        unitId: this.wrappedUnit.id,
        unitType: this.wrappedUnit.unitType,
        ...meta
      });
    } else if (this.logger && typeof this.logger.log === 'function') {
      this.logger.log(`[${level.toUpperCase()}] ${message}`, meta);
    } else {
      console.log(`[${level.toUpperCase()}] ${message}`, meta);
    }
  }

  /**
   * Get the wrapped unit
   */
  getWrappedUnit(): IUnit {
    return this.wrappedUnit;
  }

  /**
   * Get the decorator type
   */
  getDecoratorType(): string {
    return 'PerformanceLoggingDecorator';
  }

  /**
   * Check if the decorator is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Enable or disable the decorator
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

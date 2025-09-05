import type { IUnitDecorator } from './IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { DiContainer } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Performance Logging Decorator
 * Adds performance monitoring and logging to any unit
 * Follows Single Responsibility Principle - only handles performance concerns
 */
export class PerformanceLoggingDecorator implements IUnitDecorator {
  private readonly decoratedUnit: IUnit;
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
    decoratedUnit: IUnit,
    private container: DiContainer,
    private options: {
      logThreshold?: number; // Log if operation takes longer than this (ms)
      trackMetrics?: boolean;
      logSlowOperations?: boolean;
    } = {}
  ) {
    this.decoratedUnit = decoratedUnit;
    
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
    return this.decoratedUnit;
  }

  /**
   * Calculate with performance monitoring
   */
  calculate(context: UnitContext): number {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();
    
    try {
      // Perform calculation
      const result = this.decoratedUnit.calculate(context);
      
      // Record performance metrics
      this.recordPerformance(startTime, startMemory, false);
      
      return result;
    } catch (error) {
      // Record error metrics
      this.recordPerformance(startTime, startMemory, true);
      throw error;
    }
  }

  /**
   * Check if responsive with performance monitoring
   */
  isResponsive(): boolean {
    const startTime = performance.now();
    
    try {
      const result = this.decoratedUnit.isResponsive();
      this.recordPerformance(startTime, 0, false, 'isResponsive');
      return result;
    } catch (error) {
      this.recordPerformance(startTime, 0, true, 'isResponsive');
      throw error;
    }
  }

  /**
   * Get active state with performance monitoring
   */
  get isActive(): boolean {
    const startTime = performance.now();
    
    try {
      const result = this.decoratedUnit.isActive;
      this.recordPerformance(startTime, 0, false, 'isActive');
      return result;
    } catch (error) {
      this.recordPerformance(startTime, 0, true, 'isActive');
      throw error;
    }
  }

  /**
   * Validate with performance monitoring
   */
  validate(context: UnitContext): boolean {
    const startTime = performance.now();
    
    try {
      const result = this.decoratedUnit.validate(context);
      this.recordPerformance(startTime, 0, false, 'validate');
      return result;
    } catch (error) {
      this.recordPerformance(startTime, 0, true, 'validate');
      throw error;
    }
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `PerformanceLoggingDecorator(${this.decoratedUnit.toString()})`;
  }

  /**
   * Clone the decorator
   */
  clone(): PerformanceLoggingDecorator {
    return new PerformanceLoggingDecorator(this.decoratedUnit, this.container, this.options);
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
    metrics: typeof this.performanceMetrics;
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
      unitId: this.decoratedUnit.id,
      unitType: this.decoratedUnit.unitType,
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
        unitId: this.decoratedUnit.id,
        operation,
        duration: `${duration.toFixed(2)}ms`,
        threshold: `${this.options.logThreshold || 50}ms`
      });
    }

    // Log performance metrics
    this.log('debug', `Performance recorded: ${operation}`, {
      unitId: this.decoratedUnit.id,
      operation,
      duration: `${duration.toFixed(2)}ms`,
      memoryDelta: `${memoryDelta.toFixed(2)}MB`,
      isError
    });

    // Send to performance manager if available
    if (this.performanceManager && this.options.trackMetrics !== false) {
      try {
        this.performanceManager.recordOperation({
          unitId: this.decoratedUnit.id,
          operation,
          duration,
          memoryDelta,
          isError,
          timestamp: new Date()
        });
      } catch (error) {
        this.log('warn', 'Failed to record performance metrics', {
          unitId: this.decoratedUnit.id,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Get current memory usage
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && performance.memory) {
      return performance.memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
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
        unitId: this.decoratedUnit.id,
        unitType: this.decoratedUnit.unitType,
        ...meta
      });
    } else if (this.logger && typeof this.logger.log === 'function') {
      this.logger.log(`[${level.toUpperCase()}] ${message}`, meta);
    } else {
      console.log(`[${level.toUpperCase()}] ${message}`, meta);
    }
  }
}

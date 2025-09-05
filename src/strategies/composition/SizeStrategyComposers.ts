import type { IStrategyComposer } from './IStrategyComposer';
import type { UnitContext } from '../../interfaces/IUnit';
import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { Dimension } from '../../enums/Dimension';
import { container, TOKENS } from '../../container/DiContainer';

/**
 * Weighted Average Strategy Composer
 * Combines multiple strategies using weighted averaging
 */
export class WeightedAverageSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'weighted-average-size-composer';
  readonly description = 'Combines multiple size strategies using weighted averaging';
  readonly priority = 1;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private readonly logger: any;

  constructor() {
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    // Can compose when we have multiple strategies that can handle the same value
    return true; // Always return true for weighted averaging
  }

  compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number }>
  ): number {
    const startTime = performance.now();

    try {
      if (strategies.length === 0) {
        this.logger.warn('WeightedAverageSizeComposer', 'compose', 'No strategies provided');
        return 0;
      }

      // Calculate weighted average
      let totalWeight = 0;
      let weightedSum = 0;

      for (const { strategy, weight } of strategies) {
        if (strategy.canHandle && strategy.canHandle(value, unit, Dimension.WIDTH)) {
          // Validate context before calculation
          if (strategy.validateContext && !strategy.validateContext(context)) {
            this.logger.warn(
              'WeightedAverageSizeComposer',
              'compose',
              'Strategy context validation failed',
              { strategyId: strategy.id || 'unknown' }
            );
            continue;
          }

          try {
            const result = strategy.calculate(value, unit, context, Dimension.WIDTH);
            weightedSum += result * weight;
            totalWeight += weight;
          } catch (error) {
            this.logger.warn(
              'WeightedAverageSizeComposer',
              'compose',
              'Strategy calculation failed',
              {
                strategyId: strategy.id || 'unknown',
                error: error instanceof Error ? error.message : String(error),
              }
            );
          }
        }
      }

      if (totalWeight === 0) {
        this.logger.warn('WeightedAverageSizeComposer', 'compose', 'No valid strategies found');
        return 0;
      }

      const result = weightedSum / totalWeight;
      this.recordExecution(performance.now() - startTime, true);

      this.logger.debug('WeightedAverageSizeComposer', 'compose', 'Composition completed', {
        value,
        unit,
        result,
        strategiesUsed: strategies.length,
        totalWeight,
      });

      return result;
    } catch (error) {
      this.recordExecution(performance.now() - startTime, false);
      this.logger.error('WeightedAverageSizeComposer', 'compose', 'Composition failed', {
        value,
        unit,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  getPerformanceMetrics() {
    return {
      totalExecutions: this.totalExecutions,
      successfulExecutions: this.successfulExecutions,
      successRate: this.totalExecutions > 0 ? this.successfulExecutions / this.totalExecutions : 0,
      averageExecutionTime:
        this.executionTimes.length > 0
          ? this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length
          : 0,
    };
  }

  private recordExecution(time: number, success: boolean): void {
    this.executionTimes.push(time);
    this.totalExecutions++;
    if (success) this.successfulExecutions++;

    // Keep only last 1000 execution times
    if (this.executionTimes.length > 1000) {
      this.executionTimes = this.executionTimes.slice(-1000);
    }
  }
}

/**
 * Priority-based Strategy Composer
 * Selects the highest priority strategy that can handle the value
 */
export class PrioritySizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'priority-size-composer';
  readonly description = 'Selects the highest priority strategy that can handle the value';
  readonly priority = 2;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private readonly logger: any;

  constructor() {
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    return true; // Can always compose with priority selection
  }

  compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number }>
  ): number {
    const startTime = performance.now();

    try {
      if (strategies.length === 0) {
        this.logger.warn('PrioritySizeComposer', 'compose', 'No strategies provided');
        return 0;
      }

      // Sort strategies by priority (highest first)
      const sortedStrategies = strategies
        .filter(({ strategy }) => strategy.canHandle && strategy.canHandle(value, unit, Dimension.WIDTH))
        .sort((a, b) => (b.strategy.priority || 0) - (a.strategy.priority || 0));

      if (sortedStrategies.length === 0) {
        this.logger.warn('PrioritySizeComposer', 'compose', 'No valid strategies found');
        return 0;
      }

      // Use the highest priority strategy
      const { strategy } = sortedStrategies[0];

      // Validate context before calculation
      if (strategy.validateContext && !strategy.validateContext(context)) {
        this.logger.warn(
          'PrioritySizeComposer',
          'compose',
          'Strategy context validation failed',
          { strategyId: strategy.id || 'unknown' }
        );
        return 0;
      }

      const result = strategy.calculate(value, unit, context, Dimension.WIDTH);
      this.recordExecution(performance.now() - startTime, true);

      this.logger.debug('PrioritySizeComposer', 'compose', 'Composition completed', {
        value,
        unit,
        result,
        selectedStrategy: strategy.id || 'unknown',
        priority: strategy.priority || 0,
      });

      return result;
    } catch (error) {
      this.recordExecution(performance.now() - startTime, false);
      this.logger.error('PrioritySizeComposer', 'compose', 'Composition failed', {
        value,
        unit,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  getPerformanceMetrics() {
    return {
      totalExecutions: this.totalExecutions,
      successfulExecutions: this.successfulExecutions,
      successRate: this.totalExecutions > 0 ? this.successfulExecutions / this.totalExecutions : 0,
      averageExecutionTime:
        this.executionTimes.length > 0
          ? this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length
          : 0,
    };
  }

  private recordExecution(time: number, success: boolean): void {
    this.executionTimes.push(time);
    this.totalExecutions++;
    if (success) this.successfulExecutions++;

    // Keep only last 1000 execution times
    if (this.executionTimes.length > 1000) {
      this.executionTimes = this.executionTimes.slice(-1000);
    }
  }
}

/**
 * Adaptive Strategy Composer
 * Dynamically adjusts strategy selection based on performance history
 */
export class AdaptiveSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'adaptive-size-composer';
  readonly description = 'Dynamically adjusts strategy selection based on performance history';
  readonly priority = 3;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private strategyPerformance: Map<
    string,
    { successCount: number; totalCount: number; avgTime: number }
  > = new Map();
  private readonly logger: any;

  constructor() {
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    return true; // Can always compose with adaptive selection
  }

  compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number }>
  ): number {
    const startTime = performance.now();

    try {
      if (strategies.length === 0) {
        this.logger.warn('AdaptiveSizeComposer', 'compose', 'No strategies provided');
        return 0;
      }

      // Calculate adaptive weights based on performance history
      const adaptiveStrategies = strategies
        .filter(
          ({ strategy }) => strategy.canHandle && strategy.canHandle(value, unit, Dimension.WIDTH)
        )
        .map(({ strategy, weight }) => {
          const strategyId = strategy.id || 'unknown';
          const performance = this.strategyPerformance.get(strategyId) || {
            successCount: 0,
            totalCount: 0,
            avgTime: 0,
          };

          // Calculate adaptive weight based on success rate and performance
          const successRate = performance.totalCount > 0 ? performance.successCount / performance.totalCount : 0.5;
          const performanceScore = performance.avgTime > 0 ? Math.max(0, 1 - performance.avgTime / 100) : 0.5;
          const adaptiveWeight = weight * successRate * performanceScore;

          return { strategy, weight: adaptiveWeight, originalWeight: weight };
        })
        .filter(({ weight }) => weight > 0);

      if (adaptiveStrategies.length === 0) {
        this.logger.warn('AdaptiveSizeComposer', 'compose', 'No valid strategies found');
        return 0;
      }

      // Use weighted average with adaptive weights
      let totalWeight = 0;
      let weightedSum = 0;

      for (const { strategy, weight } of adaptiveStrategies) {
        // Validate context before calculation
        if (strategy.validateContext && !strategy.validateContext(context)) {
          this.logger.warn(
            'AdaptiveSizeComposer',
            'compose',
            'Strategy context validation failed',
            { strategyId: strategy.id || 'unknown' }
          );
          continue;
        }

        try {
          const result = strategy.calculate(value, unit, context, Dimension.WIDTH);
          weightedSum += result * weight;
          totalWeight += weight;

          // Update performance metrics
          this.updateStrategyPerformance(strategy.id || 'unknown', performance.now() - startTime, true);
        } catch (error) {
          this.logger.warn(
            'AdaptiveSizeComposer',
            'compose',
            'Strategy calculation failed',
            {
              strategyId: strategy.id || 'unknown',
              error: error instanceof Error ? error.message : String(error),
            }
          );
          this.updateStrategyPerformance(strategy.id || 'unknown', performance.now() - startTime, false);
        }
      }

      if (totalWeight === 0) {
        this.logger.warn('AdaptiveSizeComposer', 'compose', 'No valid strategies found');
        return 0;
      }

      const result = weightedSum / totalWeight;
      this.recordExecution(performance.now() - startTime, true);

      this.logger.debug('AdaptiveSizeComposer', 'compose', 'Composition completed', {
        value,
        unit,
        result,
        strategiesUsed: adaptiveStrategies.length,
        totalWeight,
      });

      return result;
    } catch (error) {
      this.recordExecution(performance.now() - startTime, false);
      this.logger.error('AdaptiveSizeComposer', 'compose', 'Composition failed', {
        value,
        unit,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  getPerformanceMetrics() {
    return {
      totalExecutions: this.totalExecutions,
      successfulExecutions: this.successfulExecutions,
      successRate: this.totalExecutions > 0 ? this.successfulExecutions / this.totalExecutions : 0,
      averageExecutionTime:
        this.executionTimes.length > 0
          ? this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length
          : 0,
      strategyPerformance: Object.fromEntries(this.strategyPerformance),
    };
  }

  private recordExecution(time: number, success: boolean): void {
    this.executionTimes.push(time);
    this.totalExecutions++;
    if (success) this.successfulExecutions++;

    // Keep only last 1000 execution times
    if (this.executionTimes.length > 1000) {
      this.executionTimes = this.executionTimes.slice(-1000);
    }
  }

  private updateStrategyPerformance(strategyId: string, time: number, success: boolean): void {
    const performance = this.strategyPerformance.get(strategyId) || {
      successCount: 0,
      totalCount: 0,
      avgTime: 0,
    };

    performance.totalCount++;
    if (success) performance.successCount++;

    // Update average time using exponential moving average
    const alpha = 0.1; // Smoothing factor
    performance.avgTime = performance.avgTime * (1 - alpha) + time * alpha;

    this.strategyPerformance.set(strategyId, performance);
  }
}

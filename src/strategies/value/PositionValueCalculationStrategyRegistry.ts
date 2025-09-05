import type { IPositionValueCalculationStrategy } from '../value-calculation/IPositionValueCalculationStrategy';
import type { IPositionValueCalculationStrategyRegistry } from '../value-calculation/IPositionValueCalculationStrategy';
import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
// AxisUnit enum not found, using string for now

/**
 * Registry for position value calculation strategies
 * Manages registration, retrieval, and selection of strategies
 * 
 * Note: This class focuses solely on strategy registry logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class PositionValueCalculationStrategyRegistry
  implements IPositionValueCalculationStrategyRegistry
{
  private readonly strategies = new Map<string, IPositionValueCalculationStrategy>();
  private registryStatistics = {
    totalRegistrations: 0,
    totalRetrievals: 0,
    successfulRetrievals: 0,
    failedRetrievals: 0,
    strategiesByType: {} as Record<string, number>,
    averageRetrievalTime: 0,
    totalRetrievalTime: 0,
  };

  /**
   * Register a position value calculation strategy
   */
  public registerStrategy(strategy: IPositionValueCalculationStrategy): void {
    if (!strategy || !strategy.strategyId) {
      throw new Error('Invalid strategy: strategy and strategyId are required');
    }

    this.strategies.set(strategy.strategyId, strategy);
    this.registryStatistics.totalRegistrations++;
    this.registryStatistics.strategiesByType[strategy.positionValue] = 
      (this.registryStatistics.strategiesByType[strategy.positionValue] || 0) + 1;
  }

  /**
   * Unregister a position value calculation strategy
   */
  public unregisterStrategy(strategyId: string): boolean {
    const removed = this.strategies.delete(strategyId);
    if (removed) {
      this.registryStatistics.totalRegistrations = Math.max(0, this.registryStatistics.totalRegistrations - 1);
    }
    return removed;
  }

  /**
   * Get a strategy by ID
   */
  public getStrategy(strategyId: string): IPositionValueCalculationStrategy | undefined {
    this.registryStatistics.totalRetrievals++;
    const startTime = performance.now();

    try {
      const strategy = this.strategies.get(strategyId);
      if (strategy) {
        this.registryStatistics.successfulRetrievals++;
      } else {
        this.registryStatistics.failedRetrievals++;
      }
      
      this.updateRetrievalTime(performance.now() - startTime);
      return strategy;
    } catch (error) {
      this.registryStatistics.failedRetrievals++;
      this.updateRetrievalTime(performance.now() - startTime);
      return undefined;
    }
  }

  /**
   * Get all strategies
   */
  public getAllStrategies(): IPositionValueCalculationStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Get strategies by position value
   */
  public getStrategiesByPositionValue(positionValue: PositionValue): IPositionValueCalculationStrategy[] {
    return Array.from(this.strategies.values()).filter(
      strategy => strategy.positionValue === positionValue
    );
  }

  /**
   * Get strategies by position unit
   */
  public getStrategiesByPositionUnit(positionUnit: PositionUnit): IPositionValueCalculationStrategy[] {
    return Array.from(this.strategies.values()).filter(
      strategy => strategy.positionUnit === positionUnit
    );
  }

  /**
   * Get strategies by axis unit
   */
  public getStrategiesByAxisUnit(axisUnit: string): IPositionValueCalculationStrategy[] {
    return Array.from(this.strategies.values()).filter(
      strategy => strategy.axisUnit === axisUnit
    );
  }

  /**
   * Find the best strategy for the given parameters
   */
  public findBestStrategy(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: string
  ): IPositionValueCalculationStrategy | undefined {
    this.registryStatistics.totalRetrievals++;
    const startTime = performance.now();

    try {
      const matchingStrategies = Array.from(this.strategies.values()).filter(strategy =>
        strategy.canHandle(positionValue, positionUnit, axisUnit)
      );

      if (matchingStrategies.length === 0) {
        this.registryStatistics.failedRetrievals++;
        this.updateRetrievalTime(performance.now() - startTime);
        return undefined;
      }

      // Find strategy with highest priority (assuming strategy has getPriority method)
      const bestStrategy = matchingStrategies.reduce((best, current) => {
        const currentPriority = typeof current.getPriority === 'function' ? current.getPriority() : 0;
        const bestPriority = typeof best.getPriority === 'function' ? best.getPriority() : 0;
        return currentPriority > bestPriority ? current : best;
      });

      this.registryStatistics.successfulRetrievals++;
      this.updateRetrievalTime(performance.now() - startTime);
      return bestStrategy;
    } catch (error) {
      this.registryStatistics.failedRetrievals++;
      this.updateRetrievalTime(performance.now() - startTime);
      return undefined;
    }
  }

  /**
   * Check if a strategy is registered
   */
  public hasStrategy(strategyId: string): boolean {
    return this.strategies.has(strategyId);
  }

  /**
   * Get strategy count
   */
  public getStrategyCount(): number {
    return this.strategies.size;
  }

  /**
   * Get strategy count by position value
   */
  public getStrategyCountByPositionValue(positionValue: PositionValue): number {
    return this.getStrategiesByPositionValue(positionValue).length;
  }

  /**
   * Get strategy count by position unit
   */
  public getStrategyCountByPositionUnit(positionUnit: PositionUnit): number {
    return this.getStrategiesByPositionUnit(positionUnit).length;
  }

  /**
   * Get strategy count by axis unit
   */
  public getStrategyCountByAxisUnit(axisUnit: string): number {
    return this.getStrategiesByAxisUnit(axisUnit).length;
  }

  /**
   * Clear all strategies
   */
  public clearStrategies(): void {
    this.strategies.clear();
    this.registryStatistics = {
      totalRegistrations: 0,
      totalRetrievals: 0,
      successfulRetrievals: 0,
      failedRetrievals: 0,
      strategiesByType: {},
      averageRetrievalTime: 0,
      totalRetrievalTime: 0,
    };
  }

  /**
   * Get registry statistics
   */
  public getRegistryStatistics() {
    return { ...this.registryStatistics };
  }

  /**
   * Get success rate
   */
  public getSuccessRate(): number {
    if (this.registryStatistics.totalRetrievals === 0) return 1;
    return this.registryStatistics.successfulRetrievals / this.registryStatistics.totalRetrievals;
  }

  /**
   * Get strategies by type
   */
  public getStrategiesByType(): Record<string, number> {
    return { ...this.registryStatistics.strategiesByType };
  }

  /**
   * Get average retrieval time
   */
  public getAverageRetrievalTime(): number {
    return this.registryStatistics.averageRetrievalTime;
  }

  /**
   * Check if registry is performing well
   */
  public isPerformingWell(): boolean {
    const successRate = this.getSuccessRate();
    const averageTime = this.registryStatistics.averageRetrievalTime;
    
    return successRate > 0.9 && averageTime < 10; // 90% success rate and < 10ms average
  }

  /**
   * Update retrieval time statistics
   */
  private updateRetrievalTime(duration: number): void {
    this.registryStatistics.totalRetrievalTime += duration;
    this.registryStatistics.averageRetrievalTime = 
      this.registryStatistics.totalRetrievalTime / this.registryStatistics.totalRetrievals;
  }
}

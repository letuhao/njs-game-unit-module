import type { ISizeValueCalculationStrategy } from './ISizeValueCalculationStrategy';
import type { ISizeValueCalculationStrategyRegistry } from './ISizeValueCalculationStrategy';
import { SizeValue } from '../../enums/SizeValue';
import { SizeUnit } from '../../enums/SizeUnit';
import { Dimension } from '../../enums/Dimension';

/**
 * Registry for size value calculation strategies
 * Manages registration, retrieval, and selection of strategies
 * Optimized for high-performance real-time calculations
 * 
 * Note: This class focuses solely on strategy registry logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class SizeValueCalculationStrategyRegistry implements ISizeValueCalculationStrategyRegistry {
  private readonly strategies = new Map<string, ISizeValueCalculationStrategy>();

  // High-performance lookup tables for O(1) access
  private readonly strategyCache = new Map<string, ISizeValueCalculationStrategy>();
  private readonly cacheKeyGenerator = (
    sizeValue: SizeValue | number,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
  ): string => `${sizeValue}:${sizeUnit}:${dimension}`;

  // Cache invalidation tracking
  private cacheVersion = 0;
  private lastCacheVersion = -1;

  private registryStatistics = {
    totalRegistrations: 0,
    totalRetrievals: 0,
    successfulRetrievals: 0,
    failedRetrievals: 0,
    cacheHits: 0,
    cacheMisses: 0,
    strategiesByType: {} as Record<string, number>,
    averageRetrievalTime: 0,
    totalRetrievalTime: 0,
  };

  /**
   * Register a size value calculation strategy
   */
  public registerStrategy(strategy: ISizeValueCalculationStrategy): void {
    if (!strategy || !strategy.strategyId) {
      throw new Error('Invalid strategy: strategy and strategyId are required');
    }

    this.strategies.set(strategy.strategyId, strategy);
    this.cacheVersion++; // Invalidate cache
    this.registryStatistics.totalRegistrations++;
    this.registryStatistics.strategiesByType[strategy.sizeValue] = 
      (this.registryStatistics.strategiesByType[strategy.sizeValue] || 0) + 1;
  }

  /**
   * Unregister a size value calculation strategy
   */
  public unregisterStrategy(strategyId: string): boolean {
    const removed = this.strategies.delete(strategyId);
    if (removed) {
      this.cacheVersion++; // Invalidate cache
      this.registryStatistics.totalRegistrations = Math.max(0, this.registryStatistics.totalRegistrations - 1);
    }
    return removed;
  }

  /**
   * Get a strategy by ID
   */
  public getStrategy(strategyId: string): ISizeValueCalculationStrategy | undefined {
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
  public getAllStrategies(): ISizeValueCalculationStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Get strategies by size value
   */
  public getStrategiesBySizeValue(sizeValue: SizeValue): ISizeValueCalculationStrategy[] {
    return Array.from(this.strategies.values()).filter(
      strategy => strategy.sizeValue === sizeValue
    );
  }

  /**
   * Get strategies by size unit
   */
  public getStrategiesBySizeUnit(sizeUnit: SizeUnit): ISizeValueCalculationStrategy[] {
    return Array.from(this.strategies.values()).filter(
      strategy => strategy.sizeUnit === sizeUnit
    );
  }

  /**
   * Get strategies by dimension
   */
  public getStrategiesByDimension(dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): ISizeValueCalculationStrategy[] {
    return Array.from(this.strategies.values()).filter(
      strategy => strategy.dimension === dimension
    );
  }

  /**
   * Find the best strategy for the given parameters
   */
  public findBestStrategy(
    sizeValue: SizeValue | number,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
  ): ISizeValueCalculationStrategy | undefined {
    this.registryStatistics.totalRetrievals++;
    const startTime = performance.now();

    try {
      // Check cache first
      const cacheKey = this.cacheKeyGenerator(sizeValue, sizeUnit, dimension);
      if (this.cacheVersion === this.lastCacheVersion && this.strategyCache.has(cacheKey)) {
        this.registryStatistics.cacheHits++;
        this.registryStatistics.successfulRetrievals++;
        this.updateRetrievalTime(performance.now() - startTime);
        return this.strategyCache.get(cacheKey);
      }

      this.registryStatistics.cacheMisses++;

      // Find matching strategies
      const matchingStrategies = Array.from(this.strategies.values()).filter(strategy =>
        strategy.canHandle(sizeValue, sizeUnit, dimension)
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

      // Cache the result
      this.strategyCache.set(cacheKey, bestStrategy);
      this.lastCacheVersion = this.cacheVersion;

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
   * Get strategy count by size value
   */
  public getStrategyCountBySizeValue(sizeValue: SizeValue): number {
    return this.getStrategiesBySizeValue(sizeValue).length;
  }

  /**
   * Get strategy count by size unit
   */
  public getStrategyCountBySizeUnit(sizeUnit: SizeUnit): number {
    return this.getStrategiesBySizeUnit(sizeUnit).length;
  }

  /**
   * Get strategy count by dimension
   */
  public getStrategyCountByDimension(dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): number {
    return this.getStrategiesByDimension(dimension).length;
  }

  /**
   * Clear all strategies
   */
  public clearStrategies(): void {
    this.strategies.clear();
    this.strategyCache.clear();
    this.cacheVersion++;
    this.lastCacheVersion = -1;
    this.registryStatistics = {
      totalRegistrations: 0,
      totalRetrievals: 0,
      successfulRetrievals: 0,
      failedRetrievals: 0,
      cacheHits: 0,
      cacheMisses: 0,
      strategiesByType: {},
      averageRetrievalTime: 0,
      totalRetrievalTime: 0,
    };
  }

  /**
   * Clear strategy cache
   */
  public clearCache(): void {
    this.strategyCache.clear();
    this.cacheVersion++;
    this.lastCacheVersion = -1;
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
   * Get cache hit rate
   */
  public getCacheHitRate(): number {
    const totalCacheRequests = this.registryStatistics.cacheHits + this.registryStatistics.cacheMisses;
    if (totalCacheRequests === 0) return 1;
    return this.registryStatistics.cacheHits / totalCacheRequests;
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
    const cacheHitRate = this.getCacheHitRate();
    const averageTime = this.registryStatistics.averageRetrievalTime;
    
    return successRate > 0.9 && cacheHitRate > 0.7 && averageTime < 5; // 90% success, 70% cache hit, < 5ms average
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

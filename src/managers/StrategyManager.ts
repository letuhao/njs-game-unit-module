import type { IUnitStrategy } from '../strategies/IUnitStrategy';
import type { IStrategyInput } from '../interfaces/strategy/IStrategyInputTypes';

/**
 * Strategy Manager
 * Handles strategy registration, selection, and management
 * Follows Single Responsibility Principle - only manages strategies
 * 
 * Note: This class focuses solely on strategy management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export interface IStrategyManager {
  // Strategy registration
  registerStrategy(strategy: IUnitStrategy): void;
  unregisterStrategy(unitType: string): boolean;

  // Strategy selection
  getStrategy(input: IStrategyInput): IUnitStrategy | undefined;
  getStrategiesByType(type: string): IUnitStrategy[];
  getBestStrategy(input: IStrategyInput): IUnitStrategy | undefined;

  // Strategy management
  getAllStrategies(): IUnitStrategy[];
  getStrategyCount(): number;
  getStrategyCountByType(type: string): number;
  clearStrategies(): void;

  // Strategy validation
  hasStrategy(unitType: string): boolean;
  validateStrategy(strategy: IUnitStrategy): boolean;
}

/**
 * Strategy Manager Implementation
 * Manages strategy registration, selection, and lifecycle
 */
export class StrategyManager implements IStrategyManager {
  private strategies: Map<string, IUnitStrategy> = new Map();
  private strategyStatistics = {
    totalRegistrations: 0,
    totalSelections: 0,
    successfulSelections: 0,
    failedSelections: 0,
  };

  /**
   * Register a strategy
   */
  public registerStrategy(strategy: IUnitStrategy): void {
    if (this.validateStrategy(strategy)) {
      this.strategies.set(strategy.unitType, strategy);
      this.strategyStatistics.totalRegistrations++;
    }
  }

  /**
   * Unregister a strategy
   */
  public unregisterStrategy(unitType: string): boolean {
    const removed = this.strategies.delete(unitType);
    return removed;
  }

  /**
   * Get strategy for input
   */
  public getStrategy(input: IStrategyInput): IUnitStrategy | undefined {
    this.strategyStatistics.totalSelections++;
    
    try {
      const strategy = this.strategies.get(input.type || 'default');
      if (strategy) {
        this.strategyStatistics.successfulSelections++;
      } else {
        this.strategyStatistics.failedSelections++;
      }
      return strategy;
    } catch (error) {
      this.strategyStatistics.failedSelections++;
      return undefined;
    }
  }

  /**
   * Get strategies by type
   */
  public getStrategiesByType(type: string): IUnitStrategy[] {
    return Array.from(this.strategies.values()).filter(strategy => strategy.unitType === type);
  }

  /**
   * Get best strategy for input
   */
  public getBestStrategy(input: IStrategyInput): IUnitStrategy | undefined {
    const strategies = this.getStrategiesByType(input.type || 'default');
    
    if (strategies.length === 0) {
      return undefined;
    }

    // Find strategy with highest priority
    return strategies.reduce((best, current) => {
      return current.getPriority() > best.getPriority() ? current : best;
    });
  }

  /**
   * Get all strategies
   */
  public getAllStrategies(): IUnitStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Get strategy count
   */
  public getStrategyCount(): number {
    return this.strategies.size;
  }

  /**
   * Get strategy count by type
   */
  public getStrategyCountByType(type: string): number {
    return this.getStrategiesByType(type).length;
  }

  /**
   * Clear all strategies
   */
  public clearStrategies(): void {
    this.strategies.clear();
  }

  /**
   * Check if strategy exists
   */
  public hasStrategy(unitType: string): boolean {
    return this.strategies.has(unitType);
  }

  /**
   * Validate strategy
   */
  public validateStrategy(strategy: IUnitStrategy): boolean {
    return (
      strategy &&
      typeof strategy.unitType === 'string' &&
      typeof strategy.getPriority === 'function' &&
      typeof strategy.canHandle === 'function' &&
      typeof strategy.calculate === 'function'
    );
  }

  /**
   * Get strategy statistics
   */
  public getStrategyStatistics() {
    return { ...this.strategyStatistics };
  }

  /**
   * Clear strategy statistics
   */
  public clearStrategyStatistics(): void {
    this.strategyStatistics = {
      totalRegistrations: 0,
      totalSelections: 0,
      successfulSelections: 0,
      failedSelections: 0,
    };
  }

  /**
   * Get strategy success rate
   */
  public getStrategySuccessRate(): number {
    if (this.strategyStatistics.totalSelections === 0) return 1;
    return this.strategyStatistics.successfulSelections / this.strategyStatistics.totalSelections;
  }

  /**
   * Get strategy performance metrics
   */
  public getStrategyPerformanceMetrics() {
    return {
      totalStrategies: this.strategies.size,
      totalRegistrations: this.strategyStatistics.totalRegistrations,
      totalSelections: this.strategyStatistics.totalSelections,
      successRate: this.getStrategySuccessRate(),
      failureRate: this.strategyStatistics.failedSelections / Math.max(1, this.strategyStatistics.totalSelections),
    };
  }
}
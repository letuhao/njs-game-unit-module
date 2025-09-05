import type { IStrategyManager } from './IStrategyManager';
import type { IUnitStrategy } from '../interfaces/IUnitStrategy';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Strategy Manager Implementation
 * Concrete implementation of strategy management using DI
 */
export class StrategyManager implements IStrategyManager {
  private strategies: Map<string, IUnitStrategy> = new Map();
  private logger: any;

  constructor() {
    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }
  }

  /**
   * Register a new strategy
   */
  public registerStrategy(strategy: IUnitStrategy): void {
    this.logger.debug('StrategyManager', 'registerStrategy', 'Registering strategy', {
      unitType: strategy.unitType,
      strategyName: strategy.constructor.name,
    });

    this.strategies.set(strategy.unitType, strategy);
  }

  /**
   * Unregister a strategy
   */
  public unregisterStrategy(unitType: string): boolean {
    const removed = this.strategies.delete(unitType);
    
    this.logger.debug('StrategyManager', 'unregisterStrategy', 'Unregistering strategy', {
      unitType,
      removed,
    });

    return removed;
  }

  /**
   * Get a strategy by unit type
   */
  public getStrategy(unitType: string): IUnitStrategy | undefined {
    const strategy = this.strategies.get(unitType);
    
    if (strategy) {
      this.logger.debug('StrategyManager', 'getStrategy', 'Strategy found', {
        unitType,
        strategyName: strategy.constructor.name,
      });
    } else {
      this.logger.warn('StrategyManager', 'getStrategy', 'Strategy not found', {
        unitType,
      });
    }

    return strategy;
  }

  /**
   * Check if a strategy exists
   */
  public hasStrategy(unitType: string): boolean {
    return this.strategies.has(unitType);
  }

  /**
   * Get all registered strategies
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
   * Clear all strategies
   */
  public clearStrategies(): void {
    this.logger.debug('StrategyManager', 'clearStrategies', 'Clearing all strategies', {
      strategyCount: this.strategies.size,
    });

    this.strategies.clear();
  }

  /**
   * Get strategy statistics
   */
  public getStatistics(): {
    totalStrategies: number;
    strategyTypes: string[];
    strategyNames: string[];
  } {
    const strategyTypes: string[] = [];
    const strategyNames: string[] = [];

    for (const [unitType, strategy] of this.strategies) {
      strategyTypes.push(unitType);
      strategyNames.push(strategy.constructor.name);
    }

    return {
      totalStrategies: this.strategies.size,
      strategyTypes,
      strategyNames,
    };
  }

  /**
   * Validate strategy before registration
   */
  private validateStrategy(strategy: IUnitStrategy): boolean {
    if (!strategy) {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Strategy is null or undefined');
      return false;
    }

    if (!strategy.unitType) {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Strategy missing unitType');
      return false;
    }

    if (typeof strategy.calculate !== 'function') {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Strategy missing calculate method');
      return false;
    }

    return true;
  }

  /**
   * Register strategy with validation
   */
  public registerStrategyWithValidation(strategy: IUnitStrategy): boolean {
    if (!this.validateStrategy(strategy)) {
      return false;
    }

    this.registerStrategy(strategy);
    return true;
  }

  /**
   * Get strategies by type pattern
   */
  public getStrategiesByPattern(pattern: string): IUnitStrategy[] {
    const regex = new RegExp(pattern, 'i');
    return this.getAllStrategies().filter(strategy => 
      regex.test(strategy.unitType) || regex.test(strategy.constructor.name)
    );
  }

  /**
   * Replace strategy
   */
  public replaceStrategy(unitType: string, newStrategy: IUnitStrategy): boolean {
    if (!this.hasStrategy(unitType)) {
      this.logger.warn('StrategyManager', 'replaceStrategy', 'Strategy not found for replacement', {
        unitType,
      });
      return false;
    }

    if (!this.validateStrategy(newStrategy)) {
      return false;
    }

    this.strategies.set(unitType, newStrategy);
    
    this.logger.debug('StrategyManager', 'replaceStrategy', 'Strategy replaced', {
      unitType,
      newStrategyName: newStrategy.constructor.name,
    });

    return true;
  }

  /**
   * Get strategy metadata
   */
  public getStrategyMetadata(unitType: string): {
    exists: boolean;
    strategyName: string;
    unitType: string;
    hasCalculateMethod: boolean;
  } {
    const strategy = this.getStrategy(unitType);
    
    return {
      exists: !!strategy,
      strategyName: strategy?.constructor.name || 'Unknown',
      unitType: strategy?.unitType || unitType,
      hasCalculateMethod: typeof strategy?.calculate === 'function',
    };
  }

  /**
   * Export strategy configuration
   */
  public exportConfiguration(): {
    strategies: Record<string, string>;
    timestamp: string;
    version: string;
  } {
    const strategies: Record<string, string> = {};
    for (const [unitType, strategy] of this.strategies) {
      strategies[unitType] = strategy.constructor.name;
    }

    return {
      strategies,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  /**
   * Import strategy configuration
   */
  public importConfiguration(config: {
    strategies: Record<string, string>;
    timestamp?: string;
    version?: string;
  }): void {
    if (config.strategies && typeof config.strategies === 'object') {
      // This would typically resolve strategies from DI container
      this.logger.debug('StrategyManager', 'importConfiguration', 'Strategy configuration imported', {
        strategyCount: Object.keys(config.strategies).length,
      });
    } else {
      throw new Error('Invalid configuration format');
    }
  }
}
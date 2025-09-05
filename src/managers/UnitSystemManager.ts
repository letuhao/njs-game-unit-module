import type { IUnitSystemManager } from './IUnitSystemManager';
import type { IUnitRegistryManager } from './IUnitRegistryManager';
import type { IStrategyManager } from './IStrategyManager';
import type { ICommandManager } from './CommandManager';
import type { IObserverManager } from './IObserverManager';
import type { IValidationManager } from './ValidationManager';
import type { IPerformanceManager } from './IPerformanceManager';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Unit System Manager Implementation
 * Concrete implementation of unit system management using DI
 */
export class UnitSystemManager implements IUnitSystemManager {
  private unitRegistryManager: IUnitRegistryManager;
  private strategyManager: IStrategyManager;
  private commandManager: ICommandManager;
  private observerManager: IObserverManager;
  private validationManager: IValidationManager;
  private performanceManager: IPerformanceManager;
  private logger: any;
  private isInitialized: boolean = false;
  private configuration: Record<string, unknown> = {};

  constructor() {
    // Resolve logger from DI container
    try {
      this.logger = container.resolve(TOKENS.LOGGER);
    } catch (error) {
      this.logger = console; // Fallback to console
    }

    // Resolve managers from DI container
    try {
      this.unitRegistryManager = container.resolve(TOKENS.UNIT_REGISTRY_MANAGER);
      this.strategyManager = container.resolve(TOKENS.STRATEGY_MANAGER);
      this.commandManager = container.resolve(TOKENS.COMMAND_MANAGER);
      this.observerManager = container.resolve(TOKENS.OBSERVER_MANAGER);
      this.validationManager = container.resolve(TOKENS.VALIDATION_MANAGER);
      this.performanceManager = container.resolve(TOKENS.PERFORMANCE_MANAGER);
    } catch (error) {
      this.logger.warn('UnitSystemManager', 'constructor', 'Failed to resolve managers from DI, using fallback', { error });
      // Fallback to direct instantiation
      this.unitRegistryManager = new (require('./UnitRegistryManager').UnitRegistryManager)();
      this.strategyManager = new (require('./StrategyManager').StrategyManager)();
      this.commandManager = new (require('./CommandManager').CommandManager)();
      this.observerManager = new (require('./ObserverManager').ObserverManager)();
      this.validationManager = new (require('./ValidationManager').ValidationManager)();
      this.performanceManager = new (require('./PerformanceManager').PerformanceManager)();
    }
  }

  /**
   * Initialize the unit system
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      this.logger.warn('UnitSystemManager', 'initialize', 'System already initialized');
      return;
    }

    this.logger.info('UnitSystemManager', 'initialize', 'Initializing unit system');

    try {
      // Initialize all managers
      await this.initializeManagers();
      
      this.isInitialized = true;
      
      this.logger.info('UnitSystemManager', 'initialize', 'Unit system initialized successfully');
    } catch (error) {
      this.logger.error('UnitSystemManager', 'initialize', 'Failed to initialize unit system', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Initialize all managers
   */
  private async initializeManagers(): Promise<void> {
    // Initialize each manager
    this.logger.debug('UnitSystemManager', 'initializeManagers', 'Initializing managers');
    
    // Managers are already instantiated, just log their status
    this.logger.debug('UnitSystemManager', 'initializeManagers', 'Managers initialized', {
      unitRegistryManager: !!this.unitRegistryManager,
      strategyManager: !!this.strategyManager,
      commandManager: !!this.commandManager,
      observerManager: !!this.observerManager,
      validationManager: !!this.validationManager,
      performanceManager: !!this.performanceManager,
    });
  }

  /**
   * Shutdown the unit system
   */
  public async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      this.logger.warn('UnitSystemManager', 'shutdown', 'System not initialized');
      return;
    }

    this.logger.info('UnitSystemManager', 'shutdown', 'Shutting down unit system');

    try {
      // Clear all managers
      this.unitRegistryManager.clearUnits();
      this.strategyManager.clearStrategies();
      this.observerManager.clearObservers();
      this.performanceManager.clearHistory();
      
      this.isInitialized = false;
      
      this.logger.info('UnitSystemManager', 'shutdown', 'Unit system shut down successfully');
    } catch (error) {
      this.logger.error('UnitSystemManager', 'shutdown', 'Failed to shutdown unit system', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Get unit registry manager
   */
  public getUnitRegistryManager(): IUnitRegistryManager {
    return this.unitRegistryManager;
  }

  /**
   * Get strategy manager
   */
  public getStrategyManager(): IStrategyManager {
    return this.strategyManager;
  }

  /**
   * Get command manager
   */
  public getCommandManager(): ICommandManager {
    return this.commandManager;
  }

  /**
   * Get observer manager
   */
  public getObserverManager(): IObserverManager {
    return this.observerManager;
  }

  /**
   * Get validation manager
   */
  public getValidationManager(): IValidationManager {
    return this.validationManager;
  }

  /**
   * Get performance manager
   */
  public getPerformanceManager(): IPerformanceManager {
    return this.performanceManager;
  }

  /**
   * Check if system is initialized
   */
  public isSystemInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Get system configuration
   */
  public getConfiguration(): Record<string, unknown> {
    return { ...this.configuration };
  }

  /**
   * Set system configuration
   */
  public setConfiguration(config: Record<string, unknown>): void {
    this.configuration = { ...config };
    
    this.logger.debug('UnitSystemManager', 'setConfiguration', 'Configuration updated', {
      configKeys: Object.keys(config),
    });
  }

  /**
   * Get system status
   */
  public getSystemStatus(): {
    initialized: boolean;
    managers: {
      unitRegistry: boolean;
      strategy: boolean;
      command: boolean;
      observer: boolean;
      validation: boolean;
      performance: boolean;
    };
    statistics: {
      totalUnits: number;
      totalStrategies: number;
      totalObservers: number;
      totalOperations: number;
    };
  } {
    return {
      initialized: this.isInitialized,
      managers: {
        unitRegistry: !!this.unitRegistryManager,
        strategy: !!this.strategyManager,
        command: !!this.commandManager,
        observer: !!this.observerManager,
        validation: !!this.validationManager,
        performance: !!this.performanceManager,
      },
      statistics: {
        totalUnits: this.unitRegistryManager.getUnitCount(),
        totalStrategies: this.strategyManager.getStrategyCount(),
        totalObservers: this.observerManager.getObserverCount(),
        totalOperations: this.performanceManager.getOverallStats().totalOperations,
      },
    };
  }

  /**
   * Get system health
   */
  public getSystemHealth(): {
    healthy: boolean;
    issues: string[];
    performance: {
      averageOperationTime: number;
      errorRate: number;
      memoryUsage: number;
    };
  } {
    const issues: string[] = [];
    const performance = this.performanceManager.getOverallStats();

    // Check for issues
    if (!this.isInitialized) {
      issues.push('System not initialized');
    }

    if (performance.errorRate > 10) {
      issues.push(`High error rate: ${performance.errorRate.toFixed(2)}%`);
    }

    if (performance.averageOperationTime > 1000) {
      issues.push(`Slow operations: ${performance.averageOperationTime.toFixed(2)}ms average`);
    }

    if (performance.memoryUsage > 1000000) {
      issues.push(`High memory usage: ${performance.memoryUsage} bytes`);
    }

    return {
      healthy: issues.length === 0,
      issues,
      performance: {
        averageOperationTime: performance.averageOperationTime,
        errorRate: performance.errorRate,
        memoryUsage: performance.memoryUsage,
      },
    };
  }

  /**
   * Reset system
   */
  public async reset(): Promise<void> {
    this.logger.info('UnitSystemManager', 'reset', 'Resetting unit system');

    try {
      await this.shutdown();
      await this.initialize();
      
      this.logger.info('UnitSystemManager', 'reset', 'Unit system reset successfully');
    } catch (error) {
      this.logger.error('UnitSystemManager', 'reset', 'Failed to reset unit system', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Export system data
   */
  public exportSystemData(): {
    configuration: Record<string, unknown>;
    status: any;
    health: any;
    timestamp: string;
  } {
    return {
      configuration: this.getConfiguration(),
      status: this.getSystemStatus(),
      health: this.getSystemHealth(),
      timestamp: new Date().toISOString(),
    };
  }
}
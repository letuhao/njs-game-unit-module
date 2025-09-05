import type { DiContainer } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';
import type { IRefactoredUnitSystemManager } from '../managers/RefactoredUnitSystemManager';
import { RefactoredUnitSystemManager } from '../managers/RefactoredUnitSystemManager';
import type { ICommandManager } from '../managers/CommandManager';
import type { IObserverManager } from '../managers/ObserverManager';
import type { IPerformanceManager } from '../managers/PerformanceManager';
import type { IStrategyManager } from '../managers/StrategyManager';
import type { IUnitRegistryManager } from '../managers/UnitRegistryManager';
import type { IValidationManager } from '../managers/ValidationManager';

/**
 * Factory for creating UnitSystemManager with dependency injection
 * Resolves all dependencies from the DI container
 */
export class UnitSystemManagerFactory {
  constructor(private container: DiContainer) {}

  /**
   * Create a UnitSystemManager with all dependencies injected
   * @returns Configured UnitSystemManager instance
   */
  public createUnitSystemManager(): IRefactoredUnitSystemManager {
    // Resolve all dependencies from the container
    const commandManager = this.container.resolve(TOKENS.COMMAND_MANAGER) as ICommandManager;
    const observerManager = this.container.resolve(TOKENS.OBSERVER_MANAGER) as IObserverManager;
    const performanceManager = this.container.resolve(TOKENS.PERFORMANCE_MANAGER) as IPerformanceManager;
    const strategyManager = this.container.resolve(TOKENS.STRATEGY_MANAGER) as IStrategyManager;
    const unitRegistryManager = this.container.resolve(TOKENS.UNIT_REGISTRY_MANAGER) as IUnitRegistryManager;
    const validationManager = this.container.resolve(TOKENS.VALIDATION_MANAGER) as IValidationManager;

    // Create the manager with injected dependencies
    return new RefactoredUnitSystemManager(
      commandManager,
      observerManager,
      performanceManager,
      strategyManager,
      unitRegistryManager,
      validationManager
    );
  }

  /**
   * Create a UnitSystemManager with custom configuration
   * @param config - Custom configuration overrides
   * @returns Configured UnitSystemManager instance
   */
  public createUnitSystemManagerWithConfig(config: {
    maxUnits?: number;
    maxStrategies?: number;
    maxObservers?: number;
    performanceMonitoring?: boolean;
    validationEnabled?: boolean;
    memoryLimit?: number;
  }): IRefactoredUnitSystemManager {
    const manager = this.createUnitSystemManager();
    
    // Apply custom configuration
    manager.updateConfiguration(config);
    
    return manager;
  }
}

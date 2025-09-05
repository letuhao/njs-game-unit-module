import { container, TOKENS } from './DiContainer';
import { UnitAdapterFactory } from '../adapters/IUnitAdapter';
import { LegacyPositionUnitAdapter } from '../adapters/LegacyPositionUnitAdapter';
import { LegacySizeUnitAdapter } from '../adapters/LegacySizeUnitAdapter';
import { EnhancedSizeUnitCalculator } from '../classes/EnhancedSizeUnitCalculator';
import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { RefactoredPositionUnitCalculator } from '../classes/RefactoredPositionUnitCalculator';
import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { RefactoredSizeUnitCalculator } from '../classes/RefactoredSizeUnitCalculator';
import { RefactoredScaleUnitCalculator } from '../classes/RefactoredScaleUnitCalculator';
import { RandomValueNumber } from '../classes/RandomValueNumber';
import { BatchCalculationCommand } from '../commands/BatchCalculationCommand';
import { CalculatePositionCommand } from '../commands/CalculatePositionCommand';
import { CalculateSizeCommand } from '../commands/CalculateSizeCommand';
import { UnitGroupComposite } from '../composites/UnitGroupComposite';
import { CachingDecorator } from '../decorators/CachingDecorator';
import { LoggingDecorator } from '../decorators/LoggingDecorator';
import { ValidationDecorator } from '../decorators/ValidationDecorator';
import { CommandManager } from '../managers/CommandManager';
import { ObserverManager } from '../managers/ObserverManager';
import { ValidationManager } from '../managers/ValidationManager';
import { ConfigManager } from '../managers/ConfigManager';
import { PerformanceManager } from '../managers/PerformanceManager';
import { StrategyManager } from '../managers/StrategyManager';
import { UnitRegistryManager } from '../managers/UnitRegistryManager';
import { UnitSystemManager } from '../managers/UnitSystemManager';
import { UnitCalculationMemento } from '../mementos/UnitCalculationMemento';
import { UnitMementoCaretaker } from '../mementos/UnitMementoCaretaker';
import { UnitMementoManager } from '../mementos/UnitMementoManager';
import { LoggingObserver } from '../observers/LoggingObserver';
import { PerformanceObserver } from '../observers/PerformanceObserver';
import { ProductionMonitoringSystem } from '../monitoring/ProductionMonitoringSystem';
import { UnitSystemManagerFactory } from '../factories/UnitSystemManagerFactory';
import { RefactoredUnitCalculatorFactory } from '../factories/RefactoredUnitCalculatorFactory';
import { RefactoredUnitSystemManager } from '../managers/RefactoredUnitSystemManager';
import { logger } from '../core/Logger';

/**
 * Container Setup
 * Registers all services with the DI container
 */
export function setupContainer(): void {
  // Register core services first
  container.registerSingleton(TOKENS.LOGGER, () => logger);

  // Register adapter services
  container.registerSingleton(TOKENS.UNIT_ADAPTER_FACTORY, () => new UnitAdapterFactory());
  container.registerClass(TOKENS.LEGACY_POSITION_ADAPTER, LegacyPositionUnitAdapter, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.LEGACY_SIZE_ADAPTER, LegacySizeUnitAdapter, [TOKENS.LOGGER]);

  // Register calculator services
  container.registerClass(TOKENS.ENHANCED_SIZE_CALCULATOR, EnhancedSizeUnitCalculator, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.POSITION_CALCULATOR, PositionUnitCalculator, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.REFACTORED_POSITION_CALCULATOR, RefactoredPositionUnitCalculator, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.SIZE_CALCULATOR, SizeUnitCalculator, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.SCALE_CALCULATOR, ScaleUnitCalculator, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.REFACTORED_SIZE_CALCULATOR, RefactoredSizeUnitCalculator, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.REFACTORED_SCALE_CALCULATOR, RefactoredScaleUnitCalculator, [TOKENS.LOGGER]);

  // Register random value services
  container.registerClass(TOKENS.RANDOM_VALUE_NUMBER, RandomValueNumber);

  // Register factory services
  container.registerSingleton(TOKENS.UNIT_CALCULATOR_FACTORY, () => {
    // UnitCalculatorFactory has private constructor, so we'll create a factory function
    return {
      createCalculator: (type: string) => {
        // This will be implemented when we refactor UnitCalculatorFactory
        return null;
      }
    };
  });

  // Register refactored factory services
  container.registerSingleton(TOKENS.UNIT_SYSTEM_MANAGER_FACTORY, () => new UnitSystemManagerFactory(container));
  container.registerSingleton(TOKENS.REFACTORED_UNIT_CALCULATOR_FACTORY, () => new RefactoredUnitCalculatorFactory(container));

  // Register command services
  container.registerClass(TOKENS.BATCH_CALCULATION_COMMAND, BatchCalculationCommand, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.CALCULATE_POSITION_COMMAND, CalculatePositionCommand, [TOKENS.POSITION_CALCULATOR]);
  container.registerClass(TOKENS.CALCULATE_SIZE_COMMAND, CalculateSizeCommand, [TOKENS.SIZE_CALCULATOR]);

  // Register composite services
  container.registerClass(TOKENS.UNIT_GROUP_COMPOSITE, UnitGroupComposite, [TOKENS.LOGGER]);

  // Register decorator services
  container.registerClass(TOKENS.CACHING_DECORATOR, CachingDecorator);
  container.registerClass(TOKENS.LOGGING_DECORATOR, LoggingDecorator);
  container.registerClass(TOKENS.VALIDATION_DECORATOR, ValidationDecorator);

  // Register manager services
  container.registerSingleton(TOKENS.COMMAND_MANAGER, () => new CommandManager(), [TOKENS.LOGGER]);
  container.registerSingleton(TOKENS.OBSERVER_MANAGER, () => new ObserverManager(), [TOKENS.LOGGER]);
  container.registerSingleton(TOKENS.VALIDATION_MANAGER, () => new ValidationManager(), [TOKENS.LOGGER]);
  container.registerSingleton(TOKENS.CONFIG_MANAGER, () => new ConfigManager());
  container.registerSingleton(TOKENS.PERFORMANCE_MANAGER, () => new PerformanceManager(), [TOKENS.LOGGER]);
  container.registerSingleton(TOKENS.STRATEGY_MANAGER, () => new StrategyManager(), [TOKENS.LOGGER]);
  container.registerSingleton(TOKENS.UNIT_REGISTRY_MANAGER, () => new UnitRegistryManager(), [TOKENS.LOGGER]);
  container.registerSingleton(TOKENS.UNIT_SYSTEM_MANAGER, () => new UnitSystemManager(), [TOKENS.LOGGER]);

  // Register memento services
  container.registerClass(TOKENS.UNIT_CALCULATION_MEMENTO, UnitCalculationMemento);
  container.registerClass(TOKENS.UNIT_MEMENTO_CARETAKER, UnitMementoCaretaker, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.UNIT_MEMENTO_MANAGER, UnitMementoManager, [TOKENS.LOGGER]);

  // Register observer services
  container.registerClass(TOKENS.LOGGING_OBSERVER, LoggingObserver, [TOKENS.LOGGER]);
  container.registerClass(TOKENS.PERFORMANCE_OBSERVER, PerformanceObserver, [TOKENS.LOGGER]);

  // Register template services (these are abstract classes, so we'll create factory functions)
  container.registerSingleton(TOKENS.POSITION_CALCULATION_TEMPLATE, () => {
    // This will be implemented when we refactor templates
    return {
      calculate: () => 0,
      validate: () => true
    };
  });
  
  container.registerSingleton(TOKENS.SCALE_CALCULATION_TEMPLATE, () => {
    // This will be implemented when we refactor templates
    return {
      calculate: () => 0,
      validate: () => true
    };
  });
  
  container.registerSingleton(TOKENS.SIZE_CALCULATION_TEMPLATE, () => {
    // This will be implemented when we refactor templates
    return {
      calculate: () => 0,
      validate: () => true
    };
  });

  // Register monitoring services
  container.registerClass(TOKENS.PRODUCTION_MONITORING_SYSTEM, ProductionMonitoringSystem, [TOKENS.LOGGER]);

  // Register strategy registries with actual implementations
  container.registerSingleton(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY, () => {
    const { SizeUnitStrategyRegistry } = require('../strategies/registry/SizeUnitStrategyRegistry');
    const { SIZE_UNIT_STRATEGIES } = require('../strategies/implementations/SizeUnitStrategies');
    
    const registry = new SizeUnitStrategyRegistry();
    registry.registerStrategies(SIZE_UNIT_STRATEGIES);
    return registry;
  });

  container.registerSingleton(TOKENS.POSITION_VALUE_STRATEGY_REGISTRY, () => {
    const { PositionUnitStrategyRegistry } = require('../strategies/registry/PositionUnitStrategyRegistry');
    const { POSITION_UNIT_STRATEGIES } = require('../strategies/implementations/PositionUnitStrategies');
    
    const registry = new PositionUnitStrategyRegistry();
    registry.registerStrategies(POSITION_UNIT_STRATEGIES);
    return registry;
  });

  container.registerSingleton(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY, () => {
    const { ScaleUnitStrategyRegistry } = require('../strategies/registry/ScaleUnitStrategyRegistry');
    const { SCALE_UNIT_STRATEGIES } = require('../strategies/implementations/ScaleUnitStrategies');
    
    const registry = new ScaleUnitStrategyRegistry();
    registry.registerStrategies(SCALE_UNIT_STRATEGIES);
    return registry;
  });

  // Register cache services
  container.registerSingleton(TOKENS.STRATEGY_CACHE, () => {
    // Placeholder - will be replaced with actual cache in Phase 3
    return {
      get: () => null,
      set: () => {},
      clear: () => {},
      getStatistics: () => ({ hits: 0, misses: 0, size: 0 }),
    };
  });
}

/**
 * Initialize the container with all services
 */
export function initializeContainer(): void {
  setupContainer();
  
  // Validate container setup
  const validation = container.validate();
  if (!validation.valid) {
    console.error('Container validation failed:', validation.errors);
    throw new Error(`Container setup failed: ${validation.errors.join(', ')}`);
  }
  
  console.log('Container initialized successfully');
  console.log('Container statistics:', container.getStatistics());
}

/**
 * Get container instance
 */
export function getContainer() {
  return container;
}

/**
 * Reset container (for testing)
 */
export function resetContainer(): void {
  container.clear();
}

/**
 * Validate container dependencies
 */
export function validateContainer(): { valid: boolean; errors: string[] } {
  return container.validate();
}

/**
 * Dependency Injection Tokens
 * Centralized tokens for DI container registration
 */

import type { IUnitAdapter } from '../adapters/IUnitAdapter';
import type { IUnitAdapterFactory } from '../adapters/IUnitAdapter';
import type { IUnitAdapterRegistry } from '../adapters/IUnitAdapter';
import type { IUnitCommand } from '../commands/IUnitCommand';
import type { IUnitMemento } from '../mementos/IUnitMemento';
import type { IUnitObserver } from '../observers/IUnitObserver';

/**
 * Core Service Tokens
 */
export const TOKENS = {
  // Adapter Services
  UNIT_ADAPTER_FACTORY: Symbol('IUnitAdapterFactory'),
  UNIT_ADAPTER_REGISTRY: Symbol('IUnitAdapterRegistry'),
  LEGACY_POSITION_ADAPTER: Symbol('LegacyPositionUnitAdapter'),
  LEGACY_POSITION_UNIT_ADAPTER: Symbol('LegacyPositionUnitAdapter'),
  LEGACY_SIZE_ADAPTER: Symbol('LegacySizeUnitAdapter'),
  LEGACY_SIZE_UNIT_ADAPTER: Symbol('LegacySizeUnitAdapter'),

  // Strategy Registries
  SIZE_VALUE_STRATEGY_REGISTRY: Symbol('ISizeValueCalculationStrategyRegistry'),
  POSITION_VALUE_STRATEGY_REGISTRY: Symbol('IPositionValueCalculationStrategyRegistry'),
  SCALE_VALUE_STRATEGY_REGISTRY: Symbol('IScaleValueCalculationStrategyRegistry'),
  SIZE_UNIT_STRATEGY_REGISTRY: Symbol('ISizeUnitStrategyRegistry'),
  POSITION_UNIT_STRATEGY_REGISTRY: Symbol('IPositionUnitStrategyRegistry'),
  SCALE_UNIT_STRATEGY_REGISTRY: Symbol('IScaleUnitStrategyRegistry'),
  MIXED_UNIT_STRATEGY_REGISTRY: Symbol('IMixedUnitStrategyRegistry'),
  UNIT_GROUP_STRATEGY_REGISTRY: Symbol('IUnitGroupStrategyRegistry'),

  // Cache Services
  STRATEGY_CACHE: Symbol('StrategyCache'),

  // Random Value Services
  RANDOM_VALUE_NUMBER: Symbol('IRandomValueNumber'),

  // Calculator Services
  ENHANCED_SIZE_CALCULATOR: Symbol('EnhancedSizeUnitCalculator'),
  POSITION_CALCULATOR: Symbol('PositionUnitCalculator'),
  REFACTORED_POSITION_CALCULATOR: Symbol('RefactoredPositionUnitCalculator'),
  SIZE_CALCULATOR: Symbol('SizeUnitCalculator'),
  SCALE_CALCULATOR: Symbol('ScaleUnitCalculator'),
  REFACTORED_SIZE_CALCULATOR: Symbol('RefactoredSizeUnitCalculator'),
  REFACTORED_SCALE_CALCULATOR: Symbol('RefactoredScaleUnitCalculator'),

  // Strategy Services
  POSITION_STRATEGY: Symbol('PositionStrategy'),
  SIZE_STRATEGY: Symbol('SizeStrategy'),
  SIZE_UNIT_STRATEGY: Symbol('SizeUnitStrategy'),
  SCALE_STRATEGY: Symbol('ScaleStrategy'),
  MIXED_UNIT_STRATEGY: Symbol('MixedUnitStrategy'),
  
  // Value Strategy Services
  PIXEL_SIZE_VALUE_STRATEGY: Symbol('PixelSizeValueStrategy'),
  FILL_SIZE_VALUE_STRATEGY: Symbol('FillSizeValueStrategy'),
  AUTO_SIZE_VALUE_STRATEGY: Symbol('AutoSizeValueStrategy'),
  PARENT_WIDTH_SIZE_VALUE_STRATEGY: Symbol('ParentWidthSizeValueStrategy'),
  VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY: Symbol('ViewportWidthSizeValueStrategy'),

  // Command Services
  BATCH_CALCULATION_COMMAND: Symbol('BatchCalculationCommand'),
  CALCULATE_POSITION_COMMAND: Symbol('CalculatePositionCommand'),
  CALCULATE_SIZE_COMMAND: Symbol('CalculateSizeCommand'),
  CALCULATE_SCALE_COMMAND: Symbol('CalculateScaleCommand'),
  
  // Validator Services
  TYPE_VALIDATOR: Symbol('TypeValidator'),
  RANGE_VALIDATOR: Symbol('RangeValidator'),

  // Composite Services
  UNIT_GROUP_COMPOSITE: Symbol('UnitGroupComposite'),

  // Decorator Services
  CACHING_DECORATOR: Symbol('CachingDecorator'),
  LOGGING_DECORATOR: Symbol('LoggingDecorator'),
  VALIDATION_DECORATOR: Symbol('ValidationDecorator'),

  // Manager Services
  COMMAND_MANAGER: Symbol('CommandManager'),
  OBSERVER_MANAGER: Symbol('ObserverManager'),
  PERFORMANCE_MANAGER: Symbol('PerformanceManager'),
  STRATEGY_MANAGER: Symbol('StrategyManager'),
  UNIT_REGISTRY_MANAGER: Symbol('UnitRegistryManager'),
  UNIT_SYSTEM_MANAGER: Symbol('UnitSystemManager'),
  VALIDATION_MANAGER: Symbol('ValidationManager'),
  CONFIG_MANAGER: Symbol('ConfigManager'),
  LOGGER: Symbol('Logger'),

  // Memento Services
  UNIT_MEMENTO: Symbol('IUnitMemento'),
  UNIT_CALCULATION_MEMENTO: Symbol('UnitCalculationMemento'),
  UNIT_MEMENTO_CARETAKER: Symbol('UnitMementoCaretaker'),
  UNIT_MEMENTO_MANAGER: Symbol('UnitMementoManager'),

  // Observer Services
  LOGGING_OBSERVER: Symbol('LoggingObserver'),
  PERFORMANCE_OBSERVER: Symbol('PerformanceObserver'),

  // Template Services
  POSITION_CALCULATION_TEMPLATE: Symbol('PositionCalculationTemplate'),
  SCALE_CALCULATION_TEMPLATE: Symbol('ScaleCalculationTemplate'),
  SIZE_CALCULATION_TEMPLATE: Symbol('SizeCalculationTemplate'),

  // Monitoring Services
  PRODUCTION_MONITORING_SYSTEM: Symbol('ProductionMonitoringSystem'),
  PERFORMANCE_COMPARISON_SYSTEM: Symbol('PerformanceComparisonSystem'),

  // Factory Services
  UNIT_CALCULATOR_FACTORY: Symbol('UnitCalculatorFactory'),
  UNIT_SYSTEM_MANAGER_FACTORY: Symbol('UnitSystemManagerFactory'),
  REFACTORED_UNIT_CALCULATOR_FACTORY: Symbol('RefactoredUnitCalculatorFactory'),
  DECORATOR_FACTORY: Symbol('DecoratorFactory'),
  STRATEGY_FACTORY: Symbol('StrategyFactory'),
  COMMAND_FACTORY: Symbol('CommandFactory'),
} as const;

/**
 * Type-safe token resolver
 */
export type TokenResolver = {
  [K in keyof typeof TOKENS]: typeof TOKENS[K] extends Symbol
    ? typeof TOKENS[K]
    : never;
};

/**
 * Service type mappings
 */
export type ServiceTypes = {
  // Adapter Services
  [TOKENS.UNIT_ADAPTER_FACTORY]: IUnitAdapterFactory;
  [TOKENS.UNIT_ADAPTER_REGISTRY]: IUnitAdapterRegistry;
  [TOKENS.LEGACY_POSITION_ADAPTER]: Constructor<IUnitAdapter>;
  [TOKENS.LEGACY_SIZE_ADAPTER]: Constructor<IUnitAdapter>;

  // Strategy Registries
  [TOKENS.SIZE_VALUE_STRATEGY_REGISTRY]: any;
  [TOKENS.POSITION_VALUE_STRATEGY_REGISTRY]: any;
  [TOKENS.SCALE_VALUE_STRATEGY_REGISTRY]: any;
  [TOKENS.SIZE_UNIT_STRATEGY_REGISTRY]: any;
  [TOKENS.POSITION_UNIT_STRATEGY_REGISTRY]: any;
  [TOKENS.SCALE_UNIT_STRATEGY_REGISTRY]: any;
  [TOKENS.MIXED_UNIT_STRATEGY_REGISTRY]: any;
  [TOKENS.UNIT_GROUP_STRATEGY_REGISTRY]: any;

  // Cache Services
  [TOKENS.STRATEGY_CACHE]: any;

  // Random Value Services
  [TOKENS.RANDOM_VALUE_NUMBER]: Constructor<any>;

  // Calculator Services
  [TOKENS.ENHANCED_SIZE_CALCULATOR]: Constructor<any>;
  [TOKENS.POSITION_CALCULATOR]: Constructor<any>;
  [TOKENS.REFACTORED_POSITION_CALCULATOR]: Constructor<any>;
  [TOKENS.SIZE_CALCULATOR]: Constructor<any>;
  [TOKENS.SCALE_CALCULATOR]: Constructor<any>;
  [TOKENS.REFACTORED_SIZE_CALCULATOR]: Constructor<any>;
  [TOKENS.REFACTORED_SCALE_CALCULATOR]: Constructor<any>;

  // Strategy Services
  [TOKENS.POSITION_STRATEGY]: Constructor<any>;
  [TOKENS.SIZE_STRATEGY]: Constructor<any>;
  [TOKENS.SCALE_STRATEGY]: Constructor<any>;
  [TOKENS.MIXED_UNIT_STRATEGY]: Constructor<any>;

  // Command Services
  [TOKENS.BATCH_CALCULATION_COMMAND]: Constructor<IUnitCommand>;
  [TOKENS.CALCULATE_POSITION_COMMAND]: Constructor<IUnitCommand>;
  [TOKENS.CALCULATE_SIZE_COMMAND]: Constructor<IUnitCommand>;
  [TOKENS.CALCULATE_SCALE_COMMAND]: Constructor<IUnitCommand>;

  // Composite Services
  [TOKENS.UNIT_GROUP_COMPOSITE]: Constructor<any>;

  // Decorator Services
  [TOKENS.CACHING_DECORATOR]: Constructor<any>;
  [TOKENS.LOGGING_DECORATOR]: Constructor<any>;
  [TOKENS.VALIDATION_DECORATOR]: Constructor<any>;

  // Manager Services
  [TOKENS.COMMAND_MANAGER]: any;
  [TOKENS.OBSERVER_MANAGER]: any;
  [TOKENS.PERFORMANCE_MANAGER]: any;
  [TOKENS.STRATEGY_MANAGER]: any;
  [TOKENS.UNIT_REGISTRY_MANAGER]: any;
  [TOKENS.UNIT_SYSTEM_MANAGER]: any;
  [TOKENS.VALIDATION_MANAGER]: any;
  [TOKENS.CONFIG_MANAGER]: any;
  [TOKENS.LOGGER]: any;

  // Memento Services
  [TOKENS.UNIT_MEMENTO]: Constructor<IUnitMemento>;
  [TOKENS.UNIT_CALCULATION_MEMENTO]: Constructor<any>;
  [TOKENS.UNIT_MEMENTO_CARETAKER]: Constructor<any>;
  [TOKENS.UNIT_MEMENTO_MANAGER]: Constructor<any>;

  // Observer Services
  [TOKENS.LOGGING_OBSERVER]: Constructor<IUnitObserver>;
  [TOKENS.PERFORMANCE_OBSERVER]: Constructor<IUnitObserver>;

  // Template Services
  [TOKENS.POSITION_CALCULATION_TEMPLATE]: any;
  [TOKENS.SCALE_CALCULATION_TEMPLATE]: any;
  [TOKENS.SIZE_CALCULATION_TEMPLATE]: any;

  // Monitoring Services
  [TOKENS.PRODUCTION_MONITORING_SYSTEM]: Constructor<any>;

  // Factory Services
  [TOKENS.UNIT_CALCULATOR_FACTORY]: Constructor<any>;
  [TOKENS.UNIT_SYSTEM_MANAGER_FACTORY]: Constructor<any>;
  [TOKENS.REFACTORED_UNIT_CALCULATOR_FACTORY]: Constructor<any>;
  [TOKENS.DECORATOR_FACTORY]: Constructor<any>;
  [TOKENS.STRATEGY_FACTORY]: Constructor<any>;
  [TOKENS.COMMAND_FACTORY]: Constructor<any>;
};

/**
 * Helper type for getting service type from token
 */
export type ServiceType<T extends keyof ServiceTypes> = ServiceTypes[T];

/**
 * Helper type for getting constructor type
 */
export type Constructor<T = any> = new (...args: any[]) => T;

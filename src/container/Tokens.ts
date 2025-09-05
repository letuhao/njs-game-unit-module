/**
 * Dependency Injection Tokens
 * Centralized tokens for DI container registration
 */

import type { IUnitAdapter } from '../adapters/IUnitAdapter';
import type { IUnitAdapterFactory } from '../adapters/IUnitAdapter';
import type { IUnitAdapterRegistry } from '../adapters/IUnitAdapter';
import type { ISizeValueCalculationStrategyRegistry } from '../strategies/value/ISizeValueCalculationStrategy';
import type { IPositionValueCalculationStrategyRegistry } from '../strategies/value/IPositionValueCalculationStrategy';
import type { IScaleValueCalculationStrategyRegistry } from '../strategies/value/IScaleValueCalculationStrategy';
import type { StrategyCache } from '../strategies/cache/IStrategyCache';
import type { IRandomValueNumber } from '../interfaces/IRandomValue';

/**
 * Core Service Tokens
 */
export const TOKENS = {
  // Adapter Services
  UNIT_ADAPTER_FACTORY: Symbol('IUnitAdapterFactory'),
  UNIT_ADAPTER_REGISTRY: Symbol('IUnitAdapterRegistry'),
  LEGACY_POSITION_ADAPTER: Symbol('LegacyPositionUnitAdapter'),
  LEGACY_SIZE_ADAPTER: Symbol('LegacySizeUnitAdapter'),

  // Strategy Registries
  SIZE_VALUE_STRATEGY_REGISTRY: Symbol('ISizeValueCalculationStrategyRegistry'),
  POSITION_VALUE_STRATEGY_REGISTRY: Symbol('IPositionValueCalculationStrategyRegistry'),
  SCALE_VALUE_STRATEGY_REGISTRY: Symbol('IScaleValueCalculationStrategyRegistry'),

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

  // Command Services
  POSITION_COMMAND: Symbol('PositionCommand'),
  SIZE_COMMAND: Symbol('SizeCommand'),
  SCALE_COMMAND: Symbol('ScaleCommand'),

  // Manager Services
  VALIDATION_MANAGER: Symbol('ValidationManager'),
  CONFIG_MANAGER: Symbol('ConfigManager'),
  LOGGER: Symbol('Logger'),

  // Factory Services
  UNIT_CALCULATOR_FACTORY: Symbol('UnitCalculatorFactory'),
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
  [TOKENS.UNIT_ADAPTER_FACTORY]: IUnitAdapterFactory;
  [TOKENS.UNIT_ADAPTER_REGISTRY]: IUnitAdapterRegistry;
  [TOKENS.LEGACY_POSITION_ADAPTER]: Constructor<IUnitAdapter>;
  [TOKENS.LEGACY_SIZE_ADAPTER]: Constructor<IUnitAdapter>;
  [TOKENS.SIZE_VALUE_STRATEGY_REGISTRY]: ISizeValueCalculationStrategyRegistry;
  [TOKENS.POSITION_VALUE_STRATEGY_REGISTRY]: IPositionValueCalculationStrategyRegistry;
  [TOKENS.SCALE_VALUE_STRATEGY_REGISTRY]: IScaleValueCalculationStrategyRegistry;
  [TOKENS.STRATEGY_CACHE]: StrategyCache<any, any, any>;
  [TOKENS.RANDOM_VALUE_NUMBER]: Constructor<IRandomValueNumber>;
  [TOKENS.ENHANCED_SIZE_CALCULATOR]: Constructor<any>;
  [TOKENS.POSITION_CALCULATOR]: Constructor<any>;
  [TOKENS.REFACTORED_POSITION_CALCULATOR]: Constructor<any>;
  [TOKENS.SIZE_CALCULATOR]: Constructor<any>;
  [TOKENS.SCALE_CALCULATOR]: Constructor<any>;
  [TOKENS.REFACTORED_SIZE_CALCULATOR]: Constructor<any>;
  [TOKENS.REFACTORED_SCALE_CALCULATOR]: Constructor<any>;
  [TOKENS.POSITION_STRATEGY]: Constructor<any>;
  [TOKENS.SIZE_STRATEGY]: Constructor<any>;
  [TOKENS.POSITION_COMMAND]: Constructor<any>;
  [TOKENS.SIZE_COMMAND]: Constructor<any>;
  [TOKENS.SCALE_COMMAND]: Constructor<any>;
  [TOKENS.VALIDATION_MANAGER]: any;
  [TOKENS.CONFIG_MANAGER]: any;
  [TOKENS.LOGGER]: any;
  [TOKENS.UNIT_CALCULATOR_FACTORY]: any;
};

/**
 * Helper type for getting service type from token
 */
export type ServiceType<T extends keyof ServiceTypes> = ServiceTypes[T];

/**
 * Helper type for getting constructor type
 */
export type Constructor<T = any> = new (...args: any[]) => T;

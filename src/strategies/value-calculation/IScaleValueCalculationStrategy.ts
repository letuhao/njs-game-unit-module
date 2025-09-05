import type { UnitContext } from '../../interfaces/IUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { ScaleUnit } from '../../enums/ScaleUnit';

/**
 * Core scale value calculation strategy interface - basic strategy operations
 */
export interface IScaleValueCalculationStrategyCore {
  readonly strategyId: string;
  readonly scaleValue: ScaleValue;
  readonly scaleUnit: ScaleUnit;

  /**
   * Check if this strategy can handle the given parameters
   */
  canHandle(scaleValue: ScaleValue, scaleUnit: ScaleUnit): boolean;

  /**
   * Calculate the scale value
   */
  calculate(scaleValue: ScaleValue, scaleUnit: ScaleUnit, context: UnitContext): number;
}

/**
 * Strategy priority interface - priority operations
 */
export interface IScaleValueCalculationStrategyPriority {
  /**
   * Get the priority of this strategy (lower number = higher priority)
   */
  getPriority(): number;
}

/**
 * Strategy validation interface - validation operations
 */
export interface IScaleValueCalculationStrategyValidation {
  /**
   * Validate if the context is suitable for this strategy
   */
  validateContext(context: UnitContext): boolean;
}

/**
 * Strategy description interface - description operations
 */
export interface IScaleValueCalculationStrategyDescription {
  /**
   * Get a description of what this strategy does
   */
  getDescription(): string;
}

/**
 * Complete scale value calculation strategy interface
 * Combines all strategy functionality
 */
export interface IScaleValueCalculationStrategy extends 
  IScaleValueCalculationStrategyCore,
  IScaleValueCalculationStrategyPriority,
  IScaleValueCalculationStrategyValidation,
  IScaleValueCalculationStrategyDescription {
}

/**
 * Core scale value calculation strategy registry interface - basic registry operations
 */
export interface IScaleValueCalculationStrategyRegistryCore {
  /**
   * Register a scale value calculation strategy
   */
  registerStrategy(strategy: IScaleValueCalculationStrategy): void;

  /**
   * Unregister a scale value calculation strategy
   */
  unregisterStrategy(strategyId: string): boolean;

  /**
   * Get a strategy by ID
   */
  getStrategy(strategyId: string): IScaleValueCalculationStrategy | undefined;

  /**
   * Get all strategies that can handle the given parameters
   */
  getStrategiesFor(scaleValue: ScaleValue, scaleUnit: ScaleUnit): IScaleValueCalculationStrategy[];

  /**
   * Get the best strategy for the given parameters
   */
  getBestStrategy(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit
  ): IScaleValueCalculationStrategy | undefined;
}

/**
 * Strategy query interface - query operations
 */
export interface IScaleValueCalculationStrategyQuery {
  /**
   * Get all registered strategies
   */
  getAllStrategies(): IScaleValueCalculationStrategy[];

  /**
   * Get strategies by scale value
   */
  getStrategiesByScaleValue(scaleValue: ScaleValue): IScaleValueCalculationStrategy[];

  /**
   * Get strategies by scale unit
   */
  getStrategiesByScaleUnit(scaleUnit: ScaleUnit): IScaleValueCalculationStrategy[];
}

/**
 * Strategy management interface - management operations
 */
export interface IScaleValueCalculationStrategyManagement {
  /**
   * Get the number of registered strategies
   */
  getStrategyCount(): number;

  /**
   * Check if a strategy is registered
   */
  hasStrategy(strategyId: string): boolean;

  /**
   * Clear all registered strategies
   */
  clearStrategies(): void;
}

/**
 * Strategy statistics interface - statistics operations
 */
export interface IScaleValueCalculationStrategyStatistics {
  /**
   * Get statistics about registered strategies
   */
  getStatistics(): {
    totalStrategies: number;
    strategiesByScaleValue: Record<string, number>;
    strategiesByScaleUnit: Record<string, number>;
  };
}

/**
 * Complete scale value calculation strategy registry interface
 * Combines all registry functionality
 */
export interface IScaleValueCalculationStrategyRegistry extends 
  IScaleValueCalculationStrategyRegistryCore,
  IScaleValueCalculationStrategyQuery,
  IScaleValueCalculationStrategyManagement,
  IScaleValueCalculationStrategyStatistics {
}

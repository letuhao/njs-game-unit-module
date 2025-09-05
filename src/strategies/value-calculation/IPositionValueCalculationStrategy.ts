import type { UnitContext } from '../../interfaces/IUnit';
import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { AxisUnit } from '../../enums/AxisUnit';

/**
 * Core position value calculation strategy interface - basic strategy operations
 */
export interface IPositionValueCalculationStrategyCore {
  readonly strategyId: string;
  readonly positionValue: PositionValue;
  readonly positionUnit: PositionUnit;
  readonly axisUnit: AxisUnit;

  /**
   * Check if this strategy can handle the given parameters
   */
  canHandle(positionValue: PositionValue, positionUnit: PositionUnit, axisUnit: AxisUnit): boolean;

  /**
   * Calculate the position value
   */
  calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit,
    context: UnitContext
  ): number;
}

/**
 * Strategy priority interface - priority operations
 */
export interface IPositionValueCalculationStrategyPriority {
  /**
   * Get the priority of this strategy (lower number = higher priority)
   */
  getPriority(): number;
}

/**
 * Strategy validation interface - validation operations
 */
export interface IPositionValueCalculationStrategyValidation {
  /**
   * Validate if the context is suitable for this strategy
   */
  validateContext(context: UnitContext): boolean;
}

/**
 * Strategy description interface - description operations
 */
export interface IPositionValueCalculationStrategyDescription {
  /**
   * Get a description of what this strategy does
   */
  getDescription(): string;
}

/**
 * Complete position value calculation strategy interface
 * Combines all strategy functionality
 */
export interface IPositionValueCalculationStrategy extends 
  IPositionValueCalculationStrategyCore,
  IPositionValueCalculationStrategyPriority,
  IPositionValueCalculationStrategyValidation,
  IPositionValueCalculationStrategyDescription {
}

/**
 * Core position value calculation strategy registry interface - basic registry operations
 */
export interface IPositionValueCalculationStrategyRegistryCore {
  /**
   * Register a position value calculation strategy
   */
  registerStrategy(strategy: IPositionValueCalculationStrategy): void;

  /**
   * Unregister a position value calculation strategy
   */
  unregisterStrategy(strategyId: string): boolean;

  /**
   * Get a strategy by ID
   */
  getStrategy(strategyId: string): IPositionValueCalculationStrategy | undefined;

  /**
   * Get all strategies that can handle the given parameters
   */
  getStrategiesFor(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit
  ): IPositionValueCalculationStrategy[];

  /**
   * Get the best strategy for the given parameters
   */
  getBestStrategy(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit
  ): IPositionValueCalculationStrategy | undefined;
}

/**
 * Strategy query interface - query operations
 */
export interface IPositionValueCalculationStrategyQuery {
  /**
   * Get all registered strategies
   */
  getAllStrategies(): IPositionValueCalculationStrategy[];

  /**
   * Get strategies by position value
   */
  getStrategiesByPositionValue(positionValue: PositionValue): IPositionValueCalculationStrategy[];

  /**
   * Get strategies by position unit
   */
  getStrategiesByPositionUnit(positionUnit: PositionUnit): IPositionValueCalculationStrategy[];

  /**
   * Get strategies by axis unit
   */
  getStrategiesByAxisUnit(axisUnit: AxisUnit): IPositionValueCalculationStrategy[];
}

/**
 * Strategy management interface - management operations
 */
export interface IPositionValueCalculationStrategyManagement {
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
export interface IPositionValueCalculationStrategyStatistics {
  /**
   * Get statistics about registered strategies
   */
  getStatistics(): {
    totalStrategies: number;
    strategiesByPositionValue: Record<string, number>;
    strategiesByPositionUnit: Record<string, number>;
    strategiesByAxisUnit: Record<string, number>;
  };
}

/**
 * Complete position value calculation strategy registry interface
 * Combines all registry functionality
 */
export interface IPositionValueCalculationStrategyRegistry extends 
  IPositionValueCalculationStrategyRegistryCore,
  IPositionValueCalculationStrategyQuery,
  IPositionValueCalculationStrategyManagement,
  IPositionValueCalculationStrategyStatistics {
}

import type { UnitContext } from '../../interfaces/IUnit';

/**
 * Core strategy composer interface - basic composition operations
 */
export interface IStrategyComposerCore<TValue, TUnit> {
  /**
   * Unique identifier for the composer
   */
  readonly composerId: string;

  /**
   * Description of what this composer does
   */
  readonly description: string;

  /**
   * Priority of this composer (lower numbers = higher priority)
   */
  readonly priority: number;

  /**
   * Check if this composer can handle the given value and unit
   */
  canCompose(value: TValue, unit: TUnit): boolean;

  /**
   * Compose multiple strategies to produce a final result
   */
  compose(
    value: TValue,
    unit: TUnit,
    context: UnitContext,
    strategies: Array<{ strategy: unknown; weight: number }>
  ): number;
}

/**
 * Strategy validation interface - validation operations
 */
export interface IStrategyComposerValidation {
  /**
   * Validate that the context is suitable for composition
   */
  validateContext(context: UnitContext): boolean;
}

/**
 * Strategy rules interface - rules operations
 */
export interface IStrategyComposerRules {
  /**
   * Get the composition rules for this composer
   */
  getCompositionRules(): Array<{
    rule: string;
    description: string;
    weight: number;
  }>;
}

/**
 * Strategy performance interface - performance operations
 */
export interface IStrategyComposerPerformance {
  /**
   * Get performance metrics for this composer
   */
  getPerformanceMetrics(): {
    averageExecutionTime: number;
    totalExecutions: number;
    successRate: number;
    lastExecutionTime: number;
  };
}

/**
 * Complete strategy composer interface
 * Combines all composer functionality
 */
export interface IStrategyComposer<TValue, TUnit> extends 
  IStrategyComposerCore<TValue, TUnit>,
  IStrategyComposerValidation,
  IStrategyComposerRules,
  IStrategyComposerPerformance {
}

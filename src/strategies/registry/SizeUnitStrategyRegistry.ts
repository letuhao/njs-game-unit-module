import type { SizeUnit } from '../../enums/SizeUnit';
import type { ISizeStrategyInput } from '../../interfaces/strategy/ISizeStrategyInput';
import { StrategyRegistry } from './StrategyRegistry';

/**
 * Strategy function type for size unit calculations
 */
export type SizeUnitStrategy = (input: ISizeStrategyInput) => number;

/**
 * Registry for size unit calculation strategies
 * Replaces switch statements in SizeUnitCalculator
 */
export class SizeUnitStrategyRegistry extends StrategyRegistry<SizeUnit, SizeUnitStrategy> {
  /**
   * Get a strategy by size unit, throwing an error if not found
   * @param unit - The size unit to get strategy for
   * @returns The strategy function
   * @throws Error if strategy not found
   */
  getStrategy(unit: SizeUnit): SizeUnitStrategy {
    const strategy = super.getStrategy(unit);
    if (!strategy) {
      throw new Error(`No strategy found for size unit: ${unit}`);
    }
    return strategy;
  }

  /**
   * Register multiple strategies at once
   * @param strategies - Object with unit keys and strategy values
   */
  registerStrategies(strategies: Record<SizeUnit, SizeUnitStrategy>): void {
    for (const [unit, strategy] of Object.entries(strategies)) {
      this.register(unit as SizeUnit, strategy);
    }
  }

  /**
   * Get all registered size units
   * @returns Array of registered size units
   */
  getRegisteredSizeUnits(): SizeUnit[] {
    return this.getRegisteredKeys();
  }
}
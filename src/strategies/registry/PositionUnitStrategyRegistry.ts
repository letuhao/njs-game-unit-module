import type { PositionUnit } from '../../enums/PositionUnit';
import type { IPositionStrategyInput } from '../../interfaces/strategy/IPositionStrategyInput';
import { StrategyRegistry } from './StrategyRegistry';

/**
 * Strategy function type for position unit calculations
 */
export type PositionUnitStrategy = (input: IPositionStrategyInput) => number;

/**
 * Registry for position unit calculation strategies
 * Replaces switch statements in PositionUnitCalculator
 */
export class PositionUnitStrategyRegistry extends StrategyRegistry<PositionUnit, PositionUnitStrategy> {
  /**
   * Get a strategy by position unit, throwing an error if not found
   * @param unit - The position unit to get strategy for
   * @returns The strategy function
   * @throws Error if strategy not found
   */
  getStrategy(unit: PositionUnit): PositionUnitStrategy {
    const strategy = super.getStrategy(unit);
    if (!strategy) {
      throw new Error(`No strategy found for position unit: ${unit}`);
    }
    return strategy;
  }

  /**
   * Register multiple strategies at once
   * @param strategies - Object with unit keys and strategy values
   */
  registerStrategies(strategies: Record<PositionUnit, PositionUnitStrategy>): void {
    for (const [unit, strategy] of Object.entries(strategies)) {
      this.register(unit as PositionUnit, strategy);
    }
  }

  /**
   * Get all registered position units
   * @returns Array of registered position units
   */
  getRegisteredPositionUnits(): PositionUnit[] {
    return this.getRegisteredKeys();
  }
}
import type { ScaleUnit } from '../../enums/ScaleUnit';
import type { IScaleStrategyInput } from '../../interfaces/strategy/IScaleStrategyInput';
import { StrategyRegistry } from './StrategyRegistry';

/**
 * Strategy function type for scale unit calculations
 */
export type ScaleUnitStrategy = (input: IScaleStrategyInput) => number;

/**
 * Registry for scale unit calculation strategies
 * Replaces switch statements in ScaleUnitCalculator
 */
export class ScaleUnitStrategyRegistry extends StrategyRegistry<ScaleUnit, ScaleUnitStrategy> {
  /**
   * Get a strategy by scale unit, throwing an error if not found
   * @param unit - The scale unit to get strategy for
   * @returns The strategy function
   * @throws Error if strategy not found
   */
  getStrategy(unit: ScaleUnit): ScaleUnitStrategy {
    const strategy = super.getStrategy(unit);
    if (!strategy) {
      throw new Error(`No strategy found for scale unit: ${unit}`);
    }
    return strategy;
  }

  /**
   * Register multiple strategies at once
   * @param strategies - Object with unit keys and strategy values
   */
  registerStrategies(strategies: Record<ScaleUnit, ScaleUnitStrategy>): void {
    for (const [unit, strategy] of Object.entries(strategies)) {
      this.register(unit as ScaleUnit, strategy);
    }
  }

  /**
   * Get all registered scale units
   * @returns Array of registered scale units
   */
  getRegisteredScaleUnits(): ScaleUnit[] {
    return this.getRegisteredKeys();
  }
}
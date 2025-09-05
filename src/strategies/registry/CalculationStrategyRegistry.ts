import { CalculationStrategy } from '../../enums/CalculationStrategy';

/**
 * Strategy function type for calculation strategies
 */
export type CalculationStrategyFunction = (results: number[]) => number;

/**
 * Registry for calculation strategies
 */
export class CalculationStrategyRegistry {
  private static instance: CalculationStrategyRegistry;
  private calculationStrategies: Map<CalculationStrategy, CalculationStrategyFunction> = new Map();

  private constructor() {
    this.initializeCalculationStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): CalculationStrategyRegistry {
    if (!CalculationStrategyRegistry.instance) {
      CalculationStrategyRegistry.instance = new CalculationStrategyRegistry();
    }
    return CalculationStrategyRegistry.instance;
  }

  /**
   * Get strategy for calculation strategy
   */
  public getCalculationStrategy(strategy: CalculationStrategy): CalculationStrategyFunction {
    return this.calculationStrategies.get(strategy) || this.getDefaultCalculationStrategy();
  }

  /**
   * Register custom calculation strategy
   */
  public registerCalculationStrategy(strategy: CalculationStrategy, strategyFunction: CalculationStrategyFunction): void {
    this.calculationStrategies.set(strategy, strategyFunction);
  }

  /**
   * Initialize calculation strategies
   */
  private initializeCalculationStrategies(): void {
    // Sum strategy
    this.calculationStrategies.set(CalculationStrategy.SUM, (results) => {
      return results.reduce((sum, result) => sum + result, 0);
    });

    // Average strategy
    this.calculationStrategies.set(CalculationStrategy.AVERAGE, (results) => {
      return results.reduce((sum, result) => sum + result, 0) / results.length;
    });

    // Min strategy
    this.calculationStrategies.set(CalculationStrategy.MIN, (results) => {
      return Math.min(...results);
    });

    // Max strategy
    this.calculationStrategies.set(CalculationStrategy.MAX, (results) => {
      return Math.max(...results);
    });

    // Custom strategy (fallback to sum)
    this.calculationStrategies.set(CalculationStrategy.CUSTOM, (results) => {
      return results.reduce((sum, result) => sum + result, 0);
    });
  }

  /**
   * Default calculation strategy
   */
  private getDefaultCalculationStrategy(): CalculationStrategyFunction {
    return (results) => results.reduce((sum, result) => sum + result, 0);
  }
}

import type { IStrategyRegistry } from './IStrategyRegistry';

/**
 * Generic strategy registry implementation
 * Provides a map-based registry for strategies
 */
export class StrategyRegistry<TKey, TStrategy> implements IStrategyRegistry<TKey, TStrategy> {
  private strategies = new Map<TKey, TStrategy>();

  /**
   * Register a strategy with a key
   */
  register(key: TKey, strategy: TStrategy): void {
    this.strategies.set(key, strategy);
  }

  /**
   * Get a strategy by key
   */
  getStrategy(key: TKey): TStrategy | undefined {
    return this.strategies.get(key);
  }

  /**
   * Check if a strategy is registered for a key
   */
  hasStrategy(key: TKey): boolean {
    return this.strategies.has(key);
  }

  /**
   * Get all registered keys
   */
  getRegisteredKeys(): TKey[] {
    return Array.from(this.strategies.keys());
  }

  /**
   * Get all registered strategies
   */
  getRegisteredStrategies(): TStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Remove a strategy by key
   */
  removeStrategy(key: TKey): boolean {
    return this.strategies.delete(key);
  }

  /**
   * Clear all registered strategies
   */
  clear(): void {
    this.strategies.clear();
  }

  /**
   * Get the number of registered strategies
   */
  size(): number {
    return this.strategies.size;
  }

  /**
   * Get registry statistics
   */
  getStatistics(): {
    totalStrategies: number;
    registeredKeys: TKey[];
  } {
    return {
      totalStrategies: this.strategies.size,
      registeredKeys: this.getRegisteredKeys(),
    };
  }
}

/**
 * Base interface for strategy registries
 * Provides common functionality for registering and resolving strategies
 */
export interface IStrategyRegistry<TKey, TStrategy> {
  /**
   * Register a strategy with a key
   * @param key - The key to register the strategy under
   * @param strategy - The strategy function to register
   */
  register(key: TKey, strategy: TStrategy): void;

  /**
   * Get a strategy by key
   * @param key - The key to look up
   * @returns The strategy function or undefined if not found
   */
  getStrategy(key: TKey): TStrategy | undefined;

  /**
   * Check if a strategy is registered for a key
   * @param key - The key to check
   * @returns True if registered, false otherwise
   */
  hasStrategy(key: TKey): boolean;

  /**
   * Get all registered keys
   * @returns Array of all registered keys
   */
  getRegisteredKeys(): TKey[];

  /**
   * Get all registered strategies
   * @returns Array of all registered strategies
   */
  getRegisteredStrategies(): TStrategy[];

  /**
   * Remove a strategy by key
   * @param key - The key to remove
   * @returns True if removed, false if not found
   */
  removeStrategy(key: TKey): boolean;

  /**
   * Clear all registered strategies
   */
  clear(): void;

  /**
   * Get the number of registered strategies
   * @returns Number of registered strategies
   */
  size(): number;
}

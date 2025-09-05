// Generic Strategy Registry
export class StrategyRegistry<K, Fn extends Function> {
  private map = new Map<K, Fn>();
  register(key: K, fn: Fn) { this.map.set(key, fn); }
  resolve(key: K, fallback?: Fn): Fn {
    const fn = this.map.get(key);
    if (!fn) {
      if (fallback) return fallback;
      throw new Error(`Strategy not registered for key: ${String(key)}`);
    }
    return fn;
  }
  has(key: K) { return this.map.has(key); }
}

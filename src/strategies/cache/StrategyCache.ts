import type { IStrategyCache, ICacheEntry, CacheKeyGenerator } from './IStrategyCache';
import type { UnitContext } from '../../interfaces/IUnit';

/**
 * LRU (Least Recently Used) Strategy Cache Implementation
 * Provides efficient caching with automatic eviction of least recently used entries
 * 
 * Note: This class focuses solely on caching logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class StrategyCache<TValue, TUnit, TResult>
  implements IStrategyCache<TValue, TUnit, TResult>
{
  readonly cacheId: string;
  maxSize: number;
  defaultTtl: number;

  private cache: Map<string, ICacheEntry<TResult>> = new Map();
  private accessOrder: string[] = [];
  private hitCount = 0;
  private missCount = 0;
  private evictionCount = 0;
  private accessTimes: number[] = [];
  private keyGenerator: CacheKeyGenerator<TValue, TUnit>;
  private cacheStatistics = {
    totalRequests: 0,
    hitRate: 0,
    missRate: 0,
    averageAccessTime: 0,
    totalAccessTime: 0,
    evictionRate: 0,
    memoryUsage: 0,
  };

  constructor(
    cacheId: string,
    maxSize: number = 1000,
    defaultTtl: number = 300000, // 5 minutes
    keyGenerator?: CacheKeyGenerator<TValue, TUnit>
  ) {
    this.cacheId = cacheId;
    this.maxSize = maxSize;
    this.defaultTtl = defaultTtl;
    this.keyGenerator = keyGenerator || this.defaultKeyGenerator;
  }

  /**
   * Default key generator
   */
  private defaultKeyGenerator(value: TValue, unit: TUnit, context: UnitContext): string {
    return `${JSON.stringify(value)}_${JSON.stringify(unit)}_${JSON.stringify(context)}`;
  }

  /**
   * Generate cache key
   */
  private generateKey(value: TValue, unit: TUnit, context: UnitContext): string {
    return this.keyGenerator(value, unit, context);
  }

  /**
   * Get a value from the cache
   */
  public get(value: TValue, unit: TUnit, context: UnitContext): TResult | null {
    const key = this.generateKey(value, unit, context);
    const startTime = performance.now();
    this.cacheStatistics.totalRequests++;

    const entry = this.cache.get(key);
    
    if (!entry) {
      this.missCount++;
      this.updateStatistics(performance.now() - startTime);
      return null;
    }

    // Check if entry has expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.removeFromAccessOrder(key);
      this.missCount++;
      this.updateStatistics(performance.now() - startTime);
      return null;
    }

    // Update access order for LRU
    this.updateAccessOrder(key);
    this.hitCount++;
    this.updateStatistics(performance.now() - startTime);
    
    return entry.value;
  }

  /**
   * Set a value in the cache
   */
  public set(value: TValue, unit: TUnit, context: UnitContext, result: TResult, ttl?: number): void {
    const key = this.generateKey(value, unit, context);
    const entry: ICacheEntry<TResult> = {
      value: result,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTtl,
      accessCount: 0,
      lastAccess: Date.now(),
    };

    // Check if we need to evict entries
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    this.cache.set(key, entry);
    this.updateAccessOrder(key);
  }

  /**
   * Check if a key exists in the cache
   */
  public has(value: TValue, unit: TUnit, context: UnitContext): boolean {
    const key = this.generateKey(value, unit, context);
    const entry = this.cache.get(key);
    return entry !== undefined && !this.isExpired(entry);
  }

  /**
   * Delete a key from the cache
   */
  public delete(value: TValue, unit: TUnit, context: UnitContext): boolean {
    const key = this.generateKey(value, unit, context);
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.removeFromAccessOrder(key);
    }
    return deleted;
  }

  /**
   * Clear all entries from the cache
   */
  public clear(): void {
    this.cache.clear();
    this.accessOrder = [];
    this.resetStatistics();
  }

  /**
   * Get cache size
   */
  public size(): number {
    return this.cache.size;
  }

  /**
   * Get cache statistics
   */
  public getStatistics() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: this.cacheStatistics.hitRate,
      averageAccessTime: this.cacheStatistics.averageAccessTime,
      evictionCount: this.cacheStatistics.evictionRate,
    };
  }

  /**
   * Get cache hit rate
   */
  public getHitRate(): number {
    return this.cacheStatistics.hitRate;
  }

  /**
   * Check if cache is full
   */
  public isFull(): boolean {
    return this.cache.size >= this.maxSize;
  }

  /**
   * Get cache size
   */
  public getSize(): number {
    return this.cache.size;
  }

  /**
   * Set maximum cache size
   */
  public setMaxSize(maxSize: number): void {
    this.maxSize = maxSize;
  }

  /**
   * Set default TTL for new entries
   */
  public setDefaultTtl(ttl: number): void {
    this.defaultTtl = ttl;
  }

  /**
   * Clean up expired entries
   */
  public cleanup(): number {
    let cleanedCount = 0;
    const keysToDelete: string[] = [];
    
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        keysToDelete.push(key);
      }
    }
    
    for (const key of keysToDelete) {
      this.cache.delete(key);
      this.removeFromAccessOrder(key);
      cleanedCount++;
    }
    
    return cleanedCount;
  }

  /**
   * Get cache miss rate
   */
  public getMissRate(): number {
    return this.cacheStatistics.missRate;
  }

  /**
   * Get cache memory usage estimate
   */
  public getMemoryUsage(): number {
    return this.cacheStatistics.memoryUsage;
  }

  /**
   * Reset cache statistics
   */
  public resetStatistics(): void {
    this.hitCount = 0;
    this.missCount = 0;
    this.evictionCount = 0;
    this.accessTimes = [];
    this.cacheStatistics = {
      totalRequests: 0,
      hitRate: 0,
      missRate: 0,
      averageAccessTime: 0,
      totalAccessTime: 0,
      evictionRate: 0,
      memoryUsage: 0,
    };
  }


  /**
   * Get cache entry details
   */
  public getEntryDetails(value: TValue, unit: TUnit, context: UnitContext): ICacheEntry<TResult> | null {
    const key = this.generateKey(value, unit, context);
    const entry = this.cache.get(key);
    if (!entry || this.isExpired(entry)) {
      return null;
    }
    return { ...entry };
  }

  /**
   * Get all cache keys
   */
  public getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache entries by pattern
   */
  public getEntriesByPattern(pattern: RegExp): Array<{ key: string; entry: ICacheEntry<TResult> }> {
    const entries: Array<{ key: string; entry: ICacheEntry<TResult> }> = [];
    
    for (const [key, entry] of this.cache.entries()) {
      if (pattern.test(key) && !this.isExpired(entry)) {
        entries.push({ key, entry: { ...entry } });
      }
    }
    
    return entries;
  }

  /**
   * Clean up expired entries
   */
  public cleanupExpired(): number {
    let cleanedCount = 0;
    const now = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        this.removeFromAccessOrder(key);
        cleanedCount++;
      }
    }
    
    return cleanedCount;
  }

  /**
   * Check if entry is expired
   */
  private isExpired(entry: ICacheEntry<TResult>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  /**
   * Update access order for LRU
   */
  private updateAccessOrder(key: string): void {
    this.removeFromAccessOrder(key);
    this.accessOrder.push(key);
  }

  /**
   * Remove key from access order
   */
  private removeFromAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index !== -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    if (this.accessOrder.length === 0) {
      return;
    }

    const lruKey = this.accessOrder.shift()!;
    this.cache.delete(lruKey);
    this.evictionCount++;
  }

  /**
   * Update cache statistics
   */
  private updateStatistics(accessTime: number): void {
    this.accessTimes.push(accessTime);
    this.cacheStatistics.totalAccessTime += accessTime;
    this.cacheStatistics.averageAccessTime = 
      this.cacheStatistics.totalAccessTime / this.accessTimes.length;
    
    this.cacheStatistics.hitRate = this.hitCount / this.cacheStatistics.totalRequests;
    this.cacheStatistics.missRate = this.missCount / this.cacheStatistics.totalRequests;
    this.cacheStatistics.evictionRate = this.evictionCount / this.cacheStatistics.totalRequests;
    
    // Estimate memory usage (rough calculation)
    this.cacheStatistics.memoryUsage = this.cache.size * 1024; // 1KB per entry estimate
  }

}
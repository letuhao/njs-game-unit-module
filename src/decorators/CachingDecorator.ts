import type { IUnitDecorator } from '../interfaces/IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { BaseUnitDecorator } from '../interfaces/IUnitDecorator';
import { UnitType } from '../enums/UnitType';

/**
 * Caching Decorator
 * Adds caching functionality to units
 */
export class CachingDecorator<TUnit = any> extends BaseUnitDecorator {
  private cache = new Map<string, number>();
  private keyFunction: (context: UnitContext) => string;

  constructor(
    unit: IUnit,
    keyFunction: (context: UnitContext) => string
  ) {
    super(
      `caching-${unit.id}`,
      `Caching Decorator for ${unit.name}`,
      unit.unitType,
      unit
    );
    this.keyFunction = keyFunction;
  }

  // Override performCalculation to add caching
  protected performCalculation(context: UnitContext): number {
    const key = this.keyFunction(context);
    const cached = this.cache.get(key);
    
    if (cached !== undefined) {
      return cached;
    }
    
    const result = this.wrappedUnit.calculate(context);
    this.cache.set(key, result);
    return result;
  }

  // Override validateDecorator to add caching validation
  protected validateDecorator(context: UnitContext): boolean {
    return true; // CachingDecorator doesn't add validation constraints
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

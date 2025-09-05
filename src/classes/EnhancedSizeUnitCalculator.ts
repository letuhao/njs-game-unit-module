import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import { StrategyCache } from '../strategies/cache/StrategyCache';
import {
  WeightedAverageSizeComposer,
  PriorityBasedSizeComposer,
  AdaptiveSizeComposer,
} from '../strategies/composition/SizeStrategyComposers';

/**
 * Enhanced SizeUnitCalculator class
 * Integrates Strategy Pattern, Composition, and Caching for maximum performance
 * Provides advanced features like strategy chaining, result caching, and performance monitoring
 * 
 * Note: This class focuses solely on size calculation logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class EnhancedSizeUnitCalculator implements ISizeUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SIZE;
  public readonly sizeUnit: SizeUnit;
  public readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  public readonly baseValue: number | SizeValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  private minSize: number | undefined;
  private maxSize: number | undefined;
  private readonly strategyRegistry: SizeValueCalculationStrategyRegistry;
  private readonly cache: StrategyCache<SizeValue, SizeUnit, number>;
  private readonly composers: Array<
    WeightedAverageSizeComposer | PriorityBasedSizeComposer | AdaptiveSizeComposer
  >;
  private performanceMetrics = {
    totalCalculations: 0,
    cacheHits: 0,
    cacheMisses: 0,
    averageCalculationTime: 0,
    strategyCompositions: 0,
  };

  constructor(
    id: string,
    name: string,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    baseValue: number | SizeValue,
    maintainAspectRatio: boolean = false,
    strategyRegistry?: SizeValueCalculationStrategyRegistry,
    cache?: StrategyCache<SizeValue, SizeUnit, number>,
    composers?: Array<
      WeightedAverageSizeComposer | PriorityBasedSizeComposer | AdaptiveSizeComposer
    >
  ) {
    this.id = id;
    this.name = name;
    this.sizeUnit = sizeUnit;
    this.dimension = dimension;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;

    // Initialize strategy registry
    this.strategyRegistry = strategyRegistry || new SizeValueCalculationStrategyRegistry();
    
    // Initialize cache
    this.cache = cache || new StrategyCache<SizeValue, SizeUnit, number>(`${id}-cache`);
    
    // Initialize composers
    this.composers = composers || [
      new WeightedAverageSizeComposer(),
      new PriorityBasedSizeComposer(),
      new AdaptiveSizeComposer(),
    ];

    this.initializeStrategies();
  }

  /**
   * Calculate size value using enhanced strategy pattern with composition and caching
   */
  public calculate(context: UnitContext): number {
    const startTime = performance.now();
    
    try {
      // Check cache first
      const cacheKey = this.createCacheKey(context);
      const cachedResult = this.cache.get(cacheKey);
      
      if (cachedResult !== undefined) {
        this.performanceMetrics.cacheHits++;
        return cachedResult;
      }

      this.performanceMetrics.cacheMisses++;

      // Get base calculation from strategy registry
      const strategy = this.strategyRegistry.getStrategy(`${this.baseValue}-${this.sizeUnit}`);
      const baseResult = strategy ? strategy.calculate(this.baseValue as SizeValue, this.sizeUnit, context) : this.getFallbackValue();

      // Apply composition strategies
      let finalResult = baseResult;
      for (const composer of this.composers) {
        if (composer.canCompose(this.baseValue as SizeValue, this.sizeUnit, context)) {
          finalResult = composer.compose(finalResult, this.baseValue as SizeValue, this.sizeUnit, context);
          this.performanceMetrics.strategyCompositions++;
        }
      }

      // Apply constraints
      finalResult = this.applyConstraints(finalResult);

      // Cache the result
      this.cache.set(cacheKey, finalResult);

      // Update performance metrics
      this.updatePerformanceMetrics(startTime);

      return finalResult;
    } catch (error) {
      // Return fallback value on error
      return this.getFallbackValue();
    }
  }

  /**
   * Calculate size based on context (ISizeUnitCalculation interface)
   */
  calculateSize(context: UnitContext): number {
    return this.calculate(context);
  }

  /**
   * Calculate width specifically (ISizeUnitCalculation interface)
   */
  calculateWidth(context: UnitContext): number {
    if (this.dimension === Dimension.HEIGHT) {
      // If this is a height unit, calculate based on aspect ratio
      const height = this.calculate(context);
      return this.maintainAspectRatio ? height * (context.parent?.width || 1) / (context.parent?.height || 1) : height;
    }
    return this.calculate(context);
  }

  /**
   * Calculate height specifically (ISizeUnitCalculation interface)
   */
  calculateHeight(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      // If this is a width unit, calculate based on aspect ratio
      const width = this.calculate(context);
      return this.maintainAspectRatio ? width * (context.parent?.height || 1) / (context.parent?.width || 1) : width;
    }
    return this.calculate(context);
  }

  /**
   * Get the minimum size constraint (ISizeUnitConstraints interface)
   */
  getMinSize(): number | undefined {
    return this.minSize;
  }

  /**
   * Get the maximum size constraint (ISizeUnitConstraints interface)
   */
  getMaxSize(): number | undefined {
    return this.maxSize;
  }


  /**
   * Validate the calculator configuration and context
   */
  public validate(context: UnitContext): boolean {
    if (!context) {
      return false;
    }

    // Validate context properties
    if (!context.parent && !context.scene && !context.viewport) {
      return false;
    }

    // Validate dimension-specific requirements
    if (this.dimension === Dimension.WIDTH || this.dimension === Dimension.BOTH) {
      if (!context.parent?.width && !context.scene?.width && !context.viewport?.width) {
        return false;
      }
    }

    if (this.dimension === Dimension.HEIGHT || this.dimension === Dimension.BOTH) {
      if (!context.parent?.height && !context.scene?.height && !context.viewport?.height) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the calculator is responsive to context changes
   */
  public isResponsive(): boolean {
    return this.sizeUnit !== SizeUnit.PIXEL;
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics() {
    return { ...this.performanceMetrics };
  }

  /**
   * Clear performance metrics
   */
  public clearPerformanceMetrics(): void {
    this.performanceMetrics = {
      totalCalculations: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageCalculationTime: 0,
      strategyCompositions: 0,
    };
  }

  /**
   * Get cache statistics
   */
  public getCacheStatistics() {
    return this.cache.getStatistics();
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Set size constraints
   */
  public setSizeConstraints(minSize?: number, maxSize?: number): void {
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  /**
   * Get size constraints
   */
  public getSizeConstraints() {
    return {
      minSize: this.minSize,
      maxSize: this.maxSize,
    };
  }

  /**
   * Clone the calculator with optional overrides
   */
  public clone(overrides?: Partial<ISizeUnit>): ISizeUnit {
    return new EnhancedSizeUnitCalculator(
      overrides?.id || this.id,
      overrides?.name || this.name,
      this.sizeUnit,
      this.dimension,
      this.baseValue,
      this.maintainAspectRatio,
      this.strategyRegistry,
      this.cache,
      this.composers
    );
  }

  /**
   * String representation
   */
  public toString(): string {
    return `EnhancedSizeUnitCalculator(${this.id})`;
  }

  /**
   * Initialize strategies in the registry
   */
  private initializeStrategies(): void {
    // This would typically register all available strategies
    // For now, we'll assume they're already registered
  }

  /**
   * Create cache key from context
   */
  private createCacheKey(context: UnitContext): string {
    const contextKey = JSON.stringify({
      parent: context.parent,
      scene: context.scene,
      viewport: context.viewport,
      dimension: this.dimension,
    });
    
    return `${this.id}-${this.baseValue}-${this.sizeUnit}-${contextKey}`;
  }

  /**
   * Apply size constraints
   */
  private applyConstraints(value: number): number {
    if (this.minSize !== undefined && value < this.minSize) {
      return this.minSize;
    }
    
    if (this.maxSize !== undefined && value > this.maxSize) {
      return this.maxSize;
    }
    
    return value;
  }

  /**
   * Get fallback value
   */
  private getFallbackValue(): number {
    if (typeof this.baseValue === 'number') {
      return this.baseValue;
    }
    
    return DEFAULT_FALLBACK_VALUES.SIZE;
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(startTime: number): void {
    const endTime = performance.now();
    const calculationTime = endTime - startTime;
    
    this.performanceMetrics.totalCalculations++;
    
    // Update average calculation time
    const totalTime = this.performanceMetrics.averageCalculationTime * (this.performanceMetrics.totalCalculations - 1);
    this.performanceMetrics.averageCalculationTime = (totalTime + calculationTime) / this.performanceMetrics.totalCalculations;
  }
}
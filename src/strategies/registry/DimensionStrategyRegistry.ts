import { Dimension } from '../../enums/Dimension';
import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for dimension calculations
 */
export type DimensionStrategy = (context: UnitContext) => number;

/**
 * Registry for dimension strategies
 */
export class DimensionStrategyRegistry {
  private static instance: DimensionStrategyRegistry;
  private dimensionStrategies: Map<Dimension, DimensionStrategy> = new Map();

  private constructor() {
    this.initializeDimensionStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): DimensionStrategyRegistry {
    if (!DimensionStrategyRegistry.instance) {
      DimensionStrategyRegistry.instance = new DimensionStrategyRegistry();
    }
    return DimensionStrategyRegistry.instance;
  }

  /**
   * Get strategy for dimension
   */
  public getDimensionStrategy(dimension: Dimension): DimensionStrategy {
    return this.dimensionStrategies.get(dimension) || this.getDefaultDimensionStrategy();
  }

  /**
   * Register custom dimension strategy
   */
  public registerDimensionStrategy(dimension: Dimension, strategy: DimensionStrategy): void {
    this.dimensionStrategies.set(dimension, strategy);
  }

  /**
   * Initialize dimension strategies
   */
  private initializeDimensionStrategies(): void {
    // Width strategy
    this.dimensionStrategies.set(Dimension.WIDTH, (context) => {
      return this.calculateWidth(context);
    });

    // Height strategy
    this.dimensionStrategies.set(Dimension.HEIGHT, (context) => {
      return this.calculateHeight(context);
    });

    // Both strategy
    this.dimensionStrategies.set(Dimension.BOTH, (context) => {
      return this.calculateBoth(context);
    });
  }

  /**
   * Calculate width value
   */
  private calculateWidth(context: UnitContext): number {
    if (context.scene) {
      return context.scene.width;
    }
    if (context.viewport) {
      return context.viewport.width;
    }
    if (context.parent) {
      return context.parent.width;
    }
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate height value
   */
  private calculateHeight(context: UnitContext): number {
    if (context.scene) {
      return context.scene.height;
    }
    if (context.viewport) {
      return context.viewport.height;
    }
    if (context.parent) {
      return context.parent.height;
    }
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate both width and height (return minimum)
   */
  private calculateBoth(context: UnitContext): number {
    const width = this.calculateWidth(context);
    const height = this.calculateHeight(context);
    return Math.min(width, height);
  }

  /**
   * Default dimension strategy
   */
  private getDefaultDimensionStrategy(): DimensionStrategy {
    return () => DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }
}

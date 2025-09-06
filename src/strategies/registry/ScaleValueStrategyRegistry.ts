import { ScaleValue } from '../../enums/ScaleValue';
import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for scale value calculations
 */
export type ScaleValueStrategy = (context: UnitContext) => number;

/**
 * Registry for scale value strategies
 */
export class ScaleValueStrategyRegistry {
  private static instance: ScaleValueStrategyRegistry;
  private scaleValueStrategies: Map<ScaleValue, ScaleValueStrategy> = new Map();

  private constructor() {
    this.initializeScaleValueStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ScaleValueStrategyRegistry {
    if (!ScaleValueStrategyRegistry.instance) {
      ScaleValueStrategyRegistry.instance = new ScaleValueStrategyRegistry();
    }
    return ScaleValueStrategyRegistry.instance;
  }

  /**
   * Get strategy for scale value
   */
  public getScaleValueStrategy(scaleValue: ScaleValue): ScaleValueStrategy {
    return this.scaleValueStrategies.get(scaleValue) || this.getDefaultScaleValueStrategy();
  }

  /**
   * Register custom scale value strategy
   */
  public registerScaleValueStrategy(scaleValue: ScaleValue, strategy: ScaleValueStrategy): void {
    this.scaleValueStrategies.set(scaleValue, strategy);
  }

  /**
   * Initialize scale value strategies
   */
  private initializeScaleValueStrategies(): void {
    // Factor strategy
    this.scaleValueStrategies.set(ScaleValue.FACTOR, () => {
      return 1;
    });

    // Fit strategy
    this.scaleValueStrategies.set(ScaleValue.FIT, (context) => {
      return this.calculateFitScale(context);
    });

    // Stretch strategy
    this.scaleValueStrategies.set(ScaleValue.STRETCH, () => {
      return 2;
    });

    // Fill strategy
    this.scaleValueStrategies.set(ScaleValue.FILL, (context) => {
      return this.calculateFillScale(context);
    });

    // Maintain aspect strategy
    this.scaleValueStrategies.set(ScaleValue.MAINTAIN_ASPECT, () => {
      return 1;
    });

    // Ignore aspect strategy
    this.scaleValueStrategies.set(ScaleValue.IGNORE_ASPECT, () => {
      return 1;
    });

    // Content scale strategy
    this.scaleValueStrategies.set(ScaleValue.CONTENT_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    // Intrinsic scale strategy
    this.scaleValueStrategies.set(ScaleValue.INTRINSIC_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    // Breakpoint scale strategy
    this.scaleValueStrategies.set(ScaleValue.BREAKPOINT_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    // Device scale strategy
    this.scaleValueStrategies.set(ScaleValue.DEVICE_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    // Random scale strategy
    this.scaleValueStrategies.set(ScaleValue.RANDOM, () => {
      const min = DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MIN;
      const max = DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MAX;
      return Math.random() * (max - min) + min;
    });
  }

  /**
   * Calculate fit scale based on context
   */
  private calculateFitScale(context: UnitContext): number {
    if (!context.parent) return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;

    const parentWidth = context.parent.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const parentHeight = context.parent.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const contentWidth = context.content?.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const contentHeight = context.content?.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;

    const scaleX = parentWidth / contentWidth;
    const scaleY = parentHeight / contentHeight;

    return Math.min(scaleX, scaleY);
  }

  /**
   * Calculate fill scale based on context
   */
  private calculateFillScale(context: UnitContext): number {
    if (!context.parent) return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;

    const parentWidth = context.parent.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const parentHeight = context.parent.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const contentWidth = context.content?.width || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    const contentHeight = context.content?.height || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;

    const scaleX = parentWidth / contentWidth;
    const scaleY = parentHeight / contentHeight;

    return Math.max(scaleX, scaleY);
  }

  /**
   * Default scale value strategy
   */
  private getDefaultScaleValueStrategy(): ScaleValueStrategy {
    return () => DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }
}

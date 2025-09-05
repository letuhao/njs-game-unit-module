import { ScaleUnit } from '../../enums/ScaleUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for scale unit calculations
 */
export type ScaleUnitStrategy = (baseValue: number | ScaleValue, context: UnitContext) => number;

/**
 * Strategy function type for scale value calculations
 */
export type ScaleValueStrategy = (baseScale: number, context: UnitContext) => number;

/**
 * Registry for scale unit strategies
 */
export class ScaleUnitStrategyRegistry {
  private static instance: ScaleUnitStrategyRegistry;
  private scaleUnitStrategies: Map<ScaleUnit, ScaleUnitStrategy> = new Map();
  private scaleValueStrategies: Map<ScaleValue, ScaleValueStrategy> = new Map();

  private constructor() {
    this.initializeScaleUnitStrategies();
    this.initializeScaleValueStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ScaleUnitStrategyRegistry {
    if (!ScaleUnitStrategyRegistry.instance) {
      ScaleUnitStrategyRegistry.instance = new ScaleUnitStrategyRegistry();
    }
    return ScaleUnitStrategyRegistry.instance;
  }

  /**
   * Get strategy for scale unit
   */
  public getScaleUnitStrategy(scaleUnit: ScaleUnit): ScaleUnitStrategy {
    return this.scaleUnitStrategies.get(scaleUnit) || this.getDefaultScaleUnitStrategy();
  }

  /**
   * Get strategy for scale value
   */
  public getScaleValueStrategy(scaleValue: ScaleValue): ScaleValueStrategy {
    return this.scaleValueStrategies.get(scaleValue) || this.getDefaultScaleValueStrategy();
  }

  /**
   * Register custom scale unit strategy
   */
  public registerScaleUnitStrategy(scaleUnit: ScaleUnit, strategy: ScaleUnitStrategy): void {
    this.scaleUnitStrategies.set(scaleUnit, strategy);
  }

  /**
   * Register custom scale value strategy
   */
  public registerScaleValueStrategy(scaleValue: ScaleValue, strategy: ScaleValueStrategy): void {
    this.scaleValueStrategies.set(scaleValue, strategy);
  }

  /**
   * Initialize scale unit strategies
   */
  private initializeScaleUnitStrategies(): void {
    // Factor strategy
    this.scaleUnitStrategies.set(ScaleUnit.FACTOR, (baseValue) => {
      return typeof baseValue === 'number'
        ? baseValue
        : DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    // Percentage strategy
    this.scaleUnitStrategies.set(ScaleUnit.PERCENTAGE, (baseValue) => {
      return typeof baseValue === 'number'
        ? baseValue / 100
        : DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    // Parent strategies
    this.scaleUnitStrategies.set(ScaleUnit.PARENT_SCALE, () => 1.0);

    this.scaleUnitStrategies.set(ScaleUnit.PARENT_WIDTH_SCALE, (_, context) => {
      return (context.parent?.width ?? 1) / (context.scene?.width ?? 1);
    });

    this.scaleUnitStrategies.set(ScaleUnit.PARENT_HEIGHT_SCALE, (_, context) => {
      return (context.parent?.height ?? 1) / (context.scene?.height ?? 1);
    });

    // Scene strategies
    this.scaleUnitStrategies.set(ScaleUnit.SCENE_SCALE, () => 1.0);

    this.scaleUnitStrategies.set(ScaleUnit.SCENE_WIDTH_SCALE, (_, context) => {
      return (context.scene?.width ?? 1) / (context.viewport?.width ?? 1);
    });

    this.scaleUnitStrategies.set(ScaleUnit.SCENE_HEIGHT_SCALE, (_, context) => {
      return (context.scene?.height ?? 1) / (context.viewport?.height ?? 1);
    });

    // Viewport strategies
    this.scaleUnitStrategies.set(ScaleUnit.VIEWPORT_SCALE, () => 1.0);

    this.scaleUnitStrategies.set(ScaleUnit.VIEWPORT_WIDTH_SCALE, (_, context) => {
      return (context.viewport?.width ?? 1) / (context.scene?.width ?? 1);
    });

    this.scaleUnitStrategies.set(ScaleUnit.VIEWPORT_HEIGHT_SCALE, (_, context) => {
      return (context.viewport?.height ?? 1) / (context.scene?.height ?? 1);
    });
  }

  /**
   * Initialize scale value strategies
   */
  private initializeScaleValueStrategies(): void {
    // Basic scale strategies
    this.scaleValueStrategies.set(ScaleValue.FIT, (_, context) => {
      return this.calculateFitScale(context);
    });

    this.scaleValueStrategies.set(ScaleValue.STRETCH, (_, context) => {
      return this.calculateStretchScale(context);
    });

    this.scaleValueStrategies.set(ScaleValue.FILL, (_, context) => {
      return this.calculateFillScale(context);
    });

    this.scaleValueStrategies.set(ScaleValue.MAINTAIN_ASPECT, (_, context) => {
      return this.calculateMaintainAspectScale(context);
    });

    this.scaleValueStrategies.set(ScaleValue.IGNORE_ASPECT, (_, context) => {
      return this.calculateIgnoreAspectScale(context);
    });

    // Special scale strategies
    this.scaleValueStrategies.set(ScaleValue.CONTENT_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    this.scaleValueStrategies.set(ScaleValue.INTRINSIC_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    this.scaleValueStrategies.set(ScaleValue.BREAKPOINT_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    this.scaleValueStrategies.set(ScaleValue.DEVICE_SCALE, () => {
      return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    });

    this.scaleValueStrategies.set(ScaleValue.RANDOM, () => {
      const min = DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MIN;
      const max = DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MAX;
      return Math.random() * (max - min) + min;
    });
  }

  /**
   * Calculate fit scale
   */
  private calculateFitScale(context: UnitContext): number {
    const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const availableWidth =
      context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
    const availableHeight =
      context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;

    return Math.min(scaleX, scaleY);
  }

  /**
   * Calculate stretch scale
   */
  private calculateStretchScale(context: UnitContext): number {
    const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const availableWidth =
      context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
    const availableHeight =
      context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;

    return Math.max(scaleX, scaleY);
  }

  /**
   * Calculate fill scale
   */
  private calculateFillScale(context: UnitContext): number {
    return this.calculateStretchScale(context);
  }

  /**
   * Calculate maintain aspect scale
   */
  private calculateMaintainAspectScale(context: UnitContext): number {
    return this.calculateFitScale(context);
  }

  /**
   * Calculate ignore aspect scale
   */
  private calculateIgnoreAspectScale(context: UnitContext): number {
    return this.calculateStretchScale(context);
  }

  /**
   * Default scale unit strategy
   */
  private getDefaultScaleUnitStrategy(): ScaleUnitStrategy {
    return () => DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Default scale value strategy
   */
  private getDefaultScaleValueStrategy(): ScaleValueStrategy {
    return (baseScale) => baseScale;
  }
}

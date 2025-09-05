import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { Dimension } from '../../enums/Dimension';
import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for size unit calculations
 */
export type SizeUnitStrategy = (baseValue: number | SizeValue, context: UnitContext) => number;

/**
 * Strategy function type for size value calculations
 */
export type SizeValueStrategy = (measuredSize: number, context: UnitContext) => number;

/**
 * Registry for size unit strategies
 */
export class SizeUnitStrategyRegistry {
  private static instance: SizeUnitStrategyRegistry;
  private sizeUnitStrategies: Map<SizeUnit, SizeUnitStrategy> = new Map();
  private sizeValueStrategies: Map<SizeValue, SizeValueStrategy> = new Map();

  private constructor() {
    this.initializeSizeUnitStrategies();
    this.initializeSizeValueStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): SizeUnitStrategyRegistry {
    if (!SizeUnitStrategyRegistry.instance) {
      SizeUnitStrategyRegistry.instance = new SizeUnitStrategyRegistry();
    }
    return SizeUnitStrategyRegistry.instance;
  }

  /**
   * Get strategy for size unit
   */
  public getSizeUnitStrategy(sizeUnit: SizeUnit): SizeUnitStrategy {
    return this.sizeUnitStrategies.get(sizeUnit) || this.getDefaultSizeUnitStrategy();
  }

  /**
   * Get strategy for size value
   */
  public getSizeValueStrategy(sizeValue: SizeValue): SizeValueStrategy {
    return this.sizeValueStrategies.get(sizeValue) || this.getDefaultSizeValueStrategy();
  }

  /**
   * Register custom size unit strategy
   */
  public registerSizeUnitStrategy(sizeUnit: SizeUnit, strategy: SizeUnitStrategy): void {
    this.sizeUnitStrategies.set(sizeUnit, strategy);
  }

  /**
   * Register custom size value strategy
   */
  public registerSizeValueStrategy(sizeValue: SizeValue, strategy: SizeValueStrategy): void {
    this.sizeValueStrategies.set(sizeValue, strategy);
  }

  /**
   * Initialize size unit strategies
   */
  private initializeSizeUnitStrategies(): void {
    // Pixel strategy
    this.sizeUnitStrategies.set(SizeUnit.PIXEL, (baseValue) => {
      return typeof baseValue === 'number'
        ? baseValue
        : DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    });

    // Percentage strategy
    this.sizeUnitStrategies.set(SizeUnit.PERCENTAGE, (baseValue) => {
      return typeof baseValue === 'number'
        ? baseValue
        : DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    });

    // Parent strategies
    this.sizeUnitStrategies.set(SizeUnit.PARENT_WIDTH, (_, context) => {
      return context.parent?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    });

    this.sizeUnitStrategies.set(SizeUnit.PARENT_HEIGHT, (_, context) => {
      return context.parent?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    });

    // Scene strategies
    this.sizeUnitStrategies.set(SizeUnit.SCENE_WIDTH, (_, context) => {
      return context.scene?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
    });

    this.sizeUnitStrategies.set(SizeUnit.SCENE_HEIGHT, (_, context) => {
      return context.scene?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
    });

    // Viewport strategies
    this.sizeUnitStrategies.set(SizeUnit.VIEWPORT_WIDTH, (_, context) => {
      return context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
    });

    this.sizeUnitStrategies.set(SizeUnit.VIEWPORT_HEIGHT, (_, context) => {
      return context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
    });
  }

  /**
   * Initialize size value strategies
   */
  private initializeSizeValueStrategies(): void {
    // Basic size strategies
    this.sizeValueStrategies.set(SizeValue.FILL, (_, context) => {
      return this.calculateFillSize(context);
    });

    this.sizeValueStrategies.set(SizeValue.AUTO, (_, context) => {
      return this.calculateAutoSize(context);
    });

    this.sizeValueStrategies.set(SizeValue.FIT, (_, context) => {
      return this.calculateFitSize(context);
    });

    this.sizeValueStrategies.set(SizeValue.STRETCH, (_, context) => {
      return this.calculateStretchSize(context);
    });

    // Special size strategies
    this.sizeValueStrategies.set(SizeValue.CONTENT, (_, context) => {
      return this.calculateContentSize(context);
    });

    this.sizeValueStrategies.set(SizeValue.INTRINSIC, (_, context) => {
      return this.calculateIntrinsicSize(context);
    });

    this.sizeValueStrategies.set(SizeValue.RANDOM, () => {
      const min = DEFAULT_FALLBACK_VALUES.SIZE.MIN;
      const max = DEFAULT_FALLBACK_VALUES.SIZE.MAX;
      return Math.random() * (max - min) + min;
    });
  }

  /**
   * Calculate fill size
   */
  private calculateFillSize(context: UnitContext): number {
    return context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  }

  /**
   * Calculate auto size
   */
  private calculateAutoSize(context: UnitContext): number {
    return context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  }

  /**
   * Calculate fit size
   */
  private calculateFitSize(context: UnitContext): number {
    const contentSize = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const availableSize = context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
    return Math.min(contentSize, availableSize);
  }

  /**
   * Calculate stretch size
   */
  private calculateStretchSize(context: UnitContext): number {
    return context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  }

  /**
   * Calculate content size
   */
  private calculateContentSize(context: UnitContext): number {
    return context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  }

  /**
   * Calculate intrinsic size
   */
  private calculateIntrinsicSize(context: UnitContext): number {
    return this.calculateContentSize(context);
  }

  /**
   * Default size unit strategy
   */
  private getDefaultSizeUnitStrategy(): SizeUnitStrategy {
    return () => DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Default size value strategy
   */
  private getDefaultSizeValueStrategy(): SizeValueStrategy {
    return (measuredSize) => measuredSize;
  }
}

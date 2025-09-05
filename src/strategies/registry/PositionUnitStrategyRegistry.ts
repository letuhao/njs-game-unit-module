import { PositionUnit } from '../../enums/PositionUnit';
import { PositionValue } from '../../enums/PositionValue';
import { Dimension } from '../../enums/Dimension';
import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for position unit calculations
 */
export type PositionUnitStrategy = (baseValue: number | PositionValue, context: UnitContext) => number;

/**
 * Strategy function type for position value calculations
 */
export type PositionValueStrategy = (referencePoint: number, context: UnitContext) => number;

/**
 * Registry for position unit strategies
 */
export class PositionUnitStrategyRegistry {
  private static instance: PositionUnitStrategyRegistry;
  private positionUnitStrategies: Map<PositionUnit, PositionUnitStrategy> = new Map();
  private positionValueStrategies: Map<PositionValue, PositionValueStrategy> = new Map();

  private constructor() {
    this.initializePositionUnitStrategies();
    this.initializePositionValueStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): PositionUnitStrategyRegistry {
    if (!PositionUnitStrategyRegistry.instance) {
      PositionUnitStrategyRegistry.instance = new PositionUnitStrategyRegistry();
    }
    return PositionUnitStrategyRegistry.instance;
  }

  /**
   * Get strategy for position unit
   */
  public getPositionUnitStrategy(positionUnit: PositionUnit): PositionUnitStrategy {
    return this.positionUnitStrategies.get(positionUnit) || this.getDefaultPositionUnitStrategy();
  }

  /**
   * Get strategy for position value
   */
  public getPositionValueStrategy(positionValue: PositionValue): PositionValueStrategy {
    return this.positionValueStrategies.get(positionValue) || this.getDefaultPositionValueStrategy();
  }

  /**
   * Register custom position unit strategy
   */
  public registerPositionUnitStrategy(positionUnit: PositionUnit, strategy: PositionUnitStrategy): void {
    this.positionUnitStrategies.set(positionUnit, strategy);
  }

  /**
   * Register custom position value strategy
   */
  public registerPositionValueStrategy(positionValue: PositionValue, strategy: PositionValueStrategy): void {
    this.positionValueStrategies.set(positionValue, strategy);
  }

  /**
   * Initialize position unit strategies
   */
  private initializePositionUnitStrategies(): void {
    // Pixel strategy
    this.positionUnitStrategies.set(PositionUnit.PIXEL, (baseValue) => {
      return typeof baseValue === 'number' ? baseValue : 0;
    });

    // Percentage strategy
    this.positionUnitStrategies.set(PositionUnit.PERCENTAGE, (baseValue) => {
      return typeof baseValue === 'number' ? baseValue : 0;
    });

    // Parent strategies
    this.positionUnitStrategies.set(PositionUnit.PARENT_LEFT, (_, context) => {
      return context.parent?.x ?? 0;
    });

    this.positionUnitStrategies.set(PositionUnit.PARENT_RIGHT, (_, context) => {
      return (context.parent?.x ?? 0) + (context.parent?.width ?? 0);
    });

    this.positionUnitStrategies.set(PositionUnit.PARENT_TOP, (_, context) => {
      return context.parent?.y ?? 0;
    });

    this.positionUnitStrategies.set(PositionUnit.PARENT_BOTTOM, (_, context) => {
      return (context.parent?.y ?? 0) + (context.parent?.height ?? 0);
    });

    this.positionUnitStrategies.set(PositionUnit.PARENT_CENTER_X, (_, context) => {
      if (context.parent) {
        return context.parent.x + context.parent.width / 2;
      } else {
        // Fallback to scene center when no parent
        return (context.scene?.width ?? 0) / 2;
      }
    });

    this.positionUnitStrategies.set(PositionUnit.PARENT_CENTER_Y, (_, context) => {
      return (context.parent?.y ?? 0) + (context.parent?.height ?? 0) / 2;
    });

    // Scene strategies
    this.positionUnitStrategies.set(PositionUnit.SCENE_LEFT, () => 0);

    this.positionUnitStrategies.set(PositionUnit.SCENE_RIGHT, (_, context) => {
      return context.scene?.width ?? 0;
    });

    this.positionUnitStrategies.set(PositionUnit.SCENE_TOP, () => 0);

    this.positionUnitStrategies.set(PositionUnit.SCENE_BOTTOM, (_, context) => {
      return context.scene?.height ?? 0;
    });

    this.positionUnitStrategies.set(PositionUnit.SCENE_CENTER_X, (_, context) => {
      return (context.scene?.width ?? 0) / 2;
    });

    this.positionUnitStrategies.set(PositionUnit.SCENE_CENTER_Y, (_, context) => {
      return (context.scene?.height ?? 0) / 2;
    });

    // Viewport strategies
    this.positionUnitStrategies.set(PositionUnit.VIEWPORT_LEFT, () => 0);

    this.positionUnitStrategies.set(PositionUnit.VIEWPORT_RIGHT, (_, context) => {
      return context.viewport?.width ?? 0;
    });

    this.positionUnitStrategies.set(PositionUnit.VIEWPORT_TOP, () => 0);

    this.positionUnitStrategies.set(PositionUnit.VIEWPORT_BOTTOM, (_, context) => {
      return context.viewport?.height ?? 0;
    });
  }

  /**
   * Initialize position value strategies
   */
  private initializePositionValueStrategies(): void {
    // Basic position strategies
    this.positionValueStrategies.set(PositionValue.CENTER, (referencePoint) => referencePoint);
    this.positionValueStrategies.set(PositionValue.LEFT, (referencePoint) => referencePoint);
    this.positionValueStrategies.set(PositionValue.RIGHT, (referencePoint) => referencePoint);
    this.positionValueStrategies.set(PositionValue.TOP, (referencePoint) => referencePoint);
    this.positionValueStrategies.set(PositionValue.BOTTOM, (referencePoint) => referencePoint);

    // Static position strategies
    this.positionValueStrategies.set(PositionValue.STATIC, () => 0);
    this.positionValueStrategies.set(PositionValue.RELATIVE, () => 0);
    this.positionValueStrategies.set(PositionValue.ABSOLUTE, () => 0);
    this.positionValueStrategies.set(PositionValue.FIXED, () => 0);

    // Special position strategies
    this.positionValueStrategies.set(PositionValue.RANDOM, (_, context) => {
      const max = context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
      return Math.random() * max;
    });

    this.positionValueStrategies.set(PositionValue.CONTENT_LEFT, () => 0);

    this.positionValueStrategies.set(PositionValue.CONTENT_RIGHT, (_, context) => {
      return context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    });

    this.positionValueStrategies.set(PositionValue.CONTENT_TOP, () => 0);

    this.positionValueStrategies.set(PositionValue.CONTENT_BOTTOM, (_, context) => {
      return context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    });
  }

  /**
   * Default position unit strategy
   */
  private getDefaultPositionUnitStrategy(): PositionUnitStrategy {
    return () => 0;
  }

  /**
   * Default position value strategy
   */
  private getDefaultPositionValueStrategy(): PositionValueStrategy {
    return (referencePoint) => referencePoint;
  }
}

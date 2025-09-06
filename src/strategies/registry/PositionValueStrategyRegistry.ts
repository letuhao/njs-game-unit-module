import { PositionValue } from '../../enums/PositionValue';
import { Dimension } from '../../enums/Dimension';
import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for position value calculations
 */
export type PositionValueStrategy = (context: UnitContext) => number;

/**
 * Registry for position value strategies
 */
export class PositionValueStrategyRegistry {
  private static instance: PositionValueStrategyRegistry;
  private positionValueStrategies: Map<PositionValue, PositionValueStrategy> = new Map();

  private constructor() {
    this.initializePositionValueStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): PositionValueStrategyRegistry {
    if (!PositionValueStrategyRegistry.instance) {
      PositionValueStrategyRegistry.instance = new PositionValueStrategyRegistry();
    }
    return PositionValueStrategyRegistry.instance;
  }

  /**
   * Get strategy for position value
   */
  public getPositionValueStrategy(positionValue: PositionValue): PositionValueStrategy {
    return this.positionValueStrategies.get(positionValue) || this.getDefaultPositionValueStrategy();
  }

  /**
   * Register custom position value strategy
   */
  public registerPositionValueStrategy(positionValue: PositionValue, strategy: PositionValueStrategy): void {
    this.positionValueStrategies.set(positionValue, strategy);
  }

  /**
   * Initialize position value strategies
   */
  private initializePositionValueStrategies(): void {
    // Center strategy
    this.positionValueStrategies.set(PositionValue.CENTER, (context) => {
      return this.calculateCenterPosition(context);
    });

    // Left strategy
    this.positionValueStrategies.set(PositionValue.LEFT, (context) => {
      return this.calculateLeftPosition(context);
    });

    // Right strategy
    this.positionValueStrategies.set(PositionValue.RIGHT, (context) => {
      return this.calculateRightPosition(context);
    });

    // Top strategy
    this.positionValueStrategies.set(PositionValue.TOP, (context) => {
      return this.calculateTopPosition(context);
    });

    // Bottom strategy
    this.positionValueStrategies.set(PositionValue.BOTTOM, (context) => {
      return this.calculateBottomPosition(context);
    });

    // Static strategy
    this.positionValueStrategies.set(PositionValue.STATIC, () => {
      return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
    });

    // Relative strategy
    this.positionValueStrategies.set(PositionValue.RELATIVE, () => {
      return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
    });

    // Absolute strategy
    this.positionValueStrategies.set(PositionValue.ABSOLUTE, () => {
      return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
    });

    // Fixed strategy
    this.positionValueStrategies.set(PositionValue.FIXED, () => {
      return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
    });

    // Random strategy
    this.positionValueStrategies.set(PositionValue.RANDOM, (context) => {
      return this.calculateRandomPosition(context);
    });

    // Content strategies
    this.positionValueStrategies.set(PositionValue.CONTENT_LEFT, (context) => {
      return this.calculateContentLeftPosition(context);
    });

    this.positionValueStrategies.set(PositionValue.CONTENT_RIGHT, (context) => {
      return this.calculateContentRightPosition(context);
    });

    this.positionValueStrategies.set(PositionValue.CONTENT_TOP, (context) => {
      return this.calculateContentTopPosition(context);
    });

    this.positionValueStrategies.set(PositionValue.CONTENT_BOTTOM, (context) => {
      return this.calculateContentBottomPosition(context);
    });
  }

  /**
   * Calculate center position
   */
  private calculateCenterPosition(context: UnitContext): number {
    const dimension = this.getDimensionFromContext(context);
    if (dimension === Dimension.X) {
      return (
        (context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT) / 2
      );
    } else if (dimension === Dimension.Y) {
      return (
        (context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT) / 2
      );
    }
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Calculate left position
   */
  private calculateLeftPosition(_context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Calculate right position
   */
  private calculateRightPosition(context: UnitContext): number {
    return context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate top position
   */
  private calculateTopPosition(_context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Calculate bottom position
   */
  private calculateBottomPosition(context: UnitContext): number {
    return (
      context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT
    );
  }

  /**
   * Calculate random position
   */
  private calculateRandomPosition(context: UnitContext): number {
    const max = context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    return Math.random() * max;
  }

  /**
   * Calculate content left position
   */
  private calculateContentLeftPosition(_context: UnitContext): number {
    return 0;
  }

  /**
   * Calculate content right position
   */
  private calculateContentRightPosition(context: UnitContext): number {
    return context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate content top position
   */
  private calculateContentTopPosition(_context: UnitContext): number {
    return 0;
  }

  /**
   * Calculate content bottom position
   */
  private calculateContentBottomPosition(context: UnitContext): number {
    return context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Get dimension from context or default to X
   */
  private getDimensionFromContext(context: UnitContext): Dimension.X | Dimension.Y | Dimension.XY {
    // Check if context has a valid dimension property
    if (
      context.dimension &&
      (context.dimension === Dimension.X ||
        context.dimension === Dimension.Y ||
        context.dimension === Dimension.XY)
    ) {
      return context.dimension;
    }
    return Dimension.X;
  }

  /**
   * Default position value strategy
   */
  private getDefaultPositionValueStrategy(): PositionValueStrategy {
    return () => DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }
}

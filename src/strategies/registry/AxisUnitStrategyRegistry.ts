import { AxisUnit } from '../../enums/AxisUnit';
import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for axis unit calculations
 */
export type AxisUnitStrategy = (context: UnitContext) => number;

/**
 * Registry for axis unit strategies
 */
export class AxisUnitStrategyRegistry {
  private static instance: AxisUnitStrategyRegistry;
  private axisUnitStrategies: Map<AxisUnit, AxisUnitStrategy> = new Map();

  private constructor() {
    this.initializeAxisUnitStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): AxisUnitStrategyRegistry {
    if (!AxisUnitStrategyRegistry.instance) {
      AxisUnitStrategyRegistry.instance = new AxisUnitStrategyRegistry();
    }
    return AxisUnitStrategyRegistry.instance;
  }

  /**
   * Get strategy for axis unit
   */
  public getAxisUnitStrategy(axisUnit: AxisUnit): AxisUnitStrategy {
    return this.axisUnitStrategies.get(axisUnit) || this.getDefaultAxisUnitStrategy();
  }

  /**
   * Register custom axis unit strategy
   */
  public registerAxisUnitStrategy(axisUnit: AxisUnit, strategy: AxisUnitStrategy): void {
    this.axisUnitStrategies.set(axisUnit, strategy);
  }

  /**
   * Initialize axis unit strategies
   */
  private initializeAxisUnitStrategies(): void {
    // X axis strategy
    this.axisUnitStrategies.set(AxisUnit.X, (context) => {
      return this.calculateXAxis(context);
    });

    // Y axis strategy
    this.axisUnitStrategies.set(AxisUnit.Y, (context) => {
      return this.calculateYAxis(context);
    });
  }

  /**
   * Calculate X axis value
   */
  private calculateXAxis(context: UnitContext): number {
    if (context.scene) {
      return context.scene.width / 2;
    }
    if (context.parent) {
      return context.parent.width / 2;
    }
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Calculate Y axis value
   */
  private calculateYAxis(context: UnitContext): number {
    if (context.scene) {
      return context.scene.height / 2;
    }
    if (context.parent) {
      return context.parent.height / 2;
    }
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Default axis unit strategy
   */
  private getDefaultAxisUnitStrategy(): AxisUnitStrategy {
    return () => DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }
}

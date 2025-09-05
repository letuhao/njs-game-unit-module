import type { UnitContext } from '../../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';

/**
 * Strategy function type for unit type calculations
 */
export type UnitTypeStrategy = (value: unknown, context: UnitContext) => number;

/**
 * Registry for unit type strategies
 */
export class UnitTypeStrategyRegistry {
  private static instance: UnitTypeStrategyRegistry;
  private unitTypeStrategies: Map<string, UnitTypeStrategy> = new Map();

  private constructor() {
    this.initializeUnitTypeStrategies();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): UnitTypeStrategyRegistry {
    if (!UnitTypeStrategyRegistry.instance) {
      UnitTypeStrategyRegistry.instance = new UnitTypeStrategyRegistry();
    }
    return UnitTypeStrategyRegistry.instance;
  }

  /**
   * Get strategy for unit type
   */
  public getUnitTypeStrategy(unitType: string): UnitTypeStrategy {
    return this.unitTypeStrategies.get(unitType.toLowerCase()) || this.getDefaultUnitTypeStrategy();
  }

  /**
   * Register custom unit type strategy
   */
  public registerUnitTypeStrategy(unitType: string, strategy: UnitTypeStrategy): void {
    this.unitTypeStrategies.set(unitType.toLowerCase(), strategy);
  }

  /**
   * Initialize unit type strategies
   */
  private initializeUnitTypeStrategies(): void {
    // Size strategy
    this.unitTypeStrategies.set('size', (value, _context) => {
      return this.calculateSizeValue(value, _context);
    });

    // Position strategy
    this.unitTypeStrategies.set('position', (value, _context) => {
      return this.calculatePositionValue(value, _context);
    });

    // Scale strategy
    this.unitTypeStrategies.set('scale', (value, _context) => {
      return this.calculateScaleValue(value, _context);
    });
  }

  /**
   * Calculate size value
   */
  private calculateSizeValue(_value: unknown, _context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Calculate position value
   */
  private calculatePositionValue(_value: unknown, _context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Calculate scale value
   */
  private calculateScaleValue(_value: unknown, _context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  /**
   * Default unit type strategy
   */
  private getDefaultUnitTypeStrategy(): UnitTypeStrategy {
    return (value, _context) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') return parseFloat(value) || DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    };
  }
}

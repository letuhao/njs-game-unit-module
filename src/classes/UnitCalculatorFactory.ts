import type { IUnit } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * UnitCalculatorFactory class
 * Provides factory methods for creating different types of unit calculators using DI
 */
export class UnitCalculatorFactory {
  private static instance: UnitCalculatorFactory;
  private calculators: Map<string, IUnit> = new Map();

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): UnitCalculatorFactory {
    if (!UnitCalculatorFactory.instance) {
      UnitCalculatorFactory.instance = new UnitCalculatorFactory();
    }
    return UnitCalculatorFactory.instance;
  }

  /**
   * Create a size unit calculator
   */
  createSizeCalculator(
    id: string,
    name: string,
    sizeUnit: any,
    dimension: any,
    baseValue: number | any,
    maintainAspectRatio: boolean = false
  ): IUnit {
    try {
      // Try to resolve from DI container first
      const SizeCalculatorClass = container.resolve(TOKENS.SIZE_CALCULATOR);
      const calculator = new SizeCalculatorClass(
        id,
        name,
        sizeUnit,
        dimension,
        baseValue,
        maintainAspectRatio
      );
      this.calculators.set(id, calculator);
      return calculator;
    } catch (error) {
      // Fallback to direct instantiation
      throw new Error(`Failed to create size calculator: ${error}`);
    }
  }

  /**
   * Create a position unit calculator
   */
  createPositionCalculator(
    id: string,
    name: string,
    positionUnit: any,
    axis: any,
    baseValue: number | any
  ): IUnit {
    try {
      // Try to resolve from DI container first
      const PositionCalculatorClass = container.resolve(TOKENS.POSITION_CALCULATOR);
      const calculator = new PositionCalculatorClass(
        id,
        name,
        positionUnit,
        axis,
        baseValue
      );
      this.calculators.set(id, calculator);
      return calculator;
    } catch (error) {
      // Fallback to direct instantiation
      throw new Error(`Failed to create position calculator: ${error}`);
    }
  }

  /**
   * Create a scale unit calculator
   */
  createScaleCalculator(
    id: string,
    name: string,
    scaleUnit: any,
    baseValue: number | any,
    maintainAspectRatio: boolean = false
  ): IUnit {
    try {
      // Try to resolve from DI container first
      const ScaleCalculatorClass = container.resolve(TOKENS.SCALE_CALCULATOR);
      const calculator = new ScaleCalculatorClass(
        id,
        name,
        scaleUnit,
        baseValue,
        maintainAspectRatio
      );
      this.calculators.set(id, calculator);
      return calculator;
    } catch (error) {
      // Fallback to direct instantiation
      throw new Error(`Failed to create scale calculator: ${error}`);
    }
  }

  /**
   * Create a calculator based on unit type
   */
  createCalculator(
    unitType: UnitType,
    id: string,
    name: string,
    ...args: any[]
  ): IUnit {
    switch (unitType) {
      case UnitType.SIZE:
        return this.createSizeCalculator(id, name, ...args);
      case UnitType.POSITION:
        return this.createPositionCalculator(id, name, ...args);
      case UnitType.SCALE:
        return this.createScaleCalculator(id, name, ...args);
      default:
        throw new Error(`Unsupported unit type: ${unitType}`);
    }
  }

  /**
   * Get a calculator by ID
   */
  getCalculator(id: string): IUnit | undefined {
    return this.calculators.get(id);
  }

  /**
   * Get all calculators
   */
  getAllCalculators(): IUnit[] {
    return Array.from(this.calculators.values());
  }

  /**
   * Get calculators by type
   */
  getCalculatorsByType(unitType: UnitType): IUnit[] {
    return this.getAllCalculators().filter(calc => calc.unitType === unitType);
  }

  /**
   * Remove a calculator
   */
  removeCalculator(id: string): boolean {
    return this.calculators.delete(id);
  }

  /**
   * Clear all calculators
   */
  clearCalculators(): void {
    this.calculators.clear();
  }

  /**
   * Get calculator count
   */
  getCalculatorCount(): number {
    return this.calculators.size;
  }

  /**
   * Check if calculator exists
   */
  hasCalculator(id: string): boolean {
    return this.calculators.has(id);
  }

  /**
   * Get factory statistics
   */
  getStatistics(): {
    totalCalculators: number;
    calculatorsByType: Record<string, number>;
    calculatorIds: string[];
  } {
    const calculatorsByType: Record<string, number> = {};
    const calculatorIds: string[] = [];

    for (const [id, calculator] of this.calculators) {
      const type = UnitType[calculator.unitType] || 'UNKNOWN';
      calculatorsByType[type] = (calculatorsByType[type] || 0) + 1;
      calculatorIds.push(id);
    }

    return {
      totalCalculators: this.calculators.size,
      calculatorsByType,
      calculatorIds,
    };
  }
}

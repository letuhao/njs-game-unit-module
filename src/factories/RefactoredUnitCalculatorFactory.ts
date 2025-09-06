import type { IUnit } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import type { DiContainer } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Refactored UnitCalculatorFactory with Dependency Injection
 * Accepts container as constructor dependency instead of using global instance
 * Follows Dependency Inversion Principle
 */
export interface IRefactoredUnitCalculatorFactory {
  createSizeCalculator(
    id: string,
    name: string,
    sizeUnit: any,
    dimension: any,
    baseValue: number | any,
    maintainAspectRatio?: boolean
  ): IUnit;

  createPositionCalculator(
    id: string,
    name: string,
    positionUnit: any,
    axis: any,
    baseValue: number | any
  ): IUnit;

  createScaleCalculator(
    id: string,
    name: string,
    scaleUnit: any,
    baseValue: number | any,
    maintainAspectRatio?: boolean
  ): IUnit;

  createCalculator(
    unitType: UnitType,
    id: string,
    name: string,
    ...args: any[]
  ): IUnit;

  getCalculator(id: string): IUnit | undefined;
  getAllCalculators(): IUnit[];
  getCalculatorsByType(unitType: UnitType): IUnit[];
  removeCalculator(id: string): boolean;
  clearCalculators(): void;
  getCalculatorCount(): number;
  hasCalculator(id: string): boolean;
  getStatistics(): {
    totalCalculators: number;
    calculatorsByType: Record<string, number>;
    calculatorIds: string[];
  };
}

/**
 * Refactored UnitCalculatorFactory Implementation
 * Uses constructor injection for the DI container
 */
export class RefactoredUnitCalculatorFactory implements IRefactoredUnitCalculatorFactory {
  private calculators: Map<string, IUnit> = new Map();

  constructor(private container: DiContainer) {
    // Container is injected, no global dependency
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
      // Resolve from injected container
      const SizeCalculatorClass = this.container.resolve(TOKENS.SIZE_CALCULATOR) as any;
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
      // Resolve from injected container
      const PositionCalculatorClass = this.container.resolve(TOKENS.POSITION_CALCULATOR) as any;
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
      // Resolve from injected container
      const ScaleCalculatorClass = this.container.resolve(TOKENS.SCALE_CALCULATOR) as any;
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
        return this.createSizeCalculator(id, name, args[0], args[1], args[2], args[3]);
      case UnitType.POSITION:
        return this.createPositionCalculator(id, name, args[0], args[1], args[2]);
      case UnitType.SCALE:
        return this.createScaleCalculator(id, name, args[0], args[1], args[2]);
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
      const type = calculator.unitType || 'UNKNOWN';
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

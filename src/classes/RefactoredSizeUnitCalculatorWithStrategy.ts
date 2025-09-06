import { SizeUnit } from '../enums/SizeUnit';
import { UnitType } from '../enums/UnitType';
import type { ISizeStrategyInput } from '../interfaces/strategy/ISizeStrategyInput';
import type { SizeUnitStrategyRegistry } from '../strategies/registry/SizeUnitStrategyRegistry';
import type { DiContainer } from '../container/DiContainer';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { TOKENS } from '../container/Tokens';

/**
 * Refactored Size Unit Calculator using Strategy Registry
 * Replaces switch statements with strategy pattern
 */
export class RefactoredSizeUnitCalculatorWithStrategy implements IUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SIZE;
  public isActive: boolean = true;
  private strategyRegistry: SizeUnitStrategyRegistry;

  constructor(
    private container: DiContainer,
    private sizeUnit: SizeUnit,
    id?: string,
    name?: string
  ) {
    this.id = id || `refactored-size-calculator-${sizeUnit}`;
    this.name = name || `Refactored Size Calculator (${sizeUnit})`;
    this.strategyRegistry = this.container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
  }

  /**
   * Calculate size using strategy registry instead of switch statement
   * @param input - Size strategy input
   * @returns Calculated size value
   */
  public calculateSize(input: ISizeStrategyInput): number {
    // Use strategy registry instead of switch statement
    const strategy = this.strategyRegistry.getStrategy(this.sizeUnit);
    return strategy(input);
  }

  /**
   * Validate input for size calculation
   * @param input - Size strategy input
   * @returns True if valid, false otherwise
   */
  public validateSize(input: ISizeStrategyInput): boolean {
    if (!input || typeof input.value !== 'number') {
      return false;
    }

    if (input.value < 0) {
      return false;
    }

    // Additional validation based on unit type
    switch (this.sizeUnit) {
      case SizeUnit.PERCENT:
        return input.value <= 100;
      case SizeUnit.VIEWPORT_WIDTH:
      case SizeUnit.VIEWPORT_HEIGHT:
        return true; // Viewport units are always valid
      case SizeUnit.PARENT_WIDTH:
      case SizeUnit.PARENT_HEIGHT:
        return true; // Parent units are always valid
      default:
        return true;
    }
  }

  /**
   * Get the current size unit
   * @returns Current size unit
   */
  public getSizeUnit(): SizeUnit {
    return this.sizeUnit;
  }

  /**
   * Set a new size unit
   * @param sizeUnit - New size unit
   */
  public setSizeUnit(sizeUnit: SizeUnit): void {
    this.sizeUnit = sizeUnit;
  }

  /**
   * Get available size units
   * @returns Array of available size units
   */
  public getAvailableSizeUnits(): SizeUnit[] {
    return this.strategyRegistry.getRegisteredSizeUnits();
  }

  /**
   * Check if a size unit is supported
   * @param sizeUnit - Size unit to check
   * @returns True if supported, false otherwise
   */
  public isSizeUnitSupported(sizeUnit: SizeUnit): boolean {
    return this.strategyRegistry.hasStrategy(sizeUnit);
  }

  // IUnit interface implementation
  public calculate(context: UnitContext): number {
    // Convert context to ISizeStrategyInput
    const input: ISizeStrategyInput = {
      unit: this.sizeUnit,
      value: 100, // Default value
      metadata: {
        contextWidth: context.scene?.width || 0,
        contextHeight: context.scene?.height || 0
      }
    };
    return this.calculateSize(input);
  }

  public isResponsive(): boolean {
    return true; // Assume responsive by default
  }

  public validate(context: UnitContext): boolean {
    return this.isActive && context !== null;
  }

  public format(format: string): string {
    return `${this.name} (${this.sizeUnit})`;
  }

  public clone(): IUnit {
    return new RefactoredSizeUnitCalculatorWithStrategy(
      this.container,
      this.sizeUnit,
      `${this.id}-clone`,
      `${this.name} (Clone)`
    );
  }

  public toString(): string {
    return this.format('');
  }
}

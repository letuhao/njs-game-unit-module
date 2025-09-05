import { SizeUnit } from '../enums/SizeUnit';
import type { ISizeStrategyInput } from '../interfaces/strategy/ISizeStrategyInput';
import type { SizeUnitStrategyRegistry } from '../strategies/registry/SizeUnitStrategyRegistry';
import type { DiContainer } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Refactored Size Unit Calculator using Strategy Registry
 * Replaces switch statements with strategy pattern
 */
export class RefactoredSizeUnitCalculatorWithStrategy {
  private strategyRegistry: SizeUnitStrategyRegistry;

  constructor(
    private container: DiContainer,
    private sizeUnit: SizeUnit
  ) {
    this.strategyRegistry = this.container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
  }

  /**
   * Calculate size using strategy registry instead of switch statement
   * @param input - Size strategy input
   * @returns Calculated size value
   */
  public calculate(input: ISizeStrategyInput): number {
    // Use strategy registry instead of switch statement
    const strategy = this.strategyRegistry.getStrategy(this.sizeUnit);
    return strategy(input);
  }

  /**
   * Validate input for size calculation
   * @param input - Size strategy input
   * @returns True if valid, false otherwise
   */
  public validate(input: ISizeStrategyInput): boolean {
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
        return input.context?.viewport !== undefined;
      case SizeUnit.PARENT_WIDTH:
      case SizeUnit.PARENT_HEIGHT:
        return input.context?.parent !== undefined;
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
}

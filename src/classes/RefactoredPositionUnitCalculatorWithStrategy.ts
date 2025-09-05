import { PositionUnit } from '../enums/PositionUnit';
import type { IPositionStrategyInput } from '../interfaces/strategy/IPositionStrategyInput';
import type { PositionUnitStrategyRegistry } from '../strategies/registry/PositionUnitStrategyRegistry';
import type { DiContainer } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Refactored Position Unit Calculator using Strategy Registry
 * Replaces switch statements with strategy pattern
 */
export class RefactoredPositionUnitCalculatorWithStrategy {
  private strategyRegistry: PositionUnitStrategyRegistry;

  constructor(
    private container: DiContainer,
    private positionUnit: PositionUnit
  ) {
    this.strategyRegistry = this.container.resolve(TOKENS.POSITION_VALUE_STRATEGY_REGISTRY);
  }

  /**
   * Calculate position using strategy registry instead of switch statement
   * @param input - Position strategy input
   * @returns Calculated position value
   */
  public calculate(input: IPositionStrategyInput): number {
    // Use strategy registry instead of switch statement
    const strategy = this.strategyRegistry.getStrategy(this.positionUnit);
    return strategy(input);
  }

  /**
   * Validate input for position calculation
   * @param input - Position strategy input
   * @returns True if valid, false otherwise
   */
  public validate(input: IPositionStrategyInput): boolean {
    if (!input || typeof input.value !== 'number') {
      return false;
    }

    // Additional validation based on unit type
    switch (this.positionUnit) {
      case PositionUnit.PERCENT:
        return input.value >= 0 && input.value <= 100;
      case PositionUnit.VIEWPORT_WIDTH:
      case PositionUnit.VIEWPORT_HEIGHT:
        return input.context?.viewport !== undefined;
      case PositionUnit.PARENT_WIDTH:
      case PositionUnit.PARENT_HEIGHT:
        return input.context?.parent !== undefined;
      default:
        return true;
    }
  }

  /**
   * Get the current position unit
   * @returns Current position unit
   */
  public getPositionUnit(): PositionUnit {
    return this.positionUnit;
  }

  /**
   * Set a new position unit
   * @param positionUnit - New position unit
   */
  public setPositionUnit(positionUnit: PositionUnit): void {
    this.positionUnit = positionUnit;
  }

  /**
   * Get available position units
   * @returns Array of available position units
   */
  public getAvailablePositionUnits(): PositionUnit[] {
    return this.strategyRegistry.getRegisteredPositionUnits();
  }

  /**
   * Check if a position unit is supported
   * @param positionUnit - Position unit to check
   * @returns True if supported, false otherwise
   */
  public isPositionUnitSupported(positionUnit: PositionUnit): boolean {
    return this.strategyRegistry.hasStrategy(positionUnit);
  }
}

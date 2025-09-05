import { ScaleUnit } from '../enums/ScaleUnit';
import type { IScaleStrategyInput } from '../interfaces/strategy/IScaleStrategyInput';
import type { ScaleUnitStrategyRegistry } from '../strategies/registry/ScaleUnitStrategyRegistry';
import type { DiContainer } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Refactored Scale Unit Calculator using Strategy Registry
 * Replaces switch statements with strategy pattern
 */
export class RefactoredScaleUnitCalculatorWithStrategy {
  private strategyRegistry: ScaleUnitStrategyRegistry;

  constructor(
    private container: DiContainer,
    private scaleUnit: ScaleUnit
  ) {
    this.strategyRegistry = this.container.resolve(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY);
  }

  /**
   * Calculate scale using strategy registry instead of switch statement
   * @param input - Scale strategy input
   * @returns Calculated scale value
   */
  public calculate(input: IScaleStrategyInput): number {
    // Use strategy registry instead of switch statement
    const strategy = this.strategyRegistry.getStrategy(this.scaleUnit);
    return strategy(input);
  }

  /**
   * Validate input for scale calculation
   * @param input - Scale strategy input
   * @returns True if valid, false otherwise
   */
  public validate(input: IScaleStrategyInput): boolean {
    if (!input || typeof input.value !== 'number') {
      return false;
    }

    if (input.value <= 0) {
      return false;
    }

    // Additional validation based on unit type
    switch (this.scaleUnit) {
      case ScaleUnit.RESPONSIVE:
        return input.value <= 1000; // Allow up to 1000% scale
      case ScaleUnit.VIEWPORT_WIDTH:
      case ScaleUnit.VIEWPORT_HEIGHT:
        return input.context?.viewport !== undefined;
      case ScaleUnit.PARENT_WIDTH:
      case ScaleUnit.PARENT_HEIGHT:
        return input.context?.parent !== undefined;
      default:
        return true;
    }
  }

  /**
   * Get the current scale unit
   * @returns Current scale unit
   */
  public getScaleUnit(): ScaleUnit {
    return this.scaleUnit;
  }

  /**
   * Set a new scale unit
   * @param scaleUnit - New scale unit
   */
  public setScaleUnit(scaleUnit: ScaleUnit): void {
    this.scaleUnit = scaleUnit;
  }

  /**
   * Get available scale units
   * @returns Array of available scale units
   */
  public getAvailableScaleUnits(): ScaleUnit[] {
    return this.strategyRegistry.getRegisteredScaleUnits();
  }

  /**
   * Check if a scale unit is supported
   * @param scaleUnit - Scale unit to check
   * @returns True if supported, false otherwise
   */
  public isScaleUnitSupported(scaleUnit: ScaleUnit): boolean {
    return this.strategyRegistry.hasStrategy(scaleUnit);
  }
}

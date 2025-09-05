import { IUnitCommand } from './IUnitCommand';
import { IStrategyInput } from '../interfaces/IStrategyInput';
import { UnitContext } from '../interfaces/IUnit';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Calculate Position Command
 * Executes position calculation using strategy pattern and DI
 */
export class CalculatePositionCommand extends IUnitCommand {
  private input: IStrategyInput;
  private context: UnitContext;
  private strategy: any;

  constructor(input: IStrategyInput, context: UnitContext) {
    super(`calculate-position-${Date.now()}`);
    this.input = input;
    this.context = context;
    
    // Resolve strategy from DI container
    try {
      this.strategy = container.resolve(TOKENS.POSITION_STRATEGY);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      throw new Error(`Failed to resolve position strategy: ${error}`);
    }
  }

  /**
   * Execute the position calculation command
   */
  execute(): boolean {
    try {
      if (!this.strategy) {
        throw new Error('Position strategy not available');
      }

      // Execute the position calculation using the strategy
      const result = this.strategy.calculate(this.input, this.context);
      
      // Store the result for potential undo operations
      this.setResult(result);
      
      return true;
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error(String(error)));
      return false;
    }
  }

  /**
   * Undo the position calculation command
   */
  undo(): boolean {
    try {
      // Position calculations are typically not reversible
      // This is a placeholder for potential future undo functionality
      return true;
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error(String(error)));
      return false;
    }
  }

  /**
   * Get command description
   */
  getDescription(): string {
    return `Calculate position for input: ${this.input.unitType}`;
  }

  /**
   * Validate command before execution
   */
  validate(): boolean {
    return !!(this.input && this.context && this.strategy);
  }

  /**
   * Get command metadata
   */
  getMetadata(): {
    commandType: string;
    inputType: string;
    contextAvailable: boolean;
    strategyAvailable: boolean;
  } {
    return {
      commandType: 'CalculatePosition',
      inputType: this.input?.unitType || 'unknown',
      contextAvailable: !!this.context,
      strategyAvailable: !!this.strategy,
    };
  }
}

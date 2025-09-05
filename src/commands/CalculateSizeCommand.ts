import { IUnitCommand } from './IUnitCommand';
import { IStrategyInput } from '../interfaces/IStrategyInput';
import { UnitContext } from '../interfaces/IUnit';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Calculate Size Command
 * Executes size calculation using strategy pattern and DI
 */
export class CalculateSizeCommand extends IUnitCommand {
  private input: IStrategyInput;
  private context: UnitContext;
  private strategy: any;

  constructor(input: IStrategyInput, context: UnitContext) {
    super(`calculate-size-${Date.now()}`);
    this.input = input;
    this.context = context;
    
    // Resolve strategy from DI container
    try {
      this.strategy = container.resolve(TOKENS.SIZE_STRATEGY);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      throw new Error(`Failed to resolve size strategy: ${error}`);
    }
  }

  /**
   * Execute the size calculation command
   */
  execute(): boolean {
    try {
      if (!this.strategy) {
        throw new Error('Size strategy not available');
      }

      // Execute the size calculation using the strategy
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
   * Undo the size calculation command
   */
  undo(): boolean {
    try {
      // Size calculations are typically not reversible
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
    return `Calculate size for input: ${this.input.unitType}`;
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
      commandType: 'CalculateSize',
      inputType: this.input?.unitType || 'unknown',
      contextAvailable: !!this.context,
      strategyAvailable: !!this.strategy,
    };
  }
}

import type { IUnitCommand } from './IUnitCommand';
import type { UnitContext } from '../interfaces/IUnit';
import { BaseUnitCommand } from './IUnitCommand';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Batch Calculation Command
 * Executes multiple unit calculations in sequence
 * 
 * Note: This class focuses solely on command execution logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class BatchCalculationCommand extends BaseUnitCommand {
  private readonly commands: IUnitCommand[];
  private executionResults: number[] = [];
  private previousResults: number[] = [];

  constructor(commands: IUnitCommand[], _context: UnitContext) {
    super(`batch-calculation-${Date.now()}`);
    this.commands = commands;
  }

  /**
   * Check if the command can be executed
   */
  public canExecute(): boolean {
    return this.commands.length > 0;
  }

  /**
   * Get command description
   */
  public getDescription(): string {
    return `Batch calculation with ${this.commands.length} commands`;
  }

  /**
   * Execute the batch calculation command
   */
  public execute(): boolean {
    try {
      this.executionResults = [];
      
      for (const command of this.commands) {
        const result = command.execute();
        if (typeof result === 'number') {
          this.executionResults.push(result);
        }
      }

      // Calculate average result
      const averageResult = this.calculateAverageResult();
      this.setResult(averageResult);
      
      // Store results for undo operation
      this.previousResults = [...this.executionResults];
      
      return true;
    } catch (error) {
      this.setError(error as Error);
      return false;
    }
  }

  /**
   * Undo the batch calculation command
   */
  public undo(): boolean {
    try {
      if (this.previousResults.length === 0) {
        return false;
      }

      // Restore previous results
      this.executionResults = [...this.previousResults];
      this.previousResults = [];
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get execution results
   */
  public getExecutionResults(): number[] {
    return [...this.executionResults];
  }

  /**
   * Get previous results
   */
  public getPreviousResults(): number[] {
    return [...this.previousResults];
  }

  /**
   * Get command count
   */
  public getCommandCount(): number {
    return this.commands.length;
  }

  /**
   * Get commands
   */
  public getCommands(): IUnitCommand[] {
    return [...this.commands];
  }

  /**
   * Add command to batch
   */
  public addCommand(command: IUnitCommand): void {
    this.commands.push(command);
  }

  /**
   * Remove command from batch
   */
  public removeCommand(commandId: string): boolean {
    const index = this.commands.findIndex(cmd => cmd.id === commandId);
    if (index !== -1) {
      this.commands.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Clear all commands
   */
  public clearCommands(): void {
    this.commands.length = 0;
    this.executionResults = [];
    this.previousResults = [];
  }

  /**
   * Check if batch is empty
   */
  public isEmpty(): boolean {
    return this.commands.length === 0;
  }

  /**
   * Get batch statistics
   */
  public getBatchStatistics() {
    return {
      commandCount: this.commands.length,
      executionCount: this.executionResults.length,
      hasPreviousResults: this.previousResults.length > 0,
      averageResult: this.calculateAverageResult(),
      minResult: this.getMinResult(),
      maxResult: this.getMaxResult(),
    };
  }

  /**
   * Get result
   */
  public getResult(): any {
    return this.result;
  }

  /**
   * Get error
   */
  public getError(): Error | null {
    return this.error;
  }

  /**
   * Set result
   */
  public setResult(result: any): void {
    this.result = result;
  }

  /**
   * Set error
   */
  public setError(error: Error | null): void {
    this.error = error;
  }

  /**
   * Calculate average result
   */
  private calculateAverageResult(): number {
    if (this.executionResults.length === 0) {
      return 0;
    }

    const sum = this.executionResults.reduce((acc, result) => acc + result, 0);
    return sum / this.executionResults.length;
  }

  /**
   * Get minimum result
   */
  private getMinResult(): number {
    if (this.executionResults.length === 0) {
      return 0;
    }

    return Math.min(...this.executionResults);
  }

  /**
   * Get maximum result
   */
  private getMaxResult(): number {
    if (this.executionResults.length === 0) {
      return 0;
    }

    return Math.max(...this.executionResults);
  }
}

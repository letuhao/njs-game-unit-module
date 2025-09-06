import type { IUnitCommand } from '../commands/IUnitCommand';
import type { UnitContext } from '../interfaces/IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Command Manager
 * Handles command execution, history, and undo/redo operations
 * Follows Single Responsibility Principle - only manages commands
 * 
 * Note: This class focuses solely on command management logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export interface ICommandManager {
  // Command execution
  executeCommand(command: IUnitCommand, context: UnitContext): boolean;
  executeBatch(commands: IUnitCommand[], context: UnitContext): boolean[];

  // Command history
  undoLastCommand(): boolean;
  redoLastCommand(): boolean;
  getCommandHistory(): IUnitCommand[];
  getCommandHistorySize(): number;
  clearCommandHistory(): void;

  // Command state
  canUndo(): boolean;
  canRedo(): boolean;
  getCurrentCommandIndex(): number;

  // Command statistics
  getTotalExecutedCommands(): number;
  getAverageExecutionTime(): number;
  getExecutionStatistics(): CommandExecutionStatistics;
}

/**
 * Command execution statistics
 */
export interface CommandExecutionStatistics {
  totalExecuted: number;
  totalUndone: number;
  totalRedone: number;
  averageExecutionTime: number;
  totalExecutionTime: number;
  successRate: number;
  failureRate: number;
}

/**
 * Command Manager Implementation
 * Manages command execution, history, and undo/redo operations
 */
export class CommandManager implements ICommandManager {
  private commandHistory: IUnitCommand[] = [];
  private currentIndex: number = -1;
  private executionStatistics: CommandExecutionStatistics = {
    totalExecuted: 0,
    totalUndone: 0,
    totalRedone: 0,
    averageExecutionTime: 0,
    totalExecutionTime: 0,
    successRate: 0,
    failureRate: 0,
  };

  /**
   * Execute a single command
   */
  public executeCommand(command: IUnitCommand, context: UnitContext): boolean {
    const startTime = performance.now();
    
    try {
      const result = command.execute();
      
      // Add to history
      this.addToHistory(command);
      
      // Update statistics
      this.updateExecutionStatistics(startTime, true);
      
      return true;
    } catch (error) {
      // Update statistics
      this.updateExecutionStatistics(startTime, false);
      
      return false;
    }
  }

  /**
   * Execute multiple commands in batch
   */
  public executeBatch(commands: IUnitCommand[], context: UnitContext): boolean[] {
    const results: boolean[] = [];
    
    for (const command of commands) {
      const result = this.executeCommand(command, context);
      results.push(result);
    }
    
    return results;
  }

  /**
   * Undo the last executed command
   */
  public undoLastCommand(): boolean {
    if (!this.canUndo()) {
      return false;
    }

    try {
      const command = this.commandHistory[this.currentIndex];
      if (!command) {
        return false;
      }
      command.undo();
      
      this.currentIndex--;
      this.executionStatistics.totalUndone++;
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Redo the last undone command
   */
  public redoLastCommand(): boolean {
    if (!this.canRedo()) {
      return false;
    }

    try {
      this.currentIndex++;
      const command = this.commandHistory[this.currentIndex];
      if (!command) {
        return false;
      }
      command.execute(); // No context needed for redo
      
      this.executionStatistics.totalRedone++;
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get command history
   */
  public getCommandHistory(): IUnitCommand[] {
    return [...this.commandHistory];
  }

  /**
   * Get command history size
   */
  public getCommandHistorySize(): number {
    return this.commandHistory.length;
  }

  /**
   * Clear command history
   */
  public clearCommandHistory(): void {
    this.commandHistory = [];
    this.currentIndex = -1;
  }

  /**
   * Check if undo is possible
   */
  public canUndo(): boolean {
    return this.currentIndex >= 0;
  }

  /**
   * Check if redo is possible
   */
  public canRedo(): boolean {
    return this.currentIndex < this.commandHistory.length - 1;
  }

  /**
   * Get current command index
   */
  public getCurrentCommandIndex(): number {
    return this.currentIndex;
  }

  /**
   * Get total executed commands
   */
  public getTotalExecutedCommands(): number {
    return this.executionStatistics.totalExecuted;
  }

  /**
   * Get average execution time
   */
  public getAverageExecutionTime(): number {
    return this.executionStatistics.averageExecutionTime;
  }

  /**
   * Get execution statistics
   */
  public getExecutionStatistics(): CommandExecutionStatistics {
    return { ...this.executionStatistics };
  }

  /**
   * Add command to history
   */
  private addToHistory(command: IUnitCommand): void {
    // Remove any commands after current index (when undoing and then executing new command)
    if (this.currentIndex < this.commandHistory.length - 1) {
      this.commandHistory = this.commandHistory.slice(0, this.currentIndex + 1);
    }
    
    this.commandHistory.push(command);
    this.currentIndex = this.commandHistory.length - 1;
  }

  /**
   * Update execution statistics
   */
  private updateExecutionStatistics(startTime: number, success: boolean): void {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    this.executionStatistics.totalExecuted++;
    this.executionStatistics.totalExecutionTime += executionTime;
    this.executionStatistics.averageExecutionTime = 
      this.executionStatistics.totalExecutionTime / this.executionStatistics.totalExecuted;
    
    if (success) {
      this.executionStatistics.successRate = 
        (this.executionStatistics.totalExecuted - this.executionStatistics.failureRate) / 
        this.executionStatistics.totalExecuted;
    } else {
      this.executionStatistics.failureRate++;
    }
  }
}
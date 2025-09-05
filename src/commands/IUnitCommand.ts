import type { UnitContext } from '../interfaces/IUnit';
import { container } from '../container/DiContainer';
import { TOKENS } from '../container/Tokens';

/**
 * Unit Command Interface
 * Defines the contract for unit commands
 */
export interface IUnitCommand {
  readonly id: string;
  execute(): boolean;
  undo(): boolean;
  canExecute(): boolean;
  getDescription(): string;
  getResult(): any;
  getError(): Error | null;
  setResult(result: any): void;
  setError(error: Error | null): void;
}

/**
 * Base Unit Command Implementation
 * Provides common functionality for unit commands using DI
 */
export abstract class BaseUnitCommand implements IUnitCommand {
  public readonly id: string;
  protected timestamp: Date;
  protected result?: any;
  protected error: Error | null = null;
  protected previousResult?: any;

  constructor(id: string) {
    this.id = id;
    this.timestamp = new Date();
  }

  abstract execute(): boolean;
  abstract undo(): boolean;
  abstract canExecute(): boolean;
  abstract getDescription(): string;

  getResult(): any {
    return this.result;
  }

  getError(): Error | null {
    return this.error;
  }

  setResult(result: any): void {
    this.previousResult = this.result;
    this.result = result;
  }

  setError(error: Error | null): void {
    this.error = error;
  }

  /**
   * Get command metadata
   */
  getMetadata(): {
    id: string;
    timestamp: Date;
    hasResult: boolean;
    hasError: boolean;
    canExecute: boolean;
  } {
    return {
      id: this.id,
      timestamp: this.timestamp,
      hasResult: this.result !== undefined,
      hasError: this.error !== null,
      canExecute: this.canExecute(),
    };
  }

  /**
   * Reset command state
   */
  reset(): void {
    this.result = undefined;
    this.error = null;
    this.previousResult = undefined;
  }

  /**
   * Check if command has been executed
   */
  isExecuted(): boolean {
    return this.result !== undefined;
  }

  /**
   * Check if command has errors
   */
  hasErrors(): boolean {
    return this.error !== null;
  }

  /**
   * Get execution timestamp
   */
  getTimestamp(): Date {
    return this.timestamp;
  }
}

/**
 * Unit Command Factory
 * Creates unit commands using DI
 */
export class UnitCommandFactory {
  /**
   * Create a position calculation command
   */
  static createPositionCommand(input: any, context: UnitContext): IUnitCommand {
    try {
      const PositionCommandClass = container.resolve(TOKENS.POSITION_COMMAND);
      return new PositionCommandClass(input, context);
    } catch (error) {
      throw new Error(`Failed to create position command: ${error}`);
    }
  }

  /**
   * Create a size calculation command
   */
  static createSizeCommand(input: any, context: UnitContext): IUnitCommand {
    try {
      const SizeCommandClass = container.resolve(TOKENS.SIZE_COMMAND);
      return new SizeCommandClass(input, context);
    } catch (error) {
      throw new Error(`Failed to create size command: ${error}`);
    }
  }

  /**
   * Create a scale calculation command
   */
  static createScaleCommand(input: any, context: UnitContext): IUnitCommand {
    try {
      const ScaleCommandClass = container.resolve(TOKENS.SCALE_COMMAND);
      return new ScaleCommandClass(input, context);
    } catch (error) {
      throw new Error(`Failed to create scale command: ${error}`);
    }
  }

  /**
   * Create a command by type
   */
  static createCommand(type: string, input: any, context: UnitContext): IUnitCommand {
    switch (type.toLowerCase()) {
      case 'position':
        return this.createPositionCommand(input, context);
      case 'size':
        return this.createSizeCommand(input, context);
      case 'scale':
        return this.createScaleCommand(input, context);
      default:
        throw new Error(`Unsupported command type: ${type}`);
    }
  }
}
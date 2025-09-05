import type { UnitContext } from '../interfaces/IUnit';

/**
 * Base interface for all unit commands
 * Follows Command Pattern for undoable operations
 */
export interface IUnitCommand {
  /** Unique identifier for the command */
  readonly id: string;

  /** Execute the command */
  execute(context: UnitContext): number;

  /** Undo the command */
  undo(): void;

  /** Check if the command can be executed */
  canExecute(): boolean;

  /** Get command description */
  getDescription(): string;
}

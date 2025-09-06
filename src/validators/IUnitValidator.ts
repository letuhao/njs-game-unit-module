import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';

/**
 * Unit Validator Interface
 * Defines the contract for unit validation operations
 */
export interface IUnitValidator {
  /**
   * Unique identifier for the validator
   */
  readonly id: string;

  /**
   * Name of the validator
   */
  readonly name: string;

  /**
   * Validate a unit
   * @param unit - The unit to validate
   * @param context - Context for validation
   * @returns True if valid, false otherwise
   */
  validate(unit: IUnit, context: UnitContext): boolean;

  /**
   * Get validation errors
   * @returns Array of error messages
   */
  getErrors(): string[];

  /**
   * Clear validation errors
   */
  clearErrors(): void;

  /**
   * Check if validator is enabled
   * @returns True if enabled, false otherwise
   */
  isEnabled(): boolean;

  /**
   * Enable or disable the validator
   * @param enabled - Whether to enable the validator
   */
  setEnabled(enabled: boolean): void;
}

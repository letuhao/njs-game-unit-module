import type { UnitContext } from '../IUnit';

/**
 * Interface for objects that can be validated
 * Segregated from IUnit to follow Interface Segregation Principle
 */
export interface IValidatable {
  /**
   * Validate if the object can be used in the given context
   * @param context - Context to validate against
   * @returns True if valid, false otherwise
   */
  validate(context: UnitContext): boolean;
}

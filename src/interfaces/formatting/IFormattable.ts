/**
 * Interface for objects that can be formatted as strings
 * Segregated from IUnit to follow Interface Segregation Principle
 */
export interface IFormattable {
  /**
   * Get a string representation of the object
   * @returns String representation
   */
  toString(): string;
}

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
  
  /**
   * Format the object with a specific format
   * @param format The format string
   * @returns Formatted string
   */
  format(format: string): string;
}

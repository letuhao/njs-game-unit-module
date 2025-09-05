import type { UnitContext } from '../IUnit';

/**
 * Interface for objects that can perform calculations
 * Segregated from IUnit to follow Interface Segregation Principle
 */
export interface ICalculatable {
  /**
   * Calculate the actual value based on context
   * @param context - Context information for calculation
   * @returns Calculated numeric value
   */
  calculate(context: UnitContext): number;

  /**
   * Check if the object is responsive (changes with context)
   * @returns True if responsive, false if static
   */
  isResponsive(): boolean;
}

/**
 * Interface for objects that have identity
 * Segregated from IUnit to follow Interface Segregation Principle
 */
export interface IIdentifiable {
  /**
   * Unique identifier for the object
   */
  readonly id: string;

  /**
   * Human-readable name for the object
   */
  readonly name: string;
}

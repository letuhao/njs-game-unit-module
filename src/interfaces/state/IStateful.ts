/**
 * Interface for objects that have state
 * Segregated from IUnit to follow Interface Segregation Principle
 */
export interface IStateful {
  /**
   * Whether this object is currently active/enabled
   */
  readonly isActive: boolean;
}

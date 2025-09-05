/**
 * Interface for objects that can be cloned
 * Segregated from IUnit to follow Interface Segregation Principle
 */
export interface ICloneable<T> {
  /**
   * Clone the object with optional modifications
   * @param overrides - Properties to override in the clone
   * @returns New object instance
   */
  clone(overrides?: Partial<T>): T;
}

/**
 * Random Value Interface
 * Defines the contract for random value generation
 */
export interface IRandomValue {
  /**
   * Generate a random value
   * @param min Minimum value
   * @param max Maximum value
   * @returns Random value between min and max
   */
  generate(min: number, max: number): number;

  /**
   * Generate a random integer
   * @param min Minimum value
   * @param max Maximum value
   * @returns Random integer between min and max
   */
  generateInt(min: number, max: number): number;

  /**
   * Generate a random boolean
   * @returns Random boolean value
   */
  generateBoolean(): boolean;

  /**
   * Generate a random value from an array
   * @param array Array to choose from
   * @returns Random element from array
   */
  generateFromArray<T>(array: T[]): T;

  /**
   * Set the seed for reproducible random values
   * @param seed Seed value
   */
  setSeed(seed: number): void;

  /**
   * Get the current seed
   * @returns Current seed value
   */
  getSeed(): number;
}

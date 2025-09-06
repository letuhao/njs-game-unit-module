import type { IRandomValue } from '../interfaces/IRandomValue';
import { container, TOKENS } from '../container/DiContainer';

/**
 * Concrete implementation of RandomValueNumber
 * Now part of the unit system for generating random values
 */
export class RandomValueNumber implements IRandomValue {
  constructor(
    public min: number,
    public max: number,
    public current: number = min
  ) {
    if (min > max) {
      throw new Error('min cannot be greater than max');
    }
    if (current < min || current > max) {
      this.current = min;
    }
  }

  getRandomValue(): number {
    this.current = Math.random() * (this.max - this.min) + this.min;
    return this.current;
  }

  setCurrentValue(value: number): void {
    if (value >= this.min && value <= this.max) {
      this.current = value;
    } else {
      throw new Error(`Value ${value} is outside the range [${this.min}, ${this.max}]`);
    }
  }

  /** Get a random integer value */
  getRandomInt(): number {
    this.current = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    return this.current;
  }

  /** Get a random value with specified decimal places */
  getRandomValueWithDecimals(decimals: number): number {
    const factor = Math.pow(10, decimals);
    this.current = Math.round((Math.random() * (this.max - this.min) + this.min) * factor) / factor;
    return this.current;
  }

  /** Generate a random value between min and max */
  generate(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /** Generate a random integer between min and max */
  generateInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Generate a random boolean */
  generateBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /** Generate a random value from an array */
  generateFromArray<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot generate from empty array');
    }
    return array[Math.floor(Math.random() * array.length)]!;
  }

  /** Set the seed for reproducible random values */
  setSeed(seed: number): void {
    // Simple seed implementation
    Math.random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
  }

  /** Get the current seed */
  getSeed(): number {
    return 0; // Simple implementation
  }

  /** Clone the random value with optional modifications */
  clone(overrides?: Partial<RandomValueNumber>): RandomValueNumber {
    return new RandomValueNumber(
      overrides?.min ?? this.min,
      overrides?.max ?? this.max,
      overrides?.current ?? this.current
    );
  }

  /** Validate if the random value is within bounds */
  validate(): boolean {
    return this.min <= this.max && this.current >= this.min && this.current <= this.max;
  }

  /** Get the range of possible values */
  getRange(): { min: number; max: number } {
    return { min: this.min, max: this.max };
  }

  /** Check if a value is within the valid range */
  isInRange(value: number): boolean {
    return value >= this.min && value <= this.max;
  }
}

/**
 * Factory function for creating RandomValueNumber instances via DI
 */
export function createRandomValueNumber(min: number, max: number, current?: number): RandomValueNumber {
  try {
    // Try to resolve from DI container first
    const RandomValueNumberClass = container.resolve(TOKENS.RANDOM_VALUE_NUMBER);
    return new (RandomValueNumberClass as any)(min, max, current);
  } catch (error) {
    // Fallback to direct instantiation
    return new RandomValueNumber(min, max, current);
  }
}

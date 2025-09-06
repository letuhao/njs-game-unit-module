/**
 * Default Values
 * Default values used throughout the unit system when calculations fail or no valid input is provided
 */

/**
 * Default fallback values for different unit types
 */
export const DEFAULT_FALLBACK_VALUES = {
  // Size-related defaults
  SIZE: {
    DEFAULT: 100,
    MIN: 1,
    MAX: 10000
  },
  POSITION: {
    DEFAULT: 0,
    MIN: -10000,
    MAX: 10000
  },
  SCALE: {
    DEFAULT: 1.0,
    MIN: 0.1,
    MAX: 10.0,
    RANDOM_MIN: 0.5,
    RANDOM_MAX: 2.0
  },
} as const;

/**
 * Default size values
 */
export const DEFAULT_SIZE_VALUES = {
  DEFAULT: 100,
  MIN: 1,
  MAX: 10000,
  CONTENT: 400,
  PARENT: 800,
  SCENE: 1200,
  VIEWPORT: 1200,
} as const;

/**
 * Default position values
 */
export const DEFAULT_POSITION_VALUES = {
  DEFAULT: 0,
  MIN: -10000,
  MAX: 10000,
  CENTER_OFFSET: 0,
  RANDOM_MIN: 0,
  RANDOM_MAX: 1000,
} as const;

/**
 * Default scale values
 */
export const DEFAULT_SCALE_VALUES = {
  DEFAULT: 1.0,
  MIN: 0.1,
  MAX: 10.0,
  FACTOR: 1.0,
  RANDOM_MIN: 0.5,
  RANDOM_MAX: 2.0,
} as const;

/**
 * Default performance values
 */
export const DEFAULT_PERFORMANCE_VALUES = {
  MEMORY_LIMIT: 0,
  MAX_CALCULATION_HISTORY: 100,
  ERROR_THRESHOLD: 0.1,
  TIMEOUT_MS: 5000,
} as const;

/**
 * Strategy priorities for different unit types
 */
export const STRATEGY_PRIORITIES = {
  PIXEL: 1,
  PERCENTAGE: 2,
  VIEWPORT: 3,
  PARENT: 4,
  AUTO: 5,
  FILL: 6,
  CONTENT: 7,
  SCENE: 8,
  RANDOM: 9,
  POSITION: 10,
  SCALE: 11
} as const;

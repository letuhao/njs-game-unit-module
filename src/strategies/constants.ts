/**
 * Strategy constants
 * Contains constants used across strategy implementations
 */

/**
 * Default fallback values for different unit types
 */
export const DEFAULT_FALLBACK_VALUES = {
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
    DEFAULT: 1,
    MIN: 0.1,
    MAX: 10
  },
  PIXEL: {
    DEFAULT: 1,
    MIN: 1,
    MAX: 10000
  },
  PERCENTAGE: {
    DEFAULT: 100,
    MIN: 0,
    MAX: 100
  },
  VIEWPORT: {
    DEFAULT: 1000,
    MIN: 100,
    MAX: 10000
  },
  PARENT: {
    DEFAULT: 100,
    MIN: 10,
    MAX: 10000
  }
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
  RANDOM: 9
} as const;

/**
 * Strategy validation thresholds
 */
export const VALIDATION_THRESHOLDS = {
  MIN_VALUE: 0,
  MAX_VALUE: 10000,
  MIN_PERCENTAGE: 0,
  MAX_PERCENTAGE: 100,
  MIN_SCALE: 0.1,
  MAX_SCALE: 10
} as const;

/**
 * Strategy performance metrics
 */
export const PERFORMANCE_METRICS = {
  MAX_EXECUTION_TIME: 1000, // ms
  MAX_MEMORY_USAGE: 50 * 1024 * 1024, // 50MB
  MAX_CACHE_SIZE: 1000,
  MAX_RETRY_ATTEMPTS: 3
} as const;

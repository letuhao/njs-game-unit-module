/**
 * Validation Constants
 * Constants related to validation logic, constraints, and error handling
 */

/**
 * Validation thresholds and limits
 */
export const VALIDATION_CONSTANTS = {
  MIN_STRING_LENGTH: 1,
  MAX_STRING_LENGTH: 1000,
  MIN_NUMBER_VALUE: Number.MIN_SAFE_INTEGER,
  MAX_NUMBER_VALUE: Number.MAX_SAFE_INTEGER,
  MIN_POSITIVE_NUMBER: 0.000001,
  MAX_DECIMAL_PLACES: 10,
} as const;

/**
 * Size validation constants
 */
export const SIZE_VALIDATION_CONSTANTS = {
  MIN_SIZE: 1,
  MAX_SIZE: 10000,
  MIN_PERCENTAGE: 0,
  MAX_PERCENTAGE: 100,
  MIN_PIXEL_VALUE: 0,
  MAX_PIXEL_VALUE: 10000,
} as const;

/**
 * Position validation constants
 */
export const POSITION_VALIDATION_CONSTANTS = {
  MIN_POSITION: -10000,
  MAX_POSITION: 10000,
  MIN_CENTER_OFFSET: -1000,
  MAX_CENTER_OFFSET: 1000,
  MIN_RANDOM_POSITION: 0,
  MAX_RANDOM_POSITION: 1000,
} as const;

/**
 * Scale validation constants
 */
export const SCALE_VALIDATION_CONSTANTS = {
  MIN_SCALE: 0.1,
  MAX_SCALE: 10.0,
  MIN_FACTOR: 0.01,
  MAX_FACTOR: 100.0,
  MIN_PERCENTAGE_SCALE: 0,
  MAX_PERCENTAGE_SCALE: 1000,
} as const;

/**
 * Error handling constants
 */
export const ERROR_HANDLING_CONSTANTS = {
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 100,
  ERROR_THRESHOLD: 0.1,
  TIMEOUT_MS: 5000,
  MAX_ERROR_COUNT: 10,
} as const;

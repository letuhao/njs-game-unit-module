/**
 * Calculation Constants
 * Constants related to calculation logic, algorithms, and mathematical operations
 */

/**
 * Mathematical constants used in calculations
 */
export const MATH_CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  GOLDEN_RATIO: 1.618033988749895,
  SQRT_2: Math.sqrt(2),
  SQRT_3: Math.sqrt(3),
} as const;

/**
 * Precision constants for floating-point calculations
 */
export const PRECISION_CONSTANTS = {
  DECIMAL_PLACES: 6,
  ROUNDING_THRESHOLD: 0.000001,
  FLOATING_POINT_EPSILON: Number.EPSILON,
} as const;

/**
 * Calculation strategy constants
 */
export const CALCULATION_STRATEGY_CONSTANTS = {
  WEIGHTED_AVERAGE_WEIGHTS: [0.4, 0.3, 0.2, 0.1],
  MEDIAN_THRESHOLD: 0.5,
  CUSTOM_CALCULATOR_PRIORITY: 1,
} as const;

/**
 * Performance calculation constants
 */
export const PERFORMANCE_CALCULATION_CONSTANTS = {
  CACHE_HIT_RATIO_THRESHOLD: 0.8,
  MEMORY_USAGE_THRESHOLD: 0.9,
  CALCULATION_TIME_THRESHOLD: 100, // ms
  BATCH_SIZE_THRESHOLD: 1000,
} as const;

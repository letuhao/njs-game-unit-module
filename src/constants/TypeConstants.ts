/**
 * Type Constants
 * Constants related to type definitions, enums, and type safety
 */

/**
 * Unit type constants
 */
export const UNIT_TYPE_CONSTANTS = {
  SIZE: 'size',
  POSITION: 'position',
  SCALE: 'scale',
} as const;

/**
 * Dimension type constants
 */
export const DIMENSION_TYPE_CONSTANTS = {
  WIDTH: 'width',
  HEIGHT: 'height',
  X: 'x',
  Y: 'y',
  BOTH: 'both',
  XY: 'xy',
} as const;

/**
 * Size unit type constants
 */
export const SIZE_UNIT_TYPE_CONSTANTS = {
  PIXEL: 'pixel',
  PERCENTAGE: 'percentage',
  PARENT_WIDTH: 'parent-width',
  PARENT_HEIGHT: 'parent-height',
  VIEWPORT_WIDTH: 'viewport-width',
  VIEWPORT_HEIGHT: 'viewport-height',
  AUTO: 'auto',
  FILL: 'fill',
} as const;

/**
 * Position unit type constants
 */
export const POSITION_UNIT_TYPE_CONSTANTS = {
  PIXEL: 'pixel',
  PERCENTAGE: 'percentage',
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  RANDOM: 'random',
} as const;

/**
 * Scale unit type constants
 */
export const SCALE_UNIT_TYPE_CONSTANTS = {
  FACTOR: 'factor',
  PERCENTAGE: 'percentage',
  PIXEL: 'pixel',
  AUTO: 'auto',
} as const;

/**
 * Calculation strategy type constants
 */
export const CALCULATION_STRATEGY_TYPE_CONSTANTS = {
  SUM: 'sum',
  AVERAGE: 'average',
  MIN: 'min',
  MAX: 'max',
  MEDIAN: 'median',
  WEIGHTED_AVERAGE: 'weighted-average',
  CUSTOM: 'custom',
} as const;

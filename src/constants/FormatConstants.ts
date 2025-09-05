/**
 * Format Constants
 * Constants related to formatting, display, and string operations
 */

/**
 * Number formatting constants
 */
export const NUMBER_FORMAT_CONSTANTS = {
  DECIMAL_PLACES: 2,
  THOUSAND_SEPARATOR: ',',
  DECIMAL_SEPARATOR: '.',
  CURRENCY_SYMBOL: '$',
  PERCENTAGE_SYMBOL: '%',
} as const;

/**
 * String formatting constants
 */
export const STRING_FORMAT_CONSTANTS = {
  MAX_DISPLAY_LENGTH: 50,
  ELLIPSIS: '...',
  PREFIX_SEPARATOR: '-',
  SUFFIX_SEPARATOR: '_',
} as const;

/**
 * Unit formatting constants
 */
export const UNIT_FORMAT_CONSTANTS = {
  PIXEL_SUFFIX: 'px',
  PERCENTAGE_SUFFIX: '%',
  FACTOR_SUFFIX: 'x',
  DEGREE_SUFFIX: '°',
  RADIAN_SUFFIX: 'rad',
} as const;

/**
 * Display constants
 */
export const DISPLAY_CONSTANTS = {
  MAX_TOOLTIP_LENGTH: 100,
  MAX_LABEL_LENGTH: 30,
  MAX_DESCRIPTION_LENGTH: 200,
  INDENT_SIZE: 2,
  TAB_SIZE: 4,
} as const;

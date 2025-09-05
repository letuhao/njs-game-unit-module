/**
 * Default fallback values for the unit system
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
  }
} as const;

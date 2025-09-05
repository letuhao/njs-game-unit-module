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
  },
  PERFORMANCE: {
    ERROR_THRESHOLD: 100,
    DEFAULT_MEMORY_LIMIT: 1000
  }
} as const;

/**
 * Command constants for command management
 */
export const COMMAND_CONSTANTS = {
  HISTORY: {
    DEFAULT_INDEX: -1
  },
  METRICS: {
    MAX_EXECUTION_TIMES: 100
  }
} as const;

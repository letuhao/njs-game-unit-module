/**
 * Constants Index
 * Centralized export of all constants organized by responsibility
 */

// Calculation constants
export * from './CalculationConstants';

// Validation constants
export * from './ValidationConstants';

// Format constants
export * from './FormatConstants';

// Type constants
export * from './TypeConstants';

// Default values
export * from './DefaultValues';

// Re-export commonly used constants for backward compatibility
export { DEFAULT_FALLBACK_VALUES } from './DefaultValues';
export { VALIDATION_CONSTANTS } from './ValidationConstants';
export { MATH_CONSTANTS } from './CalculationConstants';
export { NUMBER_FORMAT_CONSTANTS } from './FormatConstants';
export { UNIT_TYPE_CONSTANTS } from './TypeConstants';
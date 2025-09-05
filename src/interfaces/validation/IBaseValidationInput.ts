/**
 * Base Validation Input Interface
 * Provides common properties that all validation inputs should have
 */
export interface IBaseValidationInput {
  /** Unique identifier for the input */
  id?: string;

  /** Whether the input is valid */
  isValid?: boolean;

  /** Custom metadata for the input */
  metadata?: Record<string, string | number | boolean>;
}

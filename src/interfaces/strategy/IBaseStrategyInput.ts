/**
 * Base Strategy Input Interface
 * Represents the common structure of strategy inputs
 */

/**
 * Base strategy input interface
 * Contains common properties shared by all strategy input types
 */
export interface IBaseStrategyInput {
  /** Unique identifier for the strategy input */
  id?: string;

  /** Human-readable name for the strategy input */
  name?: string;

  /** Strategy input type */
  type?: string;

  /** Whether the strategy input is valid */
  isValid?: boolean;

  /** Custom metadata for the strategy input */
  metadata?: Record<string, string | number | boolean>;
}

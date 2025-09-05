/**
 * Base Legacy Unit Interface
 * Represents the common structure of legacy unit objects
 */

/**
 * Base legacy unit interface
 * Contains common properties shared by all legacy unit types
 */
export interface IBaseLegacyUnit {
  /** Unique identifier for the legacy unit */
  id?: string;

  /** Human-readable name for the legacy unit */
  name?: string;

  /** Legacy unit type */
  type?: string;

  /** Legacy unit constructor name */
  constructor?: {
    name: string;
  };

  /** Whether the legacy unit is valid */
  isValid?: boolean;

  /** Custom metadata for the legacy unit */
  metadata?: Record<string, string | number | boolean>;
}

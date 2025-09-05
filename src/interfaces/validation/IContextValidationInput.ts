import { Dimension } from '../../enums/Dimension';
import { IBaseValidationInput } from './IBaseValidationInput';

/**
 * Context Validation Input Interface
 * For inputs that represent context objects
 */
export interface IContextValidationInput extends IBaseValidationInput {
  /** The context object to validate */
  context: Record<string, unknown>;

  /** Required properties for validation */
  requiredProperties?: string[];

  /** Optional properties for validation */
  optionalProperties?: string[];

  /** Dimension to apply validation to */
  dimension?: Dimension;

  /** Whether to validate nested objects */
  validateNested?: boolean;
}

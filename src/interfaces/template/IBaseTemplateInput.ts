import { TemplateInputType } from '../../enums/TemplateInputType';

/**
 * Base Template Input Interface
 * Provides common properties that all template inputs should have
 */
export interface IBaseTemplateInput {
  /** Unique identifier for the input */
  id?: string;

  /** Type of the input */
  type: TemplateInputType;

  /** Whether the input is valid */
  isValid?: boolean;

  /** Custom metadata for the input */
  metadata?: Record<string, string | number | boolean>;
}

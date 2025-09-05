import { ISizeTemplateInput } from './ISizeTemplateInput';
import { IPositionTemplateInput } from './IPositionTemplateInput';
import { IScaleTemplateInput } from './IScaleTemplateInput';

/**
 * Union type for all template input types
 * Used in template methods to accept any valid template input type
 */
export type ITemplateInput = ISizeTemplateInput | IPositionTemplateInput | IScaleTemplateInput;

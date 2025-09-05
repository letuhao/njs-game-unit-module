import { IUnitValidationInput } from './IUnitValidationInput';
import { IValueValidationInput } from './IValueValidationInput';
import { IContextValidationInput } from './IContextValidationInput';

/**
 * Union type for all validation input types
 * Used in validation methods to accept any valid validation input type
 */
export type IValidationInput = IUnitValidationInput | IValueValidationInput | IContextValidationInput;

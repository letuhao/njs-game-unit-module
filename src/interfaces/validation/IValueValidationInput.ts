import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { PositionValue } from '../../enums/PositionValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { Dimension } from '../../enums/Dimension';
import { ValidationType } from '../../enums/ValidationType';
import { IBaseValidationInput } from './IBaseValidationInput';

/**
 * Value Validation Input Interface
 * For inputs that represent numeric values
 */
export interface IValueValidationInput extends IBaseValidationInput {
  /** The numeric value to validate */
  value: number;

  /** Unit type for validation */
  unitType?: SizeUnit | PositionUnit | ScaleUnit;

  /** Value type for validation */
  valueType?: SizeValue | PositionValue | ScaleValue;

  /** Dimension to apply validation to */
  dimension?: Dimension;

  /** Validation type */
  validationType?: ValidationType;

  /** Minimum value constraint */
  minValue?: number;

  /** Maximum value constraint */
  maxValue?: number;

  /** Value constraints */
  constraints?: {
    min?: number;
    max?: number;
  };
}

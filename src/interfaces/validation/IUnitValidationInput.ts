import { UnitType } from '../../enums/UnitType';
import { Dimension } from '../../enums/Dimension';
import { IUnit } from '../IUnit';
import { IBaseValidationInput } from './IBaseValidationInput';

/**
 * Unit Validation Input Interface
 * For inputs that represent unit objects
 */
export interface IUnitValidationInput extends IBaseValidationInput {
  /** The unit object to validate */
  unit: IUnit;

  /** Unit type for validation */
  unitType: UnitType;

  /** Dimension to apply validation to */
  dimension?: Dimension;

  /** Whether to validate recursively */
  validateRecursively?: boolean;
}

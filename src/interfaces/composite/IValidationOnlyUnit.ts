import type { UnitType } from '../../enums/UnitType';
import type { IIdentifiable } from '../identity/IIdentifiable';
import type { IValidatable } from '../validation/IValidatable';

/**
 * Unit interface for validation-only functionality
 * Combines identity and validation interfaces
 */
export interface IValidationOnlyUnit extends 
  IIdentifiable,
  IValidatable {
  /**
   * Unit type (size, position, scale)
   */
  readonly unitType: UnitType;
}

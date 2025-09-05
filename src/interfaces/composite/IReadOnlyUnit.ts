import type { UnitType } from '../../enums/UnitType';
import type { IIdentifiable } from '../identity/IIdentifiable';
import type { ICalculatable } from '../calculation/ICalculatable';
import type { IValidatable } from '../validation/IValidatable';
import type { IFormattable } from '../formatting/IFormattable';

/**
 * Read-only unit interface for immutable units
 * Combines identity, calculation, validation, and formatting interfaces
 */
export interface IReadOnlyUnit extends 
  IIdentifiable,
  ICalculatable,
  IValidatable,
  IFormattable {
  /**
   * Unit type (size, position, scale)
   */
  readonly unitType: UnitType;
}

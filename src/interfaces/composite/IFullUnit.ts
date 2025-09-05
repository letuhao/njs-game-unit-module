import type { UnitType } from '../../enums/UnitType';
import type { IIdentifiable } from '../identity/IIdentifiable';
import type { ICalculatable } from '../calculation/ICalculatable';
import type { IValidatable } from '../validation/IValidatable';
import type { IFormattable } from '../formatting/IFormattable';
import type { ICloneable } from '../cloning/ICloneable';
import type { IStateful } from '../state/IStateful';

/**
 * Full unit interface with all capabilities
 * Combines all segregated interfaces for complete functionality
 */
export interface IFullUnit extends 
  IIdentifiable,
  ICalculatable,
  IValidatable,
  IFormattable,
  ICloneable<IFullUnit>,
  IStateful {
  /**
   * Unit type (size, position, scale)
   */
  readonly unitType: UnitType;
}

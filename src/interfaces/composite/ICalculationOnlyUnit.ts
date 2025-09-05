import type { UnitType } from '../../enums/UnitType';
import type { IIdentifiable } from '../identity/IIdentifiable';
import type { ICalculatable } from '../calculation/ICalculatable';

/**
 * Unit interface for calculation-only functionality
 * Combines identity and calculation interfaces
 */
export interface ICalculationOnlyUnit extends 
  IIdentifiable,
  ICalculatable {
  /**
   * Unit type (size, position, scale)
   */
  readonly unitType: UnitType;
}

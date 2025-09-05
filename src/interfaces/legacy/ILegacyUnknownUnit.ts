import { UnitType } from '../../enums/UnitType';
import { IBaseLegacyUnit } from './IBaseLegacyUnit';

/**
 * Legacy Unknown Unit Interface
 * Represents legacy units that don't match known patterns
 */
export interface ILegacyUnknownUnit extends IBaseLegacyUnit {
  /** Legacy unit data */
  data: Record<string, unknown>;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy unit properties */
  properties?: Record<string, unknown>;
}

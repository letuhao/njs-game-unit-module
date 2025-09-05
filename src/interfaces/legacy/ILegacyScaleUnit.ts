import { UnitType } from '../../enums/UnitType';
import { IBaseLegacyUnit } from './IBaseLegacyUnit';

/**
 * Legacy Scale Unit Interface
 * Represents legacy scale-related unit objects
 */
export interface ILegacyScaleUnit extends IBaseLegacyUnit {
  /** Legacy scale value */
  scale?: number;

  /** Legacy scale factor */
  factor?: number;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy scale unit */
  scaleUnit?: string;

  /** Legacy base value */
  baseValue?: number;

  /** Legacy minimum scale */
  minScale?: number;

  /** Legacy maximum scale */
  maxScale?: number;
}

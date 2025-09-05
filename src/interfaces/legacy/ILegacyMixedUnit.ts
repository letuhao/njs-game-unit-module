import { UnitType } from '../../enums/UnitType';
import { IBaseLegacyUnit } from './IBaseLegacyUnit';
import { ILegacySizeUnit } from './ILegacySizeUnit';
import { ILegacyPositionUnit } from './ILegacyPositionUnit';
import { ILegacyScaleUnit } from './ILegacyScaleUnit';

/**
 * Legacy Mixed Unit Interface
 * Represents legacy units with multiple properties
 */
export interface ILegacyMixedUnit extends IBaseLegacyUnit {
  /** Legacy size properties */
  size?: Partial<ILegacySizeUnit>;

  /** Legacy position properties */
  position?: Partial<ILegacyPositionUnit>;

  /** Legacy scale properties */
  scale?: Partial<ILegacyScaleUnit>;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy base values */
  baseValues?: Record<string, number>;
}

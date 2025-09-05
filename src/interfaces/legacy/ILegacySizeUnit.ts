import { UnitType } from '../../enums/UnitType';
import { Dimension } from '../../enums/Dimension';
import { IBaseLegacyUnit } from './IBaseLegacyUnit';

/**
 * Legacy Size Unit Interface
 * Represents legacy size-related unit objects
 */
export interface ILegacySizeUnit extends IBaseLegacyUnit {
  /** Legacy size value */
  size?: number;

  /** Legacy width value */
  width?: number;

  /** Legacy height value */
  height?: number;

  /** Legacy dimension */
  dimension?: string | Dimension;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy size unit */
  sizeUnit?: string;

  /** Legacy base value */
  baseValue?: number;

  /** Legacy minimum size */
  minSize?: number;

  /** Legacy maximum size */
  maxSize?: number;
}

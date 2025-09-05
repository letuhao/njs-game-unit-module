import { UnitType } from '../../enums/UnitType';
import { Dimension } from '../../enums/Dimension';
import { IBaseLegacyUnit } from './IBaseLegacyUnit';

/**
 * Legacy Position Unit Interface
 * Represents legacy position-related unit objects
 */
export interface ILegacyPositionUnit extends IBaseLegacyUnit {
  /** Legacy position value */
  position?: number;

  /** Legacy X coordinate */
  x?: number;

  /** Legacy Y coordinate */
  y?: number;

  /** Legacy axis */
  axis?: string | Dimension;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy position unit */
  positionUnit?: string;

  /** Legacy base value */
  baseValue?: number;

  /** Legacy offset */
  offset?: number;
}

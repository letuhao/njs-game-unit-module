import { ILegacySizeUnit } from './ILegacySizeUnit';
import { ILegacyPositionUnit } from './ILegacyPositionUnit';
import { ILegacyScaleUnit } from './ILegacyScaleUnit';
import { ILegacyMixedUnit } from './ILegacyMixedUnit';
import { ILegacyUnknownUnit } from './ILegacyUnknownUnit';

/**
 * Union type for all legacy unit types
 * Used in adapter methods to accept any valid legacy unit type
 */
export type ILegacyUnit =
  | ILegacySizeUnit
  | ILegacyPositionUnit
  | ILegacyScaleUnit
  | ILegacyMixedUnit
  | ILegacyUnknownUnit;

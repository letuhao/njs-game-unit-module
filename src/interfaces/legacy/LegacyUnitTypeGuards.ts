import { ILegacySizeUnit } from './ILegacySizeUnit';
import { ILegacyPositionUnit } from './ILegacyPositionUnit';
import { ILegacyScaleUnit } from './ILegacyScaleUnit';
import { ILegacyMixedUnit } from './ILegacyMixedUnit';
import { ILegacyUnknownUnit } from './ILegacyUnknownUnit';
import { ILegacyUnit } from './ILegacyUnitTypes';

/**
 * Type guard to check if input is a legacy size unit
 */
export function isLegacySizeUnit(input: unknown): input is ILegacySizeUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacySizeUnit;
  return (
    'size' in legacyUnit ||
    'width' in legacyUnit ||
    'height' in legacyUnit ||
    'sizeUnit' in legacyUnit
  );
}

/**
 * Type guard to check if input is a legacy position unit
 */
export function isLegacyPositionUnit(input: unknown): input is ILegacyPositionUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyPositionUnit;
  return (
    'position' in legacyUnit ||
    'x' in legacyUnit ||
    'y' in legacyUnit ||
    'positionUnit' in legacyUnit
  );
}

/**
 * Type guard to check if input is a legacy scale unit
 */
export function isLegacyScaleUnit(input: unknown): input is ILegacyScaleUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyScaleUnit;
  return 'scale' in legacyUnit || 'factor' in legacyUnit || 'scaleUnit' in legacyUnit;
}

/**
 * Type guard to check if input is a legacy mixed unit
 */
export function isLegacyMixedUnit(input: unknown): input is ILegacyMixedUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyMixedUnit;
  return 'size' in legacyUnit || 'position' in legacyUnit || 'scale' in legacyUnit;
}

/**
 * Type guard to check if input is a legacy unknown unit
 */
export function isLegacyUnknownUnit(input: unknown): input is ILegacyUnknownUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyUnknownUnit;
  return 'data' in legacyUnit;
}

/**
 * Type guard to check if input is any type of legacy unit
 */
export function isLegacyUnit(input: unknown): input is ILegacyUnit {
  return (
    isLegacySizeUnit(input) ||
    isLegacyPositionUnit(input) ||
    isLegacyScaleUnit(input) ||
    isLegacyMixedUnit(input) ||
    isLegacyUnknownUnit(input)
  );
}

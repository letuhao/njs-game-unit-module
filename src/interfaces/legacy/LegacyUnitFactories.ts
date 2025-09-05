import { ILegacySizeUnit } from './ILegacySizeUnit';
import { ILegacyPositionUnit } from './ILegacyPositionUnit';
import { ILegacyScaleUnit } from './ILegacyScaleUnit';
import { ILegacyMixedUnit } from './ILegacyMixedUnit';
import { ILegacyUnknownUnit } from './ILegacyUnknownUnit';

/**
 * Factory function to create legacy size unit
 */
export function createLegacySizeUnit(
  options?: Partial<Omit<ILegacySizeUnit, 'id'>>
): ILegacySizeUnit {
  return {
    id: `legacy-size-${Date.now()}`,
    name: options?.name || 'Legacy Size Unit',
    type: options?.type || 'size',
    unitType: options?.unitType || 'size',
    sizeUnit: options?.sizeUnit || 'pixel',
    size: options?.size || 100,
    width: options?.width || 100,
    height: options?.height || 100,
    dimension: options?.dimension || 'width',
    baseValue: options?.baseValue || 100,
    minSize: options?.minSize || 1,
    maxSize: options?.maxSize || 10000,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create legacy position unit
 */
export function createLegacyPositionUnit(
  options?: Partial<Omit<ILegacyPositionUnit, 'id'>>
): ILegacyPositionUnit {
  return {
    id: `legacy-position-${Date.now()}`,
    name: options?.name || 'Legacy Position Unit',
    type: options?.type || 'position',
    unitType: options?.unitType || 'position',
    positionUnit: options?.positionUnit || 'pixel',
    position: options?.position || 0,
    x: options?.x || 0,
    y: options?.y || 0,
    axis: options?.axis || 'x',
    baseValue: options?.baseValue || 0,
    offset: options?.offset || 0,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create legacy scale unit
 */
export function createLegacyScaleUnit(
  options?: Partial<Omit<ILegacyScaleUnit, 'id'>>
): ILegacyScaleUnit {
  return {
    id: `legacy-scale-${Date.now()}`,
    name: options?.name || 'Legacy Scale Unit',
    type: options?.type || 'scale',
    unitType: options?.unitType || 'scale',
    scaleUnit: options?.scaleUnit || 'factor',
    scale: options?.scale || 1.0,
    factor: options?.factor || 1.0,
    baseValue: options?.baseValue || 1.0,
    minScale: options?.minScale || 0.1,
    maxScale: options?.maxScale || 10.0,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create legacy mixed unit
 */
export function createLegacyMixedUnit(
  options?: Partial<Omit<ILegacyMixedUnit, 'id'>>
): ILegacyMixedUnit {
  return {
    id: `legacy-mixed-${Date.now()}`,
    name: options?.name || 'Legacy Mixed Unit',
    type: options?.type || 'mixed',
    unitType: options?.unitType || 'mixed',
    size: options?.size || {},
    position: options?.position || {},
    scale: options?.scale || {},
    baseValues: options?.baseValues || {},
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create legacy unknown unit
 */
export function createLegacyUnknownUnit(
  options?: Partial<Omit<ILegacyUnknownUnit, 'id'>>
): ILegacyUnknownUnit {
  return {
    id: `legacy-unknown-${Date.now()}`,
    name: options?.name || 'Legacy Unknown Unit',
    type: options?.type || 'unknown',
    unitType: options?.unitType || 'unknown',
    data: options?.data || {},
    properties: options?.properties || {},
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

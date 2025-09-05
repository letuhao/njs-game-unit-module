import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { PositionValue } from '../../enums/PositionValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { Dimension } from '../../enums/Dimension';
import { UnitType } from '../../enums/UnitType';
import { ValidationType } from '../../enums/ValidationType';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';
import { IUnitValidationInput } from './IUnitValidationInput';
import { IValueValidationInput } from './IValueValidationInput';
import { IContextValidationInput } from './IContextValidationInput';

/**
 * Factory function to create unit validation input
 */
export function createUnitValidationInput(
  unit: any,
  unitType: UnitType,
  options?: Partial<Omit<IUnitValidationInput, 'unit' | 'unitType'>>
): IUnitValidationInput {
  return {
    id: options?.id || `unit-validation-${Date.now()}`,
    unit,
    unitType,
    dimension: options?.dimension,
    validateRecursively: options?.validateRecursively || false,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create value validation input
 */
export function createValueValidationInput(
  value: number,
  options?: Partial<Omit<IValueValidationInput, 'value'>>
): IValueValidationInput {
  return {
    id: options?.id || `value-validation-${Date.now()}`,
    value,
    unitType: options?.unitType || SizeUnit.PIXEL,
    valueType: options?.valueType || SizeValue.PIXEL,
    dimension: options?.dimension || Dimension.WIDTH,
    validationType: options?.validationType || ValidationType.RANGE,
    minValue: options?.minValue,
    maxValue: options?.maxValue,
    constraints: options?.constraints,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create context validation input
 */
export function createContextValidationInput(
  context: Record<string, unknown>,
  options?: Partial<Omit<IContextValidationInput, 'context'>>
): IContextValidationInput {
  return {
    id: options?.id || `context-validation-${Date.now()}`,
    context,
    requiredProperties: options?.requiredProperties || [],
    optionalProperties: options?.optionalProperties || [],
    dimension: options?.dimension,
    validateNested: options?.validateNested || false,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

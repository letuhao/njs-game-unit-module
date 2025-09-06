import { DEFAULT_FALLBACK_VALUES } from '../../constants';
import { createSizeStrategyInput } from './StrategyInputFactories';
import { IStrategyInput } from './IStrategyInputTypes';

/**
 * Strategy input support for backward compatibility
 * Converts old input types to new strategy input interfaces
 */
export function convertToStrategyInput(input: unknown): IStrategyInput {
  if (!input || typeof input !== 'object') {
    return createSizeStrategyInput({ value: DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT });
  }

  // Handle primitive types
  if (typeof input === 'number') {
    return createSizeStrategyInput({ value: input });
  }

  if (typeof input === 'string') {
    return createSizeStrategyInput({ sizeString: input });
  }

  // Handle object types
  const inputObj = input as Record<string, unknown>;

  // Check for size-related properties
  if ('size' in inputObj || 'width' in inputObj || 'height' in inputObj || 'sizeUnit' in inputObj) {
    return createSizeStrategyInput({
      value: inputObj.value as number,
      dimension: inputObj.dimension as any,
      unit: inputObj.unit as any,
      valueType: inputObj.valueType as any,
      sizeString: inputObj.sizeString as string,
      sizeArray: inputObj.sizeArray as any[],
      constraints: inputObj.constraints as any,
    });
  }

  // Check for position-related properties
  if ('position' in inputObj || 'x' in inputObj || 'y' in inputObj || 'positionUnit' in inputObj) {
    return createSizeStrategyInput({
      value: inputObj.value as number,
      dimension: inputObj.axis as any,
      unit: inputObj.unit as any,
      valueType: inputObj.valueType as any,
      sizeString: inputObj.positionString as string,
      sizeArray: inputObj.positionArray as any[],
      constraints: inputObj.constraints as any,
    });
  }

  // Check for scale-related properties
  if ('scale' in inputObj || 'factor' in inputObj || 'scaleUnit' in inputObj) {
    return createSizeStrategyInput({
      value: inputObj.value as number,
      dimension: inputObj.dimension as any,
      unit: inputObj.unit as any,
      valueType: inputObj.valueType as any,
      sizeString: inputObj.scaleString as string,
      sizeArray: inputObj.scaleArray as any[],
      constraints: inputObj.constraints as any,
    });
  }

  // Default to size strategy input
  return createSizeStrategyInput({ value: DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT });
}

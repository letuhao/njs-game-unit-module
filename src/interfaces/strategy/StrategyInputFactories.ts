import { SizeValue } from '../../enums/SizeValue';
import { SizeUnit } from '../../enums/SizeUnit';
import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { Dimension } from '../../enums/Dimension';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';
import { ISizeStrategyInput } from './ISizeStrategyInput';
import { IPositionStrategyInput } from './IPositionStrategyInput';
import { IScaleStrategyInput } from './IScaleStrategyInput';

/**
 * Factory function to create size strategy input
 */
export function createSizeStrategyInput(options?: Partial<ISizeStrategyInput>): ISizeStrategyInput {
  return {
    id: options?.id || `size-strategy-${Date.now()}`,
    name: options?.name || 'Size Strategy Input',
    type: options?.type || 'size',
    value: options?.value ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT,
    dimension: options?.dimension || Dimension.WIDTH,
    unit: options?.unit || SizeUnit.PIXEL,
    valueType: options?.valueType || SizeValue.PIXEL,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...(options?.sizeString !== undefined && { sizeString: options.sizeString }),
    ...(options?.sizeArray !== undefined && { sizeArray: options.sizeArray }),
    ...(options?.constraints !== undefined && { constraints: options.constraints }),
  };
}

/**
 * Factory function to create position strategy input
 */
export function createPositionStrategyInput(options?: Partial<IPositionStrategyInput>): IPositionStrategyInput {
  return {
    id: options?.id || `position-strategy-${Date.now()}`,
    name: options?.name || 'Position Strategy Input',
    type: options?.type || 'position',
    value: options?.value ?? DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT,
    axis: options?.axis || Dimension.X,
    unit: options?.unit || PositionUnit.PIXEL,
    valueType: options?.valueType || PositionValue.PIXEL,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...(options?.positionString !== undefined && { positionString: options.positionString }),
    ...(options?.positionArray !== undefined && { positionArray: options.positionArray }),
    ...(options?.constraints !== undefined && { constraints: options.constraints }),
  };
}

/**
 * Factory function to create scale strategy input
 */
export function createScaleStrategyInput(options?: Partial<IScaleStrategyInput>): IScaleStrategyInput {
  return {
    id: options?.id || `scale-strategy-${Date.now()}`,
    name: options?.name || 'Scale Strategy Input',
    type: options?.type || 'scale',
    value: options?.value ?? DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT,
    unit: options?.unit || ScaleUnit.FACTOR,
    valueType: options?.valueType || ScaleValue.FACTOR,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...(options?.scaleString !== undefined && { scaleString: options.scaleString }),
    ...(options?.scaleArray !== undefined && { scaleArray: options.scaleArray }),
    ...(options?.constraints !== undefined && { constraints: options.constraints }),
  };
}

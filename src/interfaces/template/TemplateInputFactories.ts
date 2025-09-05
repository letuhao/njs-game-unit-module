import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { PositionValue } from '../../enums/PositionValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { Dimension } from '../../enums/Dimension';
// TemplateInputType enum not found, using string literals instead
import { DEFAULT_FALLBACK_VALUES } from '../../constants';
import { ISizeTemplateInput } from './ISizeTemplateInput';
import { IPositionTemplateInput } from './IPositionTemplateInput';
import { IScaleTemplateInput } from './IScaleTemplateInput';

/**
 * Factory function to create size template input
 */
export function createSizeTemplateInput(options?: Partial<Omit<ISizeTemplateInput, 'type'>>): ISizeTemplateInput {
  return {
    id: options?.id || `size-template-${Date.now()}`,
    type: 'SIZE' as any,
    unit: options?.unit || SizeUnit.PIXEL,
    value: options?.value ?? DEFAULT_FALLBACK_VALUES.SIZE,
    dimension: options?.dimension || Dimension.WIDTH,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minSize: options?.minSize,
    maxSize: options?.maxSize,
    constraints: options?.constraints,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create position template input
 */
export function createPositionTemplateInput(options?: Partial<Omit<IPositionTemplateInput, 'type'>>): IPositionTemplateInput {
  return {
    id: options?.id || `position-template-${Date.now()}`,
    type: 'POSITION' as any,
    unit: options?.unit || PositionUnit.PIXEL,
    value: options?.value ?? DEFAULT_FALLBACK_VALUES.POSITION,
    axis: options?.axis || Dimension.X,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minPosition: options?.minPosition,
    maxPosition: options?.maxPosition,
    constraints: options?.constraints,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

/**
 * Factory function to create scale template input
 */
export function createScaleTemplateInput(options?: Partial<Omit<IScaleTemplateInput, 'type'>>): IScaleTemplateInput {
  return {
    id: options?.id || `scale-template-${Date.now()}`,
    type: 'SCALE' as any,
    unit: options?.unit || ScaleUnit.PIXEL,
    value: options?.value ?? DEFAULT_FALLBACK_VALUES.SCALE,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minScale: options?.minScale,
    maxScale: options?.maxScale,
    constraints: options?.constraints,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata || {},
    ...options,
  };
}

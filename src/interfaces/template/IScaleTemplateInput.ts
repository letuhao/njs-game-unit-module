import { ScaleUnit } from '../../enums/ScaleUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { TemplateInputType } from '../../enums/TemplateInputType';
import { IBaseTemplateInput } from './IBaseTemplateInput';

/**
 * Scale Template Input Interface
 * Input for scale calculations
 */
export interface IScaleTemplateInput extends IBaseTemplateInput {
  type: TemplateInputType.SCALE;

  /** Scale unit type */
  unit: ScaleUnit;

  /** Scale value */
  value: number | ScaleValue;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Minimum scale constraint */
  minScale?: number;

  /** Maximum scale constraint */
  maxScale?: number;

  /** Scale constraints */
  constraints?: {
    min?: number;
    max?: number;
  };
}

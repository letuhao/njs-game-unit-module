import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { Dimension } from '../../enums/Dimension';
import { TemplateInputType } from '../../enums/TemplateInputType';
import { IBaseTemplateInput } from './IBaseTemplateInput';

/**
 * Size Template Input Interface
 * Input for size calculations
 */
export interface ISizeTemplateInput extends IBaseTemplateInput {
  type: TemplateInputType.SIZE;

  /** Size unit type */
  unit: SizeUnit;

  /** Size value */
  value: number | SizeValue;

  /** Dimension to apply the size to */
  dimension?: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Minimum size constraint */
  minSize?: number;

  /** Maximum size constraint */
  maxSize?: number;

  /** Size constraints */
  constraints?: {
    min?: number;
    max?: number;
  };
}

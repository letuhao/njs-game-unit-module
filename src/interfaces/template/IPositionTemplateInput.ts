import { PositionUnit } from '../../enums/PositionUnit';
import { PositionValue } from '../../enums/PositionValue';
import { Dimension } from '../../enums/Dimension';
import { TemplateInputType } from '../../enums/TemplateInputType';
import { IBaseTemplateInput } from './IBaseTemplateInput';

/**
 * Position Template Input Interface
 * Input for position calculations
 */
export interface IPositionTemplateInput extends IBaseTemplateInput {
  type: TemplateInputType.POSITION;

  /** Position unit type */
  unit: PositionUnit;

  /** Position value */
  value: number | PositionValue;

  /** Axis to apply the position to */
  axis?: Dimension.X | Dimension.Y | Dimension.XY;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Minimum position constraint */
  minPosition?: number;

  /** Maximum position constraint */
  maxPosition?: number;

  /** Position constraints */
  constraints?: {
    min?: number;
    max?: number;
  };
}

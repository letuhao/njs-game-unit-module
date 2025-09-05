import { ScaleValue } from '../../enums/ScaleValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { IBaseStrategyInput } from './IBaseStrategyInput';

/**
 * Scale Strategy Input Interface
 * Represents scale-related strategy inputs
 */
export interface IScaleStrategyInput extends IBaseStrategyInput {
  /** Scale value */
  value?: number | string | ScaleValue | ScaleUnit;

  /** Scale unit */
  unit?: ScaleUnit;

  /** Scale value type */
  valueType?: ScaleValue;

  /** Parent scale reference */
  parentScale?: {
    getValue(parent: unknown): number;
  };

  /** Scale string for parsing */
  scaleString?: string;

  /** Scale array for multiple values */
  scaleArray?: (number | string | ScaleValue | ScaleUnit)[];

  /** Scale constraints */
  constraints?: {
    min?: number;
    max?: number;
  };
}
import { SizeValue } from '../../enums/SizeValue';
import { SizeUnit } from '../../enums/SizeUnit';
import { Dimension } from '../../enums/Dimension';
import { IBaseStrategyInput } from './IBaseStrategyInput';

/**
 * Size Strategy Input Interface
 * Represents size-related strategy inputs
 */
export interface ISizeStrategyInput extends IBaseStrategyInput {
  /** Size value */
  value?: number | string | SizeValue | SizeUnit;

  /** Size dimension */
  dimension?: Dimension;

  /** Size unit */
  unit?: SizeUnit;

  /** Size value type */
  valueType?: SizeValue;

  /** Parent size reference */
  parentSize?: {
    getValue(parent: unknown): number;
  };

  /** Size string for parsing */
  sizeString?: string;

  /** Size array for multiple values */
  sizeArray?: (number | string | SizeValue | SizeUnit)[];

  /** Size constraints */
  constraints?: {
    min?: number;
    max?: number;
  };
}
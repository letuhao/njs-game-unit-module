import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { Dimension } from '../../enums/Dimension';
import { IBaseStrategyInput } from './IBaseStrategyInput';

/**
 * Position Strategy Input Interface
 * Represents position-related strategy inputs
 */
export interface IPositionStrategyInput extends IBaseStrategyInput {
  /** Position value */
  value?: number | string | PositionValue | PositionUnit;

  /** Position axis */
  axis?: Dimension;

  /** Position unit */
  unit?: PositionUnit;

  /** Position value type */
  valueType?: PositionValue;

  /** Parent position reference */
  parentPosition?: {
    getValue(parent: unknown): number;
  };

  /** Position string for parsing */
  positionString?: string;

  /** Position array for multiple values */
  positionArray?: (number | string | PositionValue | PositionUnit)[];

  /** Position constraints */
  constraints?: {
    min?: number;
    max?: number;
  };
}
import { SizeValue } from '../../enums/SizeValue';
import { SizeUnit } from '../../enums/SizeUnit';
import { Dimension } from '../../enums/Dimension';

export interface ISizeValueCalculationStrategy {
  readonly strategyId: string;
  readonly sizeValue: SizeValue;
  readonly sizeUnit: SizeUnit;
  readonly dimension: Dimension;
  
  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): boolean;
  calculate(sizeValue: SizeValue, sizeUnit: SizeUnit, dimension: Dimension): number;
  getPriority(): number;
}

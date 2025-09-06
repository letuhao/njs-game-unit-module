import { TemplateInputType } from '../../enums/TemplateInputType';
import { UnitType } from '../../enums/UnitType';
import { Dimension } from '../../enums/Dimension';

export interface ITemplateInput {
  readonly id: string;
  readonly type: TemplateInputType;
  readonly unitType: UnitType;
  readonly dimension: Dimension;
  readonly value: number;
  readonly isValid: boolean;
  validate(): boolean;
  clone(): ITemplateInput;
}
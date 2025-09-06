import { TemplateInputType } from '../enums/TemplateInputType';
import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';

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

export interface ISizeTemplateInput extends ITemplateInput {
  readonly sizeValue: string;
  readonly sizeUnit: string;
}

export interface IPositionTemplateInput extends ITemplateInput {
  readonly positionValue: string;
  readonly positionUnit: string;
  readonly axis: Dimension;
}

export interface IScaleTemplateInput extends ITemplateInput {
  readonly scaleValue: string;
  readonly scaleUnit: string;
  readonly maintainAspectRatio: boolean;
}

export function createSizeTemplateInput(
  id: string,
  value: number,
  sizeValue: string,
  sizeUnit: string,
  dimension: Dimension
): ISizeTemplateInput {
  return {
    id,
    type: TemplateInputType.SIZE,
    unitType: UnitType.SIZE,
    dimension,
    value,
    isValid: true,
    sizeValue,
    sizeUnit,
    validate: () => true,
    clone: () => createSizeTemplateInput(id, value, sizeValue, sizeUnit, dimension)
  };
}

export function createPositionTemplateInput(
  id: string,
  value: number,
  positionValue: string,
  positionUnit: string,
  axis: Dimension
): IPositionTemplateInput {
  return {
    id,
    type: TemplateInputType.POSITION,
    unitType: UnitType.POSITION,
    dimension: axis,
    value,
    isValid: true,
    positionValue,
    positionUnit,
    axis,
    validate: () => true,
    clone: () => createPositionTemplateInput(id, value, positionValue, positionUnit, axis)
  };
}

export function createScaleTemplateInput(
  id: string,
  value: number,
  scaleValue: string,
  scaleUnit: string,
  maintainAspectRatio: boolean = false
): IScaleTemplateInput {
  return {
    id,
    type: TemplateInputType.SCALE,
    unitType: UnitType.SCALE,
    dimension: Dimension.BOTH,
    value,
    isValid: true,
    scaleValue,
    scaleUnit,
    maintainAspectRatio,
    validate: () => true,
    clone: () => createScaleTemplateInput(id, value, scaleValue, scaleUnit, maintainAspectRatio)
  };
}

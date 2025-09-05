import { IUnitContext, CalculationInput, CalculationOutput } from '../container';

export interface Calculator<TUnit> {
  calculate(ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput;
}

export type Validator<TUnit> = (ctx: IUnitContext, input: CalculationInput<TUnit>) => void;

export class ValidationDecorator<TUnit> implements Calculator<TUnit> {
  constructor(private inner: Calculator<TUnit>, private validators: Validator<TUnit>[]) {}
  calculate(ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput {
    for (const v of this.validators) v(ctx, input);
    return this.inner.calculate(ctx, input);
  }
}

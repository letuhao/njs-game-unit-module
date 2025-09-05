import { IUnitContext, CalculationInput, CalculationOutput } from '../../container';

export type SizeStrategy = (ctx: IUnitContext, input: CalculationInput<any>) => CalculationOutput;

export const PercentWidthStrategy: SizeStrategy = (ctx, input) => {
  const pct = typeof input.value === 'string' ? parseFloat(String(input.value)) : Number(input.value);
  const value = (isFinite(pct) ? pct : 0) * 0.01 * ctx.viewportWidth;
  return { value };
};

import { IUnitContext, CalculationInput, CalculationOutput } from '../container';

export interface Calculator<TUnit> {
  calculate(ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput;
}

export class CachingDecorator<TUnit> implements Calculator<TUnit> {
  private cache = new Map<string, CalculationOutput>();
  constructor(private inner: Calculator<TUnit>, private keyFn: (ctx: IUnitContext, input: CalculationInput<TUnit>) => string) {}
  calculate(ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput {
    const key = this.keyFn(ctx, input);
    const hit = this.cache.get(key);
    if (hit) return hit;
    const out = this.inner.calculate(ctx, input);
    this.cache.set(key, out);
    return out;
  }
}

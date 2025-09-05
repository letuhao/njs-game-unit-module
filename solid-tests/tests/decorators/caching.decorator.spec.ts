import { CachingDecorator } from '../..//src/decorators/CachingDecorator';
import type { IUnitContext, CalculationInput, CalculationOutput } from '../..//src/container';

class CountingCalc<TUnit> {
  public calls = 0;
  calculate(_ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput {
    this.calls++;
    return { value: Number(input.value) || 0 };
  }
}

describe('CachingDecorator', () => {
  const ctx: IUnitContext = { viewportWidth: 1000, viewportHeight: 500 };

  test('caches by key function', () => {
    const inner = new CountingCalc();
    const calc = new CachingDecorator(inner, (_ctx, i) => `${i.unit}:${i.value}`);
    const a = calc.calculate(ctx, { unit: 'SIZE', value: 5 } as any).value;
    const b = calc.calculate(ctx, { unit: 'SIZE', value: 5 } as any).value;
    expect(a).toBe(5);
    expect(b).toBe(5);
    expect(inner.calls).toBe(1);
  });

  test('different keys call inner again', () => {
    const inner = new CountingCalc();
    const calc = new CachingDecorator(inner, (_ctx, i) => `${i.unit}:${i.value}`);
    calc.calculate(ctx, { unit: 'SIZE', value: 5 } as any);
    calc.calculate(ctx, { unit: 'SIZE', value: 6 } as any);
    expect(inner.calls).toBe(2);
  });
});

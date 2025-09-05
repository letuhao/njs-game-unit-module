import { PercentWidthStrategy } from '../..//src/strategies/size/PercentWidthStrategy';
import type { IUnitContext, CalculationInput } from '../..//src/container';

describe('PercentWidthStrategy (golden + invariants)', () => {
  const ctx: IUnitContext = { viewportWidth: 1000, viewportHeight: 500 };

  const cases: Array<[number | string, number]> = [
    [0, 0],
    [25, 250],
    ['25', 250],
    [100, 1000],
    [200, 2000],
    [-10, -100],
    ['foo', 0], // parseFloat fails -> treated as 0 in template strategy
  ];

  test.each(cases)('value=%p -> %p', (value, expected) => {
    const out = PercentWidthStrategy(ctx, { unit: 'PERCENT_WIDTH', value } as unknown as CalculationInput<any>);
    expect(out.value).toBeCloseTo(expected, 6);
  });

  test('monotonicity over random samples', () => {
    const percents = Array.from({ length: 50 }, (_, i) => -50 + i * 5); // -50..195 step 5
    for (let i = 1; i < percents.length; i++) {
      const a = PercentWidthStrategy(ctx, { unit: 'PERCENT_WIDTH', value: percents[i-1] } as any).value;
      const b = PercentWidthStrategy(ctx, { unit: 'PERCENT_WIDTH', value: percents[i] } as any).value;
      expect(b).toBeGreaterThanOrEqual(a);
    }
  });
});

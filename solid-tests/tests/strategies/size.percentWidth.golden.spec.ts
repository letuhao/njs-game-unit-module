import { PercentWidthStrategy } from '../..//src/strategies/size/PercentWidthStrategy';
import type { IUnitContext, CalculationInput } from '../..//src/container';
import golden from '../golden/size.percentWidth.golden.json';

type Golden = { ctx: IUnitContext; input: CalculationInput<any>; expected: number };

describe('PercentWidthStrategy — golden json', () => {
  (golden as unknown as Golden[]).forEach(({ ctx, input, expected }, idx) => {
    test(`#${idx} ctx=${ctx.viewportWidth}×${ctx.viewportHeight} value=${String(input.value)}`, () => {
      const out = PercentWidthStrategy(ctx, input);
      expect(out.value).toBeCloseTo(expected, 6);
    });
  });
});

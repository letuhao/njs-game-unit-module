import { ValidationDecorator } from '../..//src/decorators/ValidationDecorator';
import type { IUnitContext, CalculationInput, CalculationOutput } from '../..//src/container';
import { okValidator, throwingValidator } from '../helpers/fakes';

class IdentityCalc<TUnit> {
  calculate(_ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput {
    return { value: Number(input.value) || 0 };
  }
}

describe('ValidationDecorator', () => {
  const ctx: IUnitContext = { viewportWidth: 1000, viewportHeight: 500 };

  test('runs validators before inner', () => {
    const calc = new ValidationDecorator(new IdentityCalc(), [okValidator()]);
    const out = calc.calculate(ctx, { unit: 'X', value: 3 } as any);
    expect(out.value).toBe(3);
  });

  test('throws if a validator fails', () => {
    const calc = new ValidationDecorator(new IdentityCalc(), [throwingValidator('bad')]);
    expect(() => calc.calculate(ctx, { unit: 'X', value: 3 } as any)).toThrow(/bad/);
  });
});

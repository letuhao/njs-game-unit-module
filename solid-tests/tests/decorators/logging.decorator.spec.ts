import { LoggingDecorator, Logger } from '../..//src/decorators/LoggingDecorator';
import type { IUnitContext, CalculationInput, CalculationOutput } from '../..//src/container';

class IdentityCalc<TUnit> {
  calculate(_ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput {
    return { value: Number(input.value) || 0 };
  }
}
class FakeLogger implements Logger {
  public calls: any[] = [];
  debug(msg: string, meta?: Record<string, unknown>): void { this.calls.push({ msg, meta }); }
}

describe('LoggingDecorator', () => {
  const ctx: IUnitContext = { viewportWidth: 1000, viewportHeight: 500 };

  test('emits debug once with meta', () => {
    const logger = new FakeLogger();
    const calc = new LoggingDecorator(new IdentityCalc(), logger);
    const out = calc.calculate(ctx, { unit: 'L', value: 7 } as any);
    expect(out.value).toBe(7);
    expect(logger.calls.length).toBe(1);
    expect(logger.calls[0].msg).toBe('calc');
    expect(logger.calls[0].meta?.unit).toBe('L');
    expect(logger.calls[0].meta?.out).toBe(7);
  });
});

import { IUnitContext, CalculationInput, CalculationOutput } from '../container';

export interface Calculator<TUnit> {
  calculate(ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput;
}

export interface Logger { debug(msg: string, meta?: Record<string, unknown>): void; }

export class LoggingDecorator<TUnit> implements Calculator<TUnit> {
  constructor(private inner: Calculator<TUnit>, private logger: Logger) {}
  calculate(ctx: IUnitContext, input: CalculationInput<TUnit>): CalculationOutput {
    const start = performance.now?.() ?? Date.now();
    const out = this.inner.calculate(ctx, input);
    const end = performance.now?.() ?? Date.now();
    this.logger.debug('calc', { unit: input.unit, value: input.value, out: out.value, ms: end - start });
    return out;
  }
}

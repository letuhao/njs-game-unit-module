import { LoggingDecorator } from '../../src/decorators/LoggingDecorator';

describe('LoggingDecorator', () => {
  const ctx = { viewportWidth: 100, viewportHeight: 100 };

  it('logs calculation time and forwards output', () => {
    const inner = { calculate: jest.fn().mockReturnValue({ value: 99 }) };
    const logger = { debug: jest.fn() };
    const dec = new LoggingDecorator(inner, logger);

    const out = dec.calculate(ctx, { unit: 'TEST', value: 1 });

    expect(out.value).toBe(99);
    expect(inner.calculate).toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith(
      'calc',
      expect.objectContaining({ unit: 'TEST', value: 1, out: 99 })
    );
  });
});

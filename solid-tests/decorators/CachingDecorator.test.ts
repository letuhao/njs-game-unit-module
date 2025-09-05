import { CachingDecorator } from '../../src/decorators/CachingDecorator';

describe('CachingDecorator', () => {
  const ctx = { viewportWidth: 100, viewportHeight: 100 };

  it('caches repeated calls', () => {
    const inner = { calculate: jest.fn().mockReturnValue({ value: 10 }) };
    const keyFn = jest.fn().mockImplementation((_ctx, input) => String(input.value));
    const dec = new CachingDecorator(inner, keyFn);

    const out1 = dec.calculate(ctx, { unit: 'TEST', value: 5 });
    const out2 = dec.calculate(ctx, { unit: 'TEST', value: 5 });

    expect(out1.value).toBe(10);
    expect(out2.value).toBe(10);
    expect(inner.calculate).toHaveBeenCalledTimes(1);
  });
});

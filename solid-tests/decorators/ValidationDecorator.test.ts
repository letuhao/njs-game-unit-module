import { ValidationDecorator } from '../../src/decorators/ValidationDecorator';

describe('ValidationDecorator', () => {
  const ctx = { viewportWidth: 100, viewportHeight: 100 };

  it('runs validators before calculate', () => {
    const inner = { calculate: jest.fn().mockReturnValue({ value: 42 }) };
    const validator = jest.fn();
    const dec = new ValidationDecorator(inner, [validator]);

    const out = dec.calculate(ctx, { unit: 'TEST', value: 1 });
    expect(validator).toHaveBeenCalled();
    expect(inner.calculate).toHaveBeenCalled();
    expect(out.value).toBe(42);
  });
});

import { StrategyRegistry } from '../../src/strategies/registry';

describe('StrategyRegistry', () => {
  it('registers and resolves strategies', () => {
    const reg = new StrategyRegistry<string, (x: number) => number>();
    reg.register('double', (x) => x * 2);
    const fn = reg.resolve('double');
    expect(fn(2)).toBe(4);
  });

  it('throws if missing and no fallback provided', () => {
    const reg = new StrategyRegistry<string, (x: number) => number>();
    expect(() => reg.resolve('missing')).toThrow();
  });

  it('uses fallback if provided', () => {
    const reg = new StrategyRegistry<string, (x: number) => number>();
    const fb = jest.fn().mockReturnValue(123);
    const fn = reg.resolve('missing', fb);
    expect(fn()).toBe(123);
  });
});

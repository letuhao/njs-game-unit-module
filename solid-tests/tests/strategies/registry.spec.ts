import { StrategyRegistry } from '../..//src/strategies/registry';

describe('StrategyRegistry', () => {
  type Key = 'A' | 'B';
  type Fn = (n: number) => number;

  test('register/resolve returns the same function', () => {
    const r = new StrategyRegistry<Key, Fn>();
    const f: Fn = (n) => n + 1;
    r.register('A', f);
    expect(r.resolve('A')).toBe(f);
  });

  test('resolve throws if unknown and no fallback', () => {
    const r = new StrategyRegistry<Key, Fn>();
    expect(() => r.resolve('A')).toThrow(/not registered/i);
  });

  test('resolve returns fallback when provided', () => {
    const r = new StrategyRegistry<Key, Fn>();
    const fb: Fn = (n) => n;
    expect(r.resolve('A', fb)(41)).toBe(41);
  });
});

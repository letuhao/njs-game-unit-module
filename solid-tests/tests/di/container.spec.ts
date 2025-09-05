import { bind, bindInstance, resolve, TOKENS } from '../..//src/container';

describe('DI container', () => {
  test('bind + resolve (factory)', () => {
    class A { n = 1; }
    bind('A' as any, () => new A());
    const a = resolve<any>('A' as any);
    expect(a.n).toBe(1);
  });

  test('bindInstance returns same object', () => {
    const obj = { x: 3 };
    bindInstance('B' as any, obj);
    expect(resolve<any>('B' as any)).toBe(obj);
  });

  test('unbound token throws', () => {
    expect(() => resolve<any>('__NO__' as any)).toThrow(/not bound/i);
  });
});

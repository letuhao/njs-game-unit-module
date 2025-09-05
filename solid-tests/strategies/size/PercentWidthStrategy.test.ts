import { PercentWidthStrategy } from '../../src/strategies/size/PercentWidthStrategy';

describe('PercentWidthStrategy', () => {
  const ctx = { viewportWidth: 1000, viewportHeight: 800 };

  it('converts 50% to half the viewport width', () => {
    const input = { unit: 'PERCENT_WIDTH', value: 50 };
    const out = PercentWidthStrategy(ctx, input);
    expect(out.value).toBeCloseTo(500);
  });

  it('parses string percentages', () => {
    const input = { unit: 'PERCENT_WIDTH', value: '25' };
    const out = PercentWidthStrategy(ctx, input);
    expect(out.value).toBeCloseTo(250);
  });

  it('handles NaN gracefully', () => {
    const input = { unit: 'PERCENT_WIDTH', value: 'abc' };
    const out = PercentWidthStrategy(ctx, input);
    expect(out.value).toBe(0);
  });
});

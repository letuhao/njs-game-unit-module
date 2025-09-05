# Testing Plan

## Coverage Targets
- `strategies/**`: **≥ 90%**
- `calculators/**`: **≥ 90%**
- `adapters/**`, `commands/**`: **≥ 85%**

## Test Types

1. **Golden Tests (Deterministic I/O)**
   - For each strategy, fix inputs and expected outputs. Store snapshots.
2. **Property-Based Tests**
   - Ranges of inputs (e.g., width/height 1..8192) → invariants hold (no NaN, monotonicity, bounds).
3. **Mutation Tests or Differential Tests**
   - Ensure math refactors do not change results.
4. **Contract Tests for Interfaces**
   - Any `ISizeUnitCalculator` must pass the same suite as the default implementation.
5. **Performance Tests**
   - 1e6 iterations micro-bench; assert max execution time.

## Concrete To-Dos (Cursor)

- Add tests for registries: resolve unknown key → fallback strategy.
- Tests for decorators order (validation → caching → logging).
- Legacy adapter round-trip tests using sample payloads.

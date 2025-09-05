# Performance Checklist

- Avoid object allocations in tight loops (reuse temporaries).
- Prefer math operations to function calls in hot strategies.
- Batch calculations via `commands/BatchCalculationCommand.ts` to amortize overhead.
- Provide a `diagnostics` flag; skip when false.
- Cache invariant conversions (e.g., `%` → multiplier) outside hot paths.

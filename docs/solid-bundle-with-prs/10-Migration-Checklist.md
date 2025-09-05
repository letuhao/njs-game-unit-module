# Migration Checklist

1. Land Phase 1 (interfaces) without functional changes.
2. Introduce registries alongside existing conditionals; toggle by feature flag.
3. Switch calculators to registry lookups when coverage hits ≥ 90%.
4. Move factory wiring to `container.ts` and freeze legacy adapters.
5. Remove dead branches and legacy imports; keep compatibility shim for one release.
6. Monitor with canary builds; rollback by toggling the feature flag.

# SOLID Test Pack (Jest + TypeScript)

This pack gives you **ready-to-run Jest tests** for the Strategy Registry, DI container,
and the core decorators (Validation/Caching/Logging), plus **golden tests** for a size strategy.

## Install

```bash
npm i -D jest ts-jest @types/jest typescript
# optional: fast-check for richer property tests
# npm i -D fast-check
```

## Wire scripts (copy into package.json)

```jsonc
{
  "scripts": {
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  }
}
```

> If your sources live somewhere else, adjust the import paths in tests (they currently assume `../src/...` relative to the `tests` folder).

## Run

```bash
npx jest
# or
npm run test
```

---

### Coverage Gates

You can adjust `coverageThreshold` inside `jest.config.cjs`. Start lower, then raise once all tests pass.

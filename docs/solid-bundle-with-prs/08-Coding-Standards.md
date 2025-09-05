# Coding Standards to Guard SOLID

## tsconfig
- `strict: true`
- `noImplicitAny: true`
- `exactOptionalPropertyTypes: true`
- `noUncheckedIndexedAccess: true`

## ESLint (key rules)
- `complexity` max 10 (drop gradually to 6)
- `max-lines-per-function`: 50
- `max-depth`: 3
- `no-redeclare`, `no-console`
- `import/no-cycle`

## Prettier
- Keep defaults; enforce consistent formatting.

## Commit Gates (CI)
- Lint + test + coverage gates from `05-Testing-Plan.md`
- Block PRs that add new `switch`/`if` ladders inside calculators.

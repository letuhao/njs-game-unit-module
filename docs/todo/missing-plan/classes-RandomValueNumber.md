# RandomValueNumber.ts - Refactoring Plan

## File: `src/classes/RandomValueNumber.ts`

## Issues Identified

### 1. **DIP:ConcreteConstruction** (Line 14)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 14 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

## Detailed Refactoring Steps

### Step 1: Add DI Container (Phase 4)
```typescript
// BEFORE
export class RandomValueNumber {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class RandomValueNumber {
  constructor(
    private container: IDiContainer,
    private someDependency: ISomeInterface
  ) {}
}
```

### Step 2: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.RANDOM_VALUE_NUMBER)
  .to(RandomValueNumber)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: Interface segregation for dependencies
- **Affects**: All classes using this random value generator

## Testing Requirements

- Unit tests for random value generation logic
- Integration tests with DI container
- Performance tests to ensure no regression

## Success Criteria

- ✅ All dependencies injected via DI
- ✅ No direct instantiation of dependencies
- ✅ All tests pass

## Estimated Effort

- **Time**: 1-2 hours
- **Complexity**: Low
- **Risk**: Low (simple refactoring)

## Notes

- This is a utility class for random value generation
- Ensure random number generation remains deterministic for testing
- Consider adding seed parameter for reproducible tests

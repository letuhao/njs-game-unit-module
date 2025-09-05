# IUnitAdapter.ts - Refactoring Plan

## File: `src/adapters/IUnitAdapter.ts`

## Issues Identified

### 1. **DIP:ConcreteConstruction** (Line 90)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 90 - `new SomeClass()`
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
export abstract class IUnitAdapter {
  constructor() {
    this.someDependency = new SomeClass();
  }
  
  protected createCalculator(): IUnitCalculator {
    return new SomeCalculator();
  }
}

// AFTER
export abstract class IUnitAdapter {
  constructor(
    protected container: IDiContainer,
    protected someDependency: ISomeInterface
  ) {}
  
  protected createCalculator(): IUnitCalculator {
    return this.container.resolve(TOKENS.SOME_CALCULATOR);
  }
}
```

### Step 2: Update Concrete Adapters
```typescript
// Update LegacyPositionUnitAdapter
export class LegacyPositionUnitAdapter extends IUnitAdapter {
  constructor(
    container: IDiContainer,
    someDependency: ISomeInterface
  ) {
    super(container, someDependency);
  }
}

// Update LegacySizeUnitAdapter
export class LegacySizeUnitAdapter extends IUnitAdapter {
  constructor(
    container: IDiContainer,
    someDependency: ISomeInterface
  ) {
    super(container, someDependency);
  }
}
```

### Step 3: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.UNIT_ADAPTER)
  .to(LegacyPositionUnitAdapter)
  .inSingletonScope();

container.bind(TOKENS.UNIT_ADAPTER)
  .to(LegacySizeUnitAdapter)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: Interface segregation for dependencies
- **Requires**: Calculator interfaces
- **Affects**: All concrete adapter implementations

## Testing Requirements

- Unit tests for adapter logic
- Integration tests with DI container
- Tests for each concrete adapter
- Performance tests to ensure no regression

## Success Criteria

- ✅ All dependencies injected via DI
- ✅ No direct instantiation of dependencies
- ✅ Abstract class provides DI container to subclasses
- ✅ All tests pass

## Estimated Effort

- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (abstract class refactoring)

## Notes

- This is an abstract class, so changes affect all subclasses
- Ensure backward compatibility with existing adapter implementations
- Consider using factory pattern for calculator creation

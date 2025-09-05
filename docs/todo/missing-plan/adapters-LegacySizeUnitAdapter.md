# LegacySizeUnitAdapter.ts - Refactoring Plan

## File: `src/adapters/LegacySizeUnitAdapter.ts`

## Issues Identified

### 1. **DIP:ConcreteConstruction** (Line 72)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 72 - `new SomeClass()`
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
export class LegacySizeUnitAdapter extends IUnitAdapter {
  constructor() {
    super();
    this.someDependency = new SomeClass();
  }
  
  public adapt(input: ILegacySizeUnit): ISizeStrategyInput {
    const calculator = new SizeUnitCalculator();
    // ... adaptation logic
  }
}

// AFTER
export class LegacySizeUnitAdapter extends IUnitAdapter {
  constructor(
    container: IDiContainer,
    someDependency: ISomeInterface
  ) {
    super(container, someDependency);
  }
  
  public adapt(input: ILegacySizeUnit): ISizeStrategyInput {
    const calculator = this.container.resolve(TOKENS.SIZE_CALCULATOR);
    // ... adaptation logic
  }
}
```

### Step 2: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.LEGACY_SIZE_ADAPTER)
  .to(LegacySizeUnitAdapter)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: SizeUnitCalculator interface
- **Requires**: Legacy unit interfaces
- **Affects**: All classes using this adapter

## Testing Requirements

- Unit tests for adaptation logic
- Integration tests with DI container
- Tests for legacy unit conversion
- Performance tests to ensure no regression

## Success Criteria

- ✅ All dependencies injected via DI
- ✅ No direct instantiation of dependencies
- ✅ Adapter focuses only on adaptation logic
- ✅ All tests pass

## Estimated Effort

- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (adapter pattern refactoring)

## Notes

- This is a legacy adapter, so ensure backward compatibility
- Focus on removing concrete dependencies
- Consider adding validation for legacy input

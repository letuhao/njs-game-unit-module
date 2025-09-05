# UnitCalculatorFactory.ts - Refactoring Plan

## File: `src/classes/UnitCalculatorFactory.ts`

## Issues Identified

### 1. **DIP:ConcreteConstruction** (Line 30)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 30 - `new SomeClass()`
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
export class UnitCalculatorFactory {
  constructor() {
    this.someDependency = new SomeClass();
  }
  
  public createCalculator(type: UnitType): IUnitCalculator {
    switch (type) {
      case UnitType.SIZE:
        return new SizeUnitCalculator();
      case UnitType.POSITION:
        return new PositionUnitCalculator();
      case UnitType.SCALE:
        return new ScaleUnitCalculator();
    }
  }
}

// AFTER
export class UnitCalculatorFactory {
  constructor(
    private container: IDiContainer,
    private sizeCalculator: ISizeUnitCalculator,
    private positionCalculator: IPositionUnitCalculator,
    private scaleCalculator: IScaleUnitCalculator
  ) {}
  
  public createCalculator(type: UnitType): IUnitCalculator {
    switch (type) {
      case UnitType.SIZE:
        return this.sizeCalculator;
      case UnitType.POSITION:
        return this.positionCalculator;
      case UnitType.SCALE:
        return this.scaleCalculator;
    }
  }
}
```

### Step 2: Update Composition Root
```typescript
// In ContainerSetup.ts
container.bind(TOKENS.UNIT_CALCULATOR_FACTORY)
  .to(UnitCalculatorFactory)
  .inSingletonScope();
```

## Dependencies

- **Requires**: DI Container implementation
- **Requires**: Interface segregation for calculator types
- **Requires**: All calculator interfaces
- **Affects**: All classes using this factory

## Testing Requirements

- Unit tests for factory creation logic
- Integration tests with DI container
- Tests for each calculator type creation
- Performance tests to ensure no regression

## Success Criteria

- ✅ All dependencies injected via DI
- ✅ No direct instantiation of calculators
- ✅ Factory uses injected calculator instances
- ✅ All tests pass

## Estimated Effort

- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (well-defined factory pattern)

## Notes

- This is a factory class, so it should create instances rather than hold them
- Consider using a registry pattern instead of switch statement
- Ensure factory methods are pure and testable

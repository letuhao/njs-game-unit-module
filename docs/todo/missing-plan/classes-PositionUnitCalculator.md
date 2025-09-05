# PositionUnitCalculator.ts - Refactoring Plan

## File: `src/classes/PositionUnitCalculator.ts`

## Issues Identified

### 1. **OCP:LargeSwitch** (Line 52)
- **WHY**: 19-branch switch violates Open/Closed Principle
- **WHAT**: Replace switch with Strategy Registry
- **WHERE**: Line 52 - `switch (this.positionUnit)`
- **WHEN**: Phase 3 - Strategy Registry Implementation
- **HOW**:
  1. Create strategy functions for each case
  2. Register strategies in registry
  3. Replace switch with registry lookup
  4. Remove switch statement
- **WHICH**: Strategy Registry pattern

### 2. **DIP:ConcreteConstruction** (Line 169)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 169 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

## Detailed Refactoring Steps

### Step 1: Create Strategy Functions (Phase 3)
```typescript
// Create src/strategies/position/PositionUnitStrategies.ts
export const POSITION_UNIT_STRATEGIES = {
  [PositionUnit.PIXEL]: (input: IPositionStrategyInput) => {
    // Pixel calculation logic
  },
  [PositionUnit.PERCENTAGE]: (input: IPositionStrategyInput) => {
    // Percentage calculation logic
  },
  // ... 17 more strategies
} as const;
```

### Step 2: Create Strategy Registry (Phase 3)
```typescript
// Create src/strategies/position/PositionUnitStrategyRegistry.ts
export class PositionUnitStrategyRegistry {
  private strategies = new Map<PositionUnit, PositionUnitStrategy>();
  
  register(unit: PositionUnit, strategy: PositionUnitStrategy): void {
    this.strategies.set(unit, strategy);
  }
  
  getStrategy(unit: PositionUnit): PositionUnitStrategy {
    const strategy = this.strategies.get(unit);
    if (!strategy) {
      throw new Error(`No strategy found for unit: ${unit}`);
    }
    return strategy;
  }
}
```

### Step 3: Replace Switch Statement (Phase 3)
```typescript
// BEFORE
public calculate(input: IPositionStrategyInput): number {
  switch (this.positionUnit) {
    case PositionUnit.PIXEL:
      return this.calculatePixel(input);
    case PositionUnit.PERCENTAGE:
      return this.calculatePercentage(input);
    // ... 17 more cases
  }
}

// AFTER
public calculate(input: IPositionStrategyInput): number {
  const strategy = this.strategyRegistry.getStrategy(this.positionUnit);
  return strategy(input);
}
```

### Step 4: Add DI Container (Phase 4)
```typescript
// BEFORE
export class PositionUnitCalculator {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class PositionUnitCalculator {
  constructor(
    private container: IDiContainer,
    private strategyRegistry: PositionUnitStrategyRegistry,
    private someDependency: ISomeInterface
  ) {}
}
```

## Dependencies

- **Requires**: PositionUnitStrategyRegistry implementation
- **Requires**: Individual strategy functions
- **Requires**: DI Container implementation
- **Affects**: All classes using this calculator

## Testing Requirements

- Unit tests for each strategy function
- Integration tests with strategy registry
- Calculator tests with mocked registry
- Performance tests to ensure no regression

## Success Criteria

- ✅ No switch statements
- ✅ All strategies registered in registry
- ✅ Calculator uses registry for strategy resolution
- ✅ All dependencies injected via DI
- ✅ All tests pass

## Estimated Effort

- **Time**: 4-6 hours
- **Complexity**: High (19 strategies to implement)
- **Risk**: Medium (large refactoring)

## Strategy Implementation Order

1. **High Priority**: PIXEL, PERCENTAGE, VIEWPORT_WIDTH
2. **Medium Priority**: PARENT_WIDTH, AUTO, CENTER
3. **Low Priority**: Remaining 13 strategies

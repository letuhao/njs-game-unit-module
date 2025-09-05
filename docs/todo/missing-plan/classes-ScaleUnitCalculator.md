# ScaleUnitCalculator.ts - Refactoring Plan

## File: `src/classes/ScaleUnitCalculator.ts`

## Issues Identified

### 1. **OCP:LargeSwitch** (Line 52)
- **WHY**: 12-branch switch violates Open/Closed Principle
- **WHAT**: Replace switch with Strategy Registry
- **WHERE**: Line 52 - `switch (this.scaleUnit)`
- **WHEN**: Phase 3 - Strategy Registry Implementation
- **HOW**:
  1. Create strategy functions for each case
  2. Register strategies in registry
  3. Replace switch with registry lookup
  4. Remove switch statement
- **WHICH**: Strategy Registry pattern

### 2. **DIP:ConcreteConstruction** (Line 260)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 260 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

## Detailed Refactoring Steps

### Step 1: Create Strategy Functions (Phase 3)
```typescript
// Create src/strategies/scale/ScaleUnitStrategies.ts
export const SCALE_UNIT_STRATEGIES = {
  [ScaleUnit.PIXEL]: (input: IScaleStrategyInput) => {
    // Pixel calculation logic
  },
  [ScaleUnit.PERCENTAGE]: (input: IScaleStrategyInput) => {
    // Percentage calculation logic
  },
  [ScaleUnit.VIEWPORT_WIDTH]: (input: IScaleStrategyInput) => {
    // Viewport width calculation logic
  },
  [ScaleUnit.VIEWPORT_HEIGHT]: (input: IScaleStrategyInput) => {
    // Viewport height calculation logic
  },
  [ScaleUnit.PARENT_WIDTH]: (input: IScaleStrategyInput) => {
    // Parent width calculation logic
  },
  [ScaleUnit.PARENT_HEIGHT]: (input: IScaleStrategyInput) => {
    // Parent height calculation logic
  },
  [ScaleUnit.AUTO]: (input: IScaleStrategyInput) => {
    // Auto calculation logic
  },
  [ScaleUnit.CENTER]: (input: IScaleStrategyInput) => {
    // Center calculation logic
  },
  [ScaleUnit.STRETCH]: (input: IScaleStrategyInput) => {
    // Stretch calculation logic
  },
  [ScaleUnit.ASPECT_RATIO]: (input: IScaleStrategyInput) => {
    // Aspect ratio calculation logic
  },
  [ScaleUnit.MIN]: (input: IScaleStrategyInput) => {
    // Min calculation logic
  },
  [ScaleUnit.MAX]: (input: IScaleStrategyInput) => {
    // Max calculation logic
  }
} as const;
```

### Step 2: Create Strategy Registry (Phase 3)
```typescript
// Create src/strategies/scale/ScaleUnitStrategyRegistry.ts
export class ScaleUnitStrategyRegistry {
  private strategies = new Map<ScaleUnit, ScaleUnitStrategy>();
  
  register(unit: ScaleUnit, strategy: ScaleUnitStrategy): void {
    this.strategies.set(unit, strategy);
  }
  
  getStrategy(unit: ScaleUnit): ScaleUnitStrategy {
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
public calculate(input: IScaleStrategyInput): number {
  switch (this.scaleUnit) {
    case ScaleUnit.PIXEL:
      return this.calculatePixel(input);
    case ScaleUnit.PERCENTAGE:
      return this.calculatePercentage(input);
    // ... 10 more cases
  }
}

// AFTER
public calculate(input: IScaleStrategyInput): number {
  const strategy = this.strategyRegistry.getStrategy(this.scaleUnit);
  return strategy(input);
}
```

### Step 4: Add DI Container (Phase 4)
```typescript
// BEFORE
export class ScaleUnitCalculator {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class ScaleUnitCalculator {
  constructor(
    private container: IDiContainer,
    private strategyRegistry: ScaleUnitStrategyRegistry,
    private someDependency: ISomeInterface
  ) {}
}
```

## Dependencies

- **Requires**: ScaleUnitStrategyRegistry implementation
- **Requires**: Individual strategy functions (12 strategies)
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

- **Time**: 5-7 hours
- **Complexity**: High (12 strategies to implement)
- **Risk**: Medium (large refactoring)

## Strategy Implementation Order

1. **High Priority**: PIXEL, PERCENTAGE, VIEWPORT_WIDTH, VIEWPORT_HEIGHT
2. **Medium Priority**: PARENT_WIDTH, PARENT_HEIGHT, AUTO, CENTER
3. **Low Priority**: STRETCH, ASPECT_RATIO, MIN, MAX

## Notes

- Scale calculations are more complex than size/position
- Consider creating separate strategies for X and Y scaling
- Ensure strategy functions handle edge cases properly

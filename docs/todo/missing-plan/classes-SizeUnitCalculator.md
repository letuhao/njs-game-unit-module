# SizeUnitCalculator.ts - Refactoring Plan

## File: `src/classes/SizeUnitCalculator.ts`

## Issues Identified

### 1. **OCP:LargeSwitch** (Line 55)
- **WHY**: 9-branch switch violates Open/Closed Principle
- **WHAT**: Replace switch with Strategy Registry
- **WHERE**: Line 55 - `switch (this.sizeUnit)`
- **WHEN**: Phase 3 - Strategy Registry Implementation
- **HOW**:
  1. Create strategy functions for each case
  2. Register strategies in registry
  3. Replace switch with registry lookup
  4. Remove switch statement
- **WHICH**: Strategy Registry pattern

### 2. **OCP:LargeSwitch** (Line 295)
- **WHY**: 9-branch switch violates Open/Closed Principle
- **WHAT**: Replace switch with Strategy Registry
- **WHERE**: Line 295 - `switch (this.sizeUnit)`
- **WHEN**: Phase 3 - Strategy Registry Implementation
- **HOW**:
  1. Create strategy functions for each case
  2. Register strategies in registry
  3. Replace switch with registry lookup
  4. Remove switch statement
- **WHICH**: Strategy Registry pattern

### 3. **DIP:ConcreteConstruction** (Line 130)
- **WHY**: Direct instantiation violates Dependency Inversion Principle
- **WHAT**: Replace `new` with DI container resolution
- **WHERE**: Line 130 - `new SomeClass()`
- **WHEN**: Phase 4 - Dependency Injection
- **HOW**:
  1. Add DI container parameter to constructor
  2. Replace `new SomeClass()` with `container.resolve(TOKENS.SOME_CLASS)`
  3. Update composition root to bind concrete
- **WHICH**: DI Container with tokens

## Detailed Refactoring Steps

### Step 1: Create Strategy Functions (Phase 3)
```typescript
// Create src/strategies/size/SizeUnitStrategies.ts
export const SIZE_UNIT_STRATEGIES = {
  [SizeUnit.PIXEL]: (input: ISizeStrategyInput) => {
    // Pixel calculation logic
  },
  [SizeUnit.PERCENTAGE]: (input: ISizeStrategyInput) => {
    // Percentage calculation logic
  },
  [SizeUnit.VIEWPORT_WIDTH]: (input: ISizeStrategyInput) => {
    // Viewport width calculation logic
  },
  [SizeUnit.VIEWPORT_HEIGHT]: (input: ISizeStrategyInput) => {
    // Viewport height calculation logic
  },
  [SizeUnit.PARENT_WIDTH]: (input: ISizeStrategyInput) => {
    // Parent width calculation logic
  },
  [SizeUnit.PARENT_HEIGHT]: (input: ISizeStrategyInput) => {
    // Parent height calculation logic
  },
  [SizeUnit.AUTO]: (input: ISizeStrategyInput) => {
    // Auto calculation logic
  },
  [SizeUnit.CENTER]: (input: ISizeStrategyInput) => {
    // Center calculation logic
  },
  [SizeUnit.STRETCH]: (input: ISizeStrategyInput) => {
    // Stretch calculation logic
  }
} as const;
```

### Step 2: Create Strategy Registry (Phase 3)
```typescript
// Create src/strategies/size/SizeUnitStrategyRegistry.ts
export class SizeUnitStrategyRegistry {
  private strategies = new Map<SizeUnit, SizeUnitStrategy>();
  
  register(unit: SizeUnit, strategy: SizeUnitStrategy): void {
    this.strategies.set(unit, strategy);
  }
  
  getStrategy(unit: SizeUnit): SizeUnitStrategy {
    const strategy = this.strategies.get(unit);
    if (!strategy) {
      throw new Error(`No strategy found for unit: ${unit}`);
    }
    return strategy;
  }
}
```

### Step 3: Replace Switch Statements (Phase 3)
```typescript
// BEFORE - First switch (Line 55)
public calculate(input: ISizeStrategyInput): number {
  switch (this.sizeUnit) {
    case SizeUnit.PIXEL:
      return this.calculatePixel(input);
    case SizeUnit.PERCENTAGE:
      return this.calculatePercentage(input);
    // ... 7 more cases
  }
}

// AFTER
public calculate(input: ISizeStrategyInput): number {
  const strategy = this.strategyRegistry.getStrategy(this.sizeUnit);
  return strategy(input);
}

// BEFORE - Second switch (Line 295)
public validate(input: ISizeStrategyInput): boolean {
  switch (this.sizeUnit) {
    case SizeUnit.PIXEL:
      return this.validatePixel(input);
    case SizeUnit.PERCENTAGE:
      return this.validatePercentage(input);
    // ... 7 more cases
  }
}

// AFTER
public validate(input: ISizeStrategyInput): boolean {
  const strategy = this.validationRegistry.getStrategy(this.sizeUnit);
  return strategy(input);
}
```

### Step 4: Add DI Container (Phase 4)
```typescript
// BEFORE
export class SizeUnitCalculator {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class SizeUnitCalculator {
  constructor(
    private container: IDiContainer,
    private strategyRegistry: SizeUnitStrategyRegistry,
    private validationRegistry: SizeUnitValidationRegistry,
    private someDependency: ISomeInterface
  ) {}
}
```

## Dependencies

- **Requires**: SizeUnitStrategyRegistry implementation
- **Requires**: SizeUnitValidationRegistry implementation
- **Requires**: Individual strategy functions (9 strategies)
- **Requires**: Individual validation functions (9 validators)
- **Requires**: DI Container implementation
- **Affects**: All classes using this calculator

## Testing Requirements

- Unit tests for each strategy function
- Unit tests for each validation function
- Integration tests with strategy registry
- Integration tests with validation registry
- Calculator tests with mocked registries
- Performance tests to ensure no regression

## Success Criteria

- ✅ No switch statements
- ✅ All strategies registered in registry
- ✅ All validators registered in registry
- ✅ Calculator uses registries for strategy/validation resolution
- ✅ All dependencies injected via DI
- ✅ All tests pass

## Estimated Effort

- **Time**: 6-8 hours
- **Complexity**: High (18 functions to implement)
- **Risk**: Medium (large refactoring)

## Strategy Implementation Order

1. **High Priority**: PIXEL, PERCENTAGE, VIEWPORT_WIDTH, VIEWPORT_HEIGHT
2. **Medium Priority**: PARENT_WIDTH, PARENT_HEIGHT, AUTO
3. **Low Priority**: CENTER, STRETCH

## Notes

- Two separate switch statements need to be replaced
- Consider creating separate registries for calculation vs validation
- Ensure strategy functions are pure and testable

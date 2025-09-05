# SizeValueCalculationStrategies.ts - Refactoring Plan

## File: `src/strategies/value/SizeValueCalculationStrategies.ts`

## Issues Identified

### 1. **OCP:IfChain** (Lines 108-131, 110-131, 112-131, 118-131, 120-131, 122-131, 128-131, 186-189)
- **WHY**: Multiple if-chain violations violate Open/Closed Principle
- **WHAT**: Flatten if-chains to registry lookup
- **WHERE**: Lines 108-131, 110-131, 112-131, 118-131, 120-131, 122-131, 128-131, 186-189
- **WHEN**: Phase 3 - Strategy Registry Implementation
- **HOW**:
  1. Map keys to handler functions
  2. Remove conditional duplication
  3. Replace if-chains with registry lookup
- **WHICH**: Strategy Registry pattern

### 2. **SRP:CrossCuttingInsideCore** (Line 7)
- **WHY**: Logger import violates Single Responsibility Principle
- **WHAT**: Move logging to decorator or orchestration layer
- **WHERE**: Line 7 - `import { logger } from '../core/Logger';`
- **WHEN**: Phase 5 - Logging Refactoring
- **HOW**: 
  1. Remove logger import
  2. Remove all logger calls from methods
  3. Wrap strategy with LoggingDecorator
  4. Update constructor to accept ILogger interface
- **WHICH**: LoggingDecorator pattern

## Detailed Refactoring Steps

### Step 1: Create Strategy Functions (Phase 3)
```typescript
// Create src/strategies/value/size/SizeValueStrategies.ts
export const SIZE_VALUE_STRATEGIES = {
  [Dimension.WIDTH]: (input: ISizeStrategyInput) => {
    // Width calculation logic
  },
  [Dimension.HEIGHT]: (input: ISizeStrategyInput) => {
    // Height calculation logic
  },
  [Dimension.BOTH]: (input: ISizeStrategyInput) => {
    // Both dimensions calculation logic
  },
  [Dimension.AUTO]: (input: ISizeStrategyInput) => {
    // Auto calculation logic
  },
  [Dimension.CENTER]: (input: ISizeStrategyInput) => {
    // Center calculation logic
  },
  [Dimension.STRETCH]: (input: ISizeStrategyInput) => {
    // Stretch calculation logic
  },
  [Dimension.ASPECT_RATIO]: (input: ISizeStrategyInput) => {
    // Aspect ratio calculation logic
  }
} as const;
```

### Step 2: Create Strategy Registry (Phase 3)
```typescript
// Create src/strategies/value/size/SizeValueStrategyRegistry.ts
export class SizeValueStrategyRegistry {
  private strategies = new Map<Dimension, SizeValueStrategy>();
  
  register(dimension: Dimension, strategy: SizeValueStrategy): void {
    this.strategies.set(dimension, strategy);
  }
  
  getStrategy(dimension: Dimension): SizeValueStrategy {
    const strategy = this.strategies.get(dimension);
    if (!strategy) {
      throw new Error(`No strategy found for dimension: ${dimension}`);
    }
    return strategy;
  }
}
```

### Step 3: Replace If-Chains (Phase 3)
```typescript
// BEFORE - Multiple if-chains
public calculateWidth(input: ISizeStrategyInput): number {
  if (input.dimension === Dimension.WIDTH) {
    return this.calculateWidthValue(input);
  } else if (input.dimension === Dimension.BOTH) {
    return this.calculateBothWidth(input);
  } else if (input.dimension === Dimension.AUTO) {
    return this.calculateAutoWidth(input);
  } else if (input.dimension === Dimension.CENTER) {
    return this.calculateCenterWidth(input);
  } else if (input.dimension === Dimension.STRETCH) {
    return this.calculateStretchWidth(input);
  } else if (input.dimension === Dimension.ASPECT_RATIO) {
    return this.calculateAspectRatioWidth(input);
  }
}

// AFTER - Registry lookup
public calculateWidth(input: ISizeStrategyInput): number {
  const strategy = this.strategyRegistry.getStrategy(input.dimension);
  return strategy(input);
}
```

### Step 4: Remove Logging (Phase 5)
```typescript
// BEFORE
import { logger } from '../core/Logger';

export class SizeValueCalculationStrategies {
  public calculate(input: ISizeStrategyInput): number {
    logger.debug('SizeValueCalculationStrategies', 'calculate', 'Starting calculation');
    // ... calculation logic
    logger.info('SizeValueCalculationStrategies', 'calculate', 'Calculation completed');
  }
}

// AFTER
export class SizeValueCalculationStrategies {
  public calculate(input: ISizeStrategyInput): number {
    // ... calculation logic only
  }
}
```

### Step 5: Add DI Container (Phase 4)
```typescript
// BEFORE
export class SizeValueCalculationStrategies {
  constructor() {
    this.someDependency = new SomeClass();
  }
}

// AFTER
export class SizeValueCalculationStrategies {
  constructor(
    private container: IDiContainer,
    private strategyRegistry: SizeValueStrategyRegistry,
    private someDependency: ISomeInterface
  ) {}
}
```

## Dependencies

- **Requires**: SizeValueStrategyRegistry implementation
- **Requires**: Individual strategy functions (7 strategies)
- **Requires**: DI Container implementation
- **Requires**: LoggingDecorator implementation
- **Affects**: All classes using this strategy

## Testing Requirements

- Unit tests for each strategy function
- Integration tests with strategy registry
- Strategy tests with mocked registry
- Decorator tests for logging functionality
- Performance tests to ensure no regression

## Success Criteria

- ✅ No if-chains
- ✅ All strategies registered in registry
- ✅ Strategy uses registry for strategy resolution
- ✅ No logger imports or calls
- ✅ All dependencies injected via DI
- ✅ All tests pass

## Estimated Effort

- **Time**: 6-8 hours
- **Complexity**: High (7 strategies to implement)
- **Risk**: Medium (large refactoring)

## Strategy Implementation Order

1. **High Priority**: WIDTH, HEIGHT, BOTH
2. **Medium Priority**: AUTO, CENTER
3. **Low Priority**: STRETCH, ASPECT_RATIO

## Notes

- This strategy handles size value calculations
- Consider creating separate strategies for each dimension
- Ensure strategy functions are pure and testable

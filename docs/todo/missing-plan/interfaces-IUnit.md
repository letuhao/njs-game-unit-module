# IUnit.ts - Refactoring Plan

## File: `src/interfaces/IUnit.ts`

## Issues Identified

### 1. **ISP:FatInterface** (Line 65)
- **WHY**: Interface has too many responsibilities, violating Interface Segregation Principle
- **WHAT**: Split into narrowly-scoped interfaces per responsibility
- **WHERE**: Line 65 - Interface definition
- **WHEN**: Phase 2 - Interface Segregation
- **HOW**:
  1. Extract calculation interfaces
  2. Extract validation interfaces
  3. Extract formatting interfaces
  4. Keep only essential methods in base interface
- **WHICH**: Interface segregation pattern

## Detailed Refactoring Steps

### Step 1: Analyze Current Interface
```typescript
// BEFORE - Current fat interface
export interface IUnit {
  readonly id: string;
  readonly unitType: UnitType;
  calculate(input: IStrategyInput): number;
  validate(input: IValidationInput): boolean;
  format(value: number): string;
  getMetadata(): Record<string, unknown>;
  setMetadata(metadata: Record<string, unknown>): void;
  // ... many more methods
}
```

### Step 2: Create Segregated Interfaces (Phase 2)
```typescript
// Create src/interfaces/calculation/ICalculatable.ts
export interface ICalculatable {
  calculate(input: IStrategyInput): number;
}

// Create src/interfaces/validation/IValidatable.ts
export interface IValidatable {
  validate(input: IValidationInput): boolean;
}

// Create src/interfaces/formatting/IFormattable.ts
export interface IFormattable {
  format(value: number): string;
}

// Create src/interfaces/metadata/IMetadataProvider.ts
export interface IMetadataProvider {
  getMetadata(): Record<string, unknown>;
  setMetadata(metadata: Record<string, unknown>): void;
}

// Create src/interfaces/identity/IIdentifiable.ts
export interface IIdentifiable {
  readonly id: string;
  readonly unitType: UnitType;
}
```

### Step 3: Update Base Interface (Phase 2)
```typescript
// AFTER - Segregated base interface
export interface IUnit extends IIdentifiable {
  // Only essential methods that all units must have
  // Specific functionality is provided by composition
}
```

### Step 4: Create Composite Interfaces (Phase 2)
```typescript
// Create src/interfaces/composite/IFullUnit.ts
export interface IFullUnit extends IUnit, ICalculatable, IValidatable, IFormattable, IMetadataProvider {
  // Full unit with all capabilities
}

// Create src/interfaces/composite/ICalculationOnlyUnit.ts
export interface ICalculationOnlyUnit extends IUnit, ICalculatable {
  // Unit that only calculates
}

// Create src/interfaces/composite/IValidationOnlyUnit.ts
export interface IValidationOnlyUnit extends IUnit, IValidatable {
  // Unit that only validates
}
```

### Step 5: Update Implementations (Phase 2)
```typescript
// Update concrete implementations
export class SizeUnit implements IFullUnit {
  // Implement all interfaces
}

export class PositionUnit implements ICalculationOnlyUnit {
  // Implement only calculation interface
}

export class ValidationUnit implements IValidationOnlyUnit {
  // Implement only validation interface
}
```

## Dependencies

- **Requires**: Interface segregation implementation
- **Requires**: Update all concrete implementations
- **Requires**: Update all consumers of IUnit
- **Affects**: All classes implementing IUnit

## Testing Requirements

- Unit tests for each segregated interface
- Integration tests for composite interfaces
- Tests for concrete implementations
- Performance tests to ensure no regression

## Success Criteria

- ✅ No fat interfaces
- ✅ Each interface has single responsibility
- ✅ Interfaces are composable
- ✅ All concrete implementations updated
- ✅ All tests pass

## Estimated Effort

- **Time**: 6-8 hours
- **Complexity**: High (affects many implementations)
- **Risk**: High (breaking changes)

## Interface Segregation Order

1. **High Priority**: ICalculatable, IValidatable
2. **Medium Priority**: IFormattable, IMetadataProvider
3. **Low Priority**: IIdentifiable, composite interfaces

## Notes

- This is a critical interface, so changes affect many classes
- Ensure backward compatibility during migration
- Consider using adapter pattern for legacy code

# Missing Tasks Plan - File by File Analysis

This directory contains detailed plans for each file that needs refactoring based on the SOLID bundle analysis.

## Overview

Based on the SOLID bundle review, we have identified **213 specific issues** across **100+ files** that need to be addressed to improve our SOLID score from **6.6/10** to **9.0+/10**.

## File Categories

### 1. **Core Classes** (`src/classes/`)
- Calculator classes with DIP violations and logging issues
- Factory classes needing DI integration
- Random value generators requiring abstraction

### 2. **Interfaces** (`src/interfaces/`)
- Fat interfaces violating ISP
- Large files violating SRP
- Missing interface segregation

### 3. **Strategies** (`src/strategies/`)
- Large switch statements violating OCP
- Cross-cutting logging concerns
- If-chain violations needing registry patterns

### 4. **Managers** (`src/managers/`)
- Fat interfaces and logging violations
- Concrete construction violations
- Cross-cutting concerns

### 5. **Test Files** (`src/test/`)
- Long functions violating SRP
- Concrete construction in tests
- Logging in test files

### 6. **Templates & Commands** (`src/templates/`, `src/commands/`)
- DIP violations with concrete construction
- Logging concerns
- Interface segregation issues

## Execution Order

1. **Phase 1**: Core Infrastructure (DI Container, Tokens)
2. **Phase 2**: Interface Segregation (Split fat interfaces)
3. **Phase 3**: Strategy Registry Implementation (Replace switches)
4. **Phase 4**: Dependency Injection (Replace concrete construction)
5. **Phase 5**: Logging Refactoring (Move to decorators)
6. **Phase 6**: Test Refactoring (Split long functions)
7. **Phase 7**: Performance Optimization
8. **Phase 8**: Final Verification

## File Plans

Each file has its own detailed plan in the format:
- `[filename].md` - Detailed refactoring plan

## Success Criteria

- **SOLID Score**: 9.0+/10 (currently 6.6/10)
- **Test Coverage**: ≥90% for strategies, ≥90% for calculators, ≥85% for adapters/commands
- **Performance**: No regression, optimized hot paths
- **Maintainability**: All SOLID principles followed
- **Documentation**: Complete and up-to-date

## Next Steps

1. Review individual file plans
2. Execute refactoring in phases
3. Verify improvements with SOLID analysis
4. Update documentation

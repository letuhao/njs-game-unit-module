# Phaser Unit System

A comprehensive unit calculation system for Phaser.js games with support for responsive design, validation, and multiple calculation strategies.

## Features

- **Multiple Unit Types**: Support for size, position, and scale units
- **Responsive Design**: Automatic calculation based on viewport dimensions
- **Validation System**: Built-in validation for unit values and calculations
- **Strategy Pattern**: Pluggable calculation strategies
- **Observer Pattern**: Real-time monitoring and logging
- **Command Pattern**: Batch operations and undo/redo support
- **Template Method**: Consistent calculation workflows
- **Memento Pattern**: State management and restoration
- **Composite Pattern**: Group operations on multiple units
- **Adapter Pattern**: Legacy system integration
- **Decorator Pattern**: Enhanced functionality with caching and validation
- **TypeScript**: Full type safety and IntelliSense support

## Installation

```bash
npm install @phaser-game/unit-system
```

## Quick Start

```typescript
import { 
  SizeUnitCalculator, 
  PositionUnitCalculator, 
  ScaleUnitCalculator,
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  UnitType 
} from '@phaser-game/unit-system';

// Create calculators
const sizeCalculator = new SizeUnitCalculator();
const positionCalculator = new PositionUnitCalculator();
const scaleCalculator = new ScaleUnitCalculator();

// Calculate responsive size
const width = sizeCalculator.calculate({
  value: 100,
  unit: SizeUnit.PIXEL,
  context: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    parentWidth: 800,
    parentHeight: 600
  }
});

// Calculate responsive position
const x = positionCalculator.calculate({
  value: 50,
  unit: PositionUnit.PERCENT,
  context: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    parentWidth: 800,
    parentHeight: 600
  }
});

// Calculate responsive scale
const scaleX = scaleCalculator.calculate({
  value: 1.5,
  unit: ScaleUnit.MULTIPLIER,
  context: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    parentWidth: 800,
    parentHeight: 600
  }
});
```

## Unit Types

### Size Units
- `PIXEL` - Fixed pixel values
- `PERCENT` - Percentage of parent container
- `VIEWPORT_WIDTH` - Percentage of viewport width
- `VIEWPORT_HEIGHT` - Percentage of viewport height
- `AUTO` - Automatic calculation based on content

### Position Units
- `PIXEL` - Fixed pixel values
- `PERCENT` - Percentage of parent container
- `CENTER` - Center alignment
- `START` - Start alignment
- `END` - End alignment

### Scale Units
- `MULTIPLIER` - Scale multiplier (1.0 = 100%)
- `PERCENT` - Scale percentage
- `AUTO` - Automatic scaling based on viewport

## Advanced Usage

### Using the Unit System Manager

```typescript
import { UnitSystemManager } from '@phaser-game/unit-system';

const unitManager = new UnitSystemManager();

// Register units
unitManager.registerUnit('button-size', {
  id: 'button-size',
  unitType: UnitType.SIZE,
  value: 200,
  unit: SizeUnit.PIXEL
});

// Calculate with context
const result = unitManager.calculateUnit('button-size', {
  viewportWidth: 1920,
  viewportHeight: 1080,
  parentWidth: 800,
  parentHeight: 600
});
```

### Using Strategies

```typescript
import { SizeUnitStrategy, CalculationStrategy } from '@phaser-game/unit-system';

const strategy = new SizeUnitStrategy();
strategy.setStrategy(CalculationStrategy.RESPONSIVE);

const result = strategy.calculate({
  value: 100,
  unit: SizeUnit.PERCENT,
  context: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    parentWidth: 800,
    parentHeight: 600
  }
});
```

### Using Observers

```typescript
import { PerformanceObserver, LoggingObserver } from '@phaser-game/unit-system';

const performanceObserver = new PerformanceObserver();
const loggingObserver = new LoggingObserver();

// Attach observers to calculators
sizeCalculator.attachObserver(performanceObserver);
sizeCalculator.attachObserver(loggingObserver);
```

### Using Validation

```typescript
import { ValidationDecorator, RangeValidator } from '@phaser-game/unit-system';

const validator = new RangeValidator(0, 1000);
const validatedCalculator = new ValidationDecorator(sizeCalculator, validator);

// This will validate the result before returning
const result = validatedCalculator.calculate({
  value: 500,
  unit: SizeUnit.PIXEL,
  context: { /* ... */ }
});
```

## API Reference

### Core Classes

- `SizeUnitCalculator` - Calculate responsive sizes
- `PositionUnitCalculator` - Calculate responsive positions  
- `ScaleUnitCalculator` - Calculate responsive scales
- `UnitCalculatorFactory` - Factory for creating calculators
- `UnitSystemManager` - Central management system

### Enums

- `SizeUnit` - Size unit types
- `PositionUnit` - Position unit types
- `ScaleUnit` - Scale unit types
- `UnitType` - Unit type categories
- `CalculationStrategy` - Calculation strategies

### Interfaces

- `IUnit` - Base unit interface
- `ISizeUnit` - Size unit interface
- `IPositionUnit` - Position unit interface
- `IScaleUnit` - Scale unit interface
- `IUnitConfig` - Unit configuration interface

## Examples

See the `examples/` directory for complete usage examples:

- `ContainerIntegrationExample.ts` - Integration with Phaser containers
- `PhaserGameObjectExample.ts` - Integration with Phaser game objects

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test:coverage

# Run tests in watch mode
npm test:watch
```

## Building

```bash
# Build the package
npm run build

# Build in watch mode
npm run build:watch

# Type check
npm run type-check
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Changelog

### 1.0.0
- Initial release
- Complete unit system with all patterns
- TypeScript support
- Comprehensive test coverage
- Documentation and examples

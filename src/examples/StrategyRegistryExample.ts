import { initializeContainer, getContainer } from '../container/ContainerSetup';
import { TOKENS } from '../container/Tokens';
import { RefactoredSizeUnitCalculatorWithStrategy } from '../classes/RefactoredSizeUnitCalculatorWithStrategy';
import { RefactoredPositionUnitCalculatorWithStrategy } from '../classes/RefactoredPositionUnitCalculatorWithStrategy';
import { RefactoredScaleUnitCalculatorWithStrategy } from '../classes/RefactoredScaleUnitCalculatorWithStrategy';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';

/**
 * Example demonstrating Strategy Registry pattern
 * Shows how switch statements are replaced with strategy registries
 */
export class StrategyRegistryExample {
  private container = getContainer();

  constructor() {
    // Initialize the container with all services
    initializeContainer();
  }

  /**
   * Demonstrate size unit calculation with strategy registry
   */
  public demonstrateSizeCalculation(): void {
    console.log('=== Size Unit Calculation with Strategy Registry ===');

    const calculator = new RefactoredSizeUnitCalculatorWithStrategy(
      this.container,
      SizeUnit.PERCENTAGE
    );

    const input = {
      value: 50, // 50%
      context: {
        parent: { width: 800, height: 600 }
      }
    };

    const result = calculator.calculate(input);
    console.log(`50% of 800px = ${result}px`);

    // Show available units
    console.log('Available size units:', calculator.getAvailableSizeUnits());
    console.log('Is PIXEL supported?', calculator.isSizeUnitSupported(SizeUnit.PIXEL));
  }

  /**
   * Demonstrate position unit calculation with strategy registry
   */
  public demonstratePositionCalculation(): void {
    console.log('\n=== Position Unit Calculation with Strategy Registry ===');

    const calculator = new RefactoredPositionUnitCalculatorWithStrategy(
      this.container,
      PositionUnit.CENTER
    );

    const input = {
      value: 0, // Center doesn't need a value
      context: {
        parent: { width: 800, height: 600 },
        content: { width: 200, height: 100 }
      }
    };

    const result = calculator.calculate(input);
    console.log(`Center position in 800px container with 200px content = ${result}px`);

    // Show available units
    console.log('Available position units:', calculator.getAvailablePositionUnits());
  }

  /**
   * Demonstrate scale unit calculation with strategy registry
   */
  public demonstrateScaleCalculation(): void {
    console.log('\n=== Scale Unit Calculation with Strategy Registry ===');

    const calculator = new RefactoredScaleUnitCalculatorWithStrategy(
      this.container,
      ScaleUnit.VIEWPORT_WIDTH
    );

    const input = {
      value: 100, // 100% of viewport width
      context: {
        viewport: { width: 1920, height: 1080 }
      }
    };

    const result = calculator.calculate(input);
    console.log(`100% of 1920px viewport = ${result} scale factor`);

    // Show available units
    console.log('Available scale units:', calculator.getAvailableScaleUnits());
  }

  /**
   * Demonstrate strategy registry statistics
   */
  public demonstrateRegistryStatistics(): void {
    console.log('\n=== Strategy Registry Statistics ===');

    const sizeRegistry = this.container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY) as any;
    const positionRegistry = this.container.resolve(TOKENS.POSITION_VALUE_STRATEGY_REGISTRY) as any;
    const scaleRegistry = this.container.resolve(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY) as any;

    console.log('Size Registry:', sizeRegistry.getStatistics?.());
    console.log('Position Registry:', positionRegistry.getStatistics?.());
    console.log('Scale Registry:', scaleRegistry.getStatistics?.());
  }

  /**
   * Run all demonstrations
   */
  public runAllDemonstrations(): void {
    this.demonstrateSizeCalculation();
    this.demonstratePositionCalculation();
    this.demonstrateScaleCalculation();
    this.demonstrateRegistryStatistics();
  }
}

// Example usage
if (require.main === module) {
  const example = new StrategyRegistryExample();
  example.runAllDemonstrations();
}

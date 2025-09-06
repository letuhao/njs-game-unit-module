import { initializeContainer, getContainer } from '../container/ContainerSetup';
import { TOKENS } from '../container/Tokens';
import { DecoratorFactory } from '../decorators/DecoratorFactory';
import { RefactoredSizeUnitCalculatorWithStrategy } from '../classes/RefactoredSizeUnitCalculatorWithStrategy';
import { RefactoredPositionUnitCalculatorWithStrategy } from '../classes/RefactoredPositionUnitCalculatorWithStrategy';
import { RefactoredScaleUnitCalculatorWithStrategy } from '../classes/RefactoredScaleUnitCalculatorWithStrategy';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';

/**
 * Example demonstrating Logging Decorator pattern
 * Shows how to move logging concerns to decorators
 */
export class LoggingDecoratorExample {
  private container = getContainer();
  private decoratorFactory: DecoratorFactory;

  constructor() {
    // Initialize the container with all services
    initializeContainer();
    
    // Create decorator factory
    this.decoratorFactory = new DecoratorFactory(this.container);
  }

  /**
   * Demonstrate basic logging decorator
   */
  public demonstrateBasicLoggingDecorator(): void {
    console.log('=== Basic Logging Decorator ===');

    // Create a calculator
    const calculator = new RefactoredSizeUnitCalculatorWithStrategy(
      this.container,
      SizeUnit.PERCENT
    );

    // Apply logging decorator
    const decoratedCalculator = this.decoratorFactory.applyLoggingDecorator(calculator, {
      logLevel: 'debug',
      logPerformance: true,
      logValidation: true,
      logCalculation: true
    });

    // Test calculation with logging
    const context = {
      parent: { width: 800, height: 600 }
    };

    const input = {
      value: 50,
      context
    };

    console.log('Performing calculation with logging...');
    const result = decoratedCalculator.calculate(input);
    console.log(`Result: ${result}px`);

    // Test validation with logging
    console.log('Performing validation with logging...');
    const isValid = decoratedCalculator.validate(input);
    console.log(`Validation result: ${isValid}`);
  }

  /**
   * Demonstrate performance logging decorator
   */
  public demonstratePerformanceLoggingDecorator(): void {
    console.log('\n=== Performance Logging Decorator ===');

    // Create a calculator
    const calculator = new RefactoredPositionUnitCalculatorWithStrategy(
      this.container,
      PositionUnit.CENTER
    );

    // Apply performance decorator
    const decoratedCalculator = this.decoratorFactory.applyPerformanceDecorator(calculator, {
      logThreshold: 10, // Log operations taking longer than 10ms
      trackMetrics: true,
      logSlowOperations: true
    });

    // Perform multiple calculations to generate metrics
    const context = {
      parent: { width: 800, height: 600 },
      content: { width: 200, height: 100 }
    };

    const input = {
      value: 0,
      context
    };

    console.log('Performing multiple calculations for performance metrics...');
    for (let i = 0; i < 5; i++) {
      decoratedCalculator.calculate(input);
    }

    // Get performance metrics (cast to PerformanceLoggingDecorator to access specific methods)
    const performanceDecorator = decoratedCalculator as any;
    if (performanceDecorator.getPerformanceMetrics) {
      const metrics = performanceDecorator.getPerformanceMetrics();
      console.log('Performance Metrics:', metrics);
    }

    if (performanceDecorator.getPerformanceReport) {
      const report = performanceDecorator.getPerformanceReport();
      console.log('Performance Report:', report);
    }
  }

  /**
   * Demonstrate multiple decorators
   */
  public demonstrateMultipleDecorators(): void {
    console.log('\n=== Multiple Decorators ===');

    // Create a calculator
    const calculator = new RefactoredScaleUnitCalculatorWithStrategy(
      this.container,
      ScaleUnit.RESPONSIVE
    );

    // Apply multiple decorators
    const decoratedCalculator = this.decoratorFactory.applyDecorators(calculator, {
      logging: {
        enabled: true,
        options: {
          logLevel: 'info',
          logPerformance: true,
          logValidation: true,
          logCalculation: true
        }
      },
      performance: {
        enabled: true,
        options: {
          logThreshold: 5,
          trackMetrics: true,
          logSlowOperations: true
        }
      },
      validation: {
        enabled: true
      },
      caching: {
        enabled: true,
        keyFunction: (context: any) => `scale_${JSON.stringify(context)}`
      }
    });

    // Test with logging, performance, validation, and caching
    const context = {
      viewport: { width: 1920, height: 1080 }
    };

    const input = {
      value: 100,
      context
    };

    console.log('Performing calculation with all decorators...');
    const result1 = decoratedCalculator.calculate(input);
    console.log(`First calculation result: ${result1}`);

    // Second calculation should use cache
    const result2 = decoratedCalculator.calculate(input);
    console.log(`Second calculation result: ${result2} (should be cached)`);

    // Get performance metrics (cast to PerformanceLoggingDecorator to access specific methods)
    const performanceDecorator = decoratedCalculator as any;
    if (performanceDecorator.getPerformanceMetrics) {
      const metrics = performanceDecorator.getPerformanceMetrics();
      console.log('Performance Metrics:', metrics);
    }
  }

  /**
   * Demonstrate production vs development configurations
   */
  public demonstrateConfigurationProfiles(): void {
    console.log('\n=== Configuration Profiles ===');

    // Create calculators
    const calculator1 = new RefactoredSizeUnitCalculatorWithStrategy(
      this.container,
      SizeUnit.PERCENT
    );

    const calculator2 = new RefactoredSizeUnitCalculatorWithStrategy(
      this.container,
      SizeUnit.PERCENT
    );

    // Apply production configuration
    const productionCalculator = this.decoratorFactory.createProductionDecoratedUnit(calculator1);
    
    // Apply development configuration
    const developmentCalculator = this.decoratorFactory.createDevelopmentDecoratedUnit(calculator2);

    const context = {
      parent: { width: 800, height: 600 }
    };

    const input = {
      value: 50,
      context
    };

    console.log('Testing production calculator (minimal logging)...');
    const productionResult = productionCalculator.calculate(input);
    console.log(`Production result: ${productionResult}`);

    console.log('Testing development calculator (full logging)...');
    const developmentResult = developmentCalculator.calculate(input);
    console.log(`Development result: ${developmentResult}`);
  }

  /**
   * Demonstrate decorator factory capabilities
   */
  public demonstrateDecoratorFactory(): void {
    console.log('\n=== Decorator Factory Capabilities ===');

    // Get available decorators
    const availableDecorators = this.decoratorFactory.getAvailableDecorators();
    console.log('Available decorators:', availableDecorators);

    // Get configuration template
    const configTemplate = this.decoratorFactory.getDecoratorConfigurationTemplate();
    console.log('Configuration template:', JSON.stringify(configTemplate, null, 2));

    // Create a fully decorated unit
    const calculator = new RefactoredSizeUnitCalculatorWithStrategy(
      this.container,
      SizeUnit.PERCENT
    );

    const fullyDecorated = this.decoratorFactory.createFullyDecoratedUnit(calculator, {
      enableLogging: true,
      enablePerformance: true,
      enableValidation: true,
      enableCaching: true,
      logLevel: 'debug',
      performanceThreshold: 1,
      cacheKeyFunction: (context: any) => `full_${JSON.stringify(context)}`
    });

    console.log('Created fully decorated unit:', fullyDecorated.toString());
  }

  /**
   * Run all demonstrations
   */
  public runAllDemonstrations(): void {
    this.demonstrateBasicLoggingDecorator();
    this.demonstratePerformanceLoggingDecorator();
    this.demonstrateMultipleDecorators();
    this.demonstrateConfigurationProfiles();
    this.demonstrateDecoratorFactory();
  }
}

// Example usage
if (require.main === module) {
  const example = new LoggingDecoratorExample();
  example.runAllDemonstrations();
}

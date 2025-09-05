import { initializeContainer, getContainer } from '../container/ContainerSetup';
import { TOKENS } from '../container/Tokens';
import { UnitSystemManagerFactory } from '../factories/UnitSystemManagerFactory';
import { RefactoredUnitCalculatorFactory } from '../factories/RefactoredUnitCalculatorFactory';
import { RefactoredSizeUnitCalculatorWithStrategy } from '../classes/RefactoredSizeUnitCalculatorWithStrategy';
import { RefactoredPositionUnitCalculatorWithStrategy } from '../classes/RefactoredPositionUnitCalculatorWithStrategy';
import { RefactoredScaleUnitCalculatorWithStrategy } from '../classes/RefactoredScaleUnitCalculatorWithStrategy';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { UnitType } from '../enums/UnitType';

/**
 * Example demonstrating Dependency Injection pattern
 * Shows how to replace concrete construction with DI throughout the system
 */
export class DependencyInjectionExample {
  private container = getContainer();

  constructor() {
    // Initialize the container with all services
    initializeContainer();
  }

  /**
   * Demonstrate UnitSystemManager with dependency injection
   */
  public demonstrateUnitSystemManagerDI(): void {
    console.log('=== UnitSystemManager with Dependency Injection ===');

    // Create factory with injected container
    const systemManagerFactory = new UnitSystemManagerFactory(this.container);
    
    // Create system manager with all dependencies injected
    const systemManager = systemManagerFactory.createUnitSystemManager();
    
    // Initialize the system
    systemManager.initialize();
    
    // Get system status
    const status = systemManager.getSystemStatus();
    console.log('System Status:', status);
    
    // Get performance metrics
    const metrics = systemManager.getPerformanceMetrics();
    console.log('Performance Metrics:', metrics);
    
    // Get system health
    const health = systemManager.getSystemHealth();
    console.log('System Health:', health);
    
    // Shutdown the system
    systemManager.shutdown();
  }

  /**
   * Demonstrate UnitCalculatorFactory with dependency injection
   */
  public demonstrateUnitCalculatorFactoryDI(): void {
    console.log('\n=== UnitCalculatorFactory with Dependency Injection ===');

    // Create factory with injected container
    const calculatorFactory = new RefactoredUnitCalculatorFactory(this.container);
    
    // Create calculators using the factory
    const sizeCalculator = calculatorFactory.createSizeCalculator(
      'size-1',
      'Main Size Calculator',
      SizeUnit.PERCENT,
      'width',
      50,
      false
    );
    
    const positionCalculator = calculatorFactory.createPositionCalculator(
      'position-1',
      'Main Position Calculator',
      PositionUnit.CENTER,
      'x',
      0
    );
    
    const scaleCalculator = calculatorFactory.createScaleCalculator(
      'scale-1',
      'Main Scale Calculator',
      ScaleUnit.RESPONSIVE,
      1.0,
      true
    );
    
    console.log('Created calculators:', {
      size: sizeCalculator.id,
      position: positionCalculator.id,
      scale: scaleCalculator.id
    });
    
    // Get factory statistics
    const stats = calculatorFactory.getStatistics();
    console.log('Factory Statistics:', stats);
  }

  /**
   * Demonstrate Strategy-based Calculators with dependency injection
   */
  public demonstrateStrategyCalculatorsDI(): void {
    console.log('\n=== Strategy-based Calculators with Dependency Injection ===');

    // Create calculators with strategy registries injected
    const sizeCalculator = new RefactoredSizeUnitCalculatorWithStrategy(
      this.container,
      SizeUnit.PERCENT
    );
    
    const positionCalculator = new RefactoredPositionUnitCalculatorWithStrategy(
      this.container,
      PositionUnit.CENTER
    );
    
    const scaleCalculator = new RefactoredScaleUnitCalculatorWithStrategy(
      this.container,
      ScaleUnit.RESPONSIVE
    );
    
    // Test size calculation
    const sizeInput = {
      value: 50,
      context: {
        parent: { width: 800, height: 600 }
      }
    };
    
    const sizeResult = sizeCalculator.calculate(sizeInput);
    console.log(`Size calculation: 50% of 800px = ${sizeResult}px`);
    
    // Test position calculation
    const positionInput = {
      value: 0,
      context: {
        parent: { width: 800, height: 600 },
        content: { width: 200, height: 100 }
      }
    };
    
    const positionResult = positionCalculator.calculate(positionInput);
    console.log(`Position calculation: Center in 800px with 200px content = ${positionResult}px`);
    
    // Test scale calculation
    const scaleInput = {
      value: 100,
      context: {
        viewport: { width: 1920, height: 1080 }
      }
    };
    
    const scaleResult = scaleCalculator.calculate(scaleInput);
    console.log(`Scale calculation: 100% responsive = ${scaleResult} scale factor`);
  }

  /**
   * Demonstrate container statistics and validation
   */
  public demonstrateContainerStatistics(): void {
    console.log('\n=== Container Statistics and Validation ===');

    // Get container statistics
    const stats = this.container.getStatistics();
    console.log('Container Statistics:', stats);
    
    // Validate container dependencies
    const validation = this.container.validate();
    console.log('Container Validation:', validation);
    
    if (!validation.valid) {
      console.error('Container validation failed:', validation.errors);
    } else {
      console.log('✅ Container validation passed');
    }
    
    // Get dependency graph
    const dependencyGraph = this.container.getDependencyGraph();
    console.log('Dependency Graph:', Object.fromEntries(dependencyGraph));
  }

  /**
   * Demonstrate different container configurations
   */
  public demonstrateContainerConfigurations(): void {
    console.log('\n=== Different Container Configurations ===');

    // Create a child container for testing
    const childContainer = this.container.createChild();
    console.log('Child container created');
    
    // Get child container statistics
    const childStats = childContainer.getStatistics();
    console.log('Child Container Statistics:', childStats);
    
    // Create a system manager with custom configuration
    const systemManagerFactory = new UnitSystemManagerFactory(this.container);
    const customSystemManager = systemManagerFactory.createUnitSystemManagerWithConfig({
      maxUnits: 500,
      performanceMonitoring: false,
      memoryLimit: 50 * 1024 * 1024 // 50MB
    });
    
    customSystemManager.initialize();
    const customConfig = customSystemManager.getConfiguration();
    console.log('Custom Configuration:', customConfig);
  }

  /**
   * Run all demonstrations
   */
  public runAllDemonstrations(): void {
    this.demonstrateUnitSystemManagerDI();
    this.demonstrateUnitCalculatorFactoryDI();
    this.demonstrateStrategyCalculatorsDI();
    this.demonstrateContainerStatistics();
    this.demonstrateContainerConfigurations();
  }
}

// Example usage
if (require.main === module) {
  const example = new DependencyInjectionExample();
  example.runAllDemonstrations();
}

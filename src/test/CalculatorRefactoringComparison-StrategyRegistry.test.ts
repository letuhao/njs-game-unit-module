import { RefactoredSizeUnitCalculator } from '../classes/RefactoredSizeUnitCalculator';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import {
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy,
} from '../strategies/value';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';

describe('Calculator Refactoring Comparison - Strategy Registry', () => {
  let refactoredCalculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    setupTestEnvironment();
  });

  describe('Strategy Registry Integration', () => {
    it('should use strategy registry effectively', () => {
      testStrategyRegistryIntegration();
    });

    it('should handle strategy selection correctly', () => {
      testStrategySelection();
    });

    it('should provide strategy statistics', () => {
      testStrategyStatistics();
    });
  });

  describe('Maintainability Improvements', () => {
    it('should be easier to extend with new strategies', () => {
      testExtensibility();
    });

    it('should provide better debugging information', () => {
      testDebuggingInformation();
    });

    it('should have cleaner separation of concerns', () => {
      testSeparationOfConcerns();
    });
  });

  // Helper functions for test setup and execution

  function setupTestEnvironment(): void {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();

    // Register all strategies
    strategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());

    // Pre-warm cache for better performance
    strategyRegistry.preWarmCache();

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  }

  function testStrategyRegistryIntegration(): void {
    const stats = strategyRegistry.getRegistryStatistics();
    expect(stats.totalRegistrations).toBeGreaterThan(0);
    expect(stats.successfulRetrievals).toBeGreaterThan(0);
  }

  function testStrategySelection(): void {
    const strategy = strategyRegistry.findBestStrategy(
      SizeValue.FILL,
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH
    );
    expect(strategy).toBeDefined();
    expect(strategy?.strategyId).toBe('fill-size-calculation');
  }

  function testStrategyStatistics(): void {
    const stats = strategyRegistry.getRegistryStatistics();
    expect(stats).toHaveProperty('totalRegistrations');
    expect(stats).toHaveProperty('totalRetrievals');
    expect(stats).toHaveProperty('successfulRetrievals');
    expect(stats).toHaveProperty('failedRetrievals');
  }

  function testExtensibility(): void {
    // Test that new strategies can be easily added
    const customStrategy = {
      strategyId: 'custom-strategy',
      sizeValue: SizeValue.FILL,
      sizeUnit: SizeUnit.PIXEL,
      dimension: Dimension.WIDTH,
      canHandle: () => true,
      calculate: () => 999,
    };

    strategyRegistry.registerStrategy(customStrategy as any);
    const strategy = strategyRegistry.getStrategy('custom-strategy');
    expect(strategy).toBeDefined();
  }

  function testDebuggingInformation(): void {
    const stats = strategyRegistry.getRegistryStatistics();
    expect(stats).toHaveProperty('averageRetrievalTime');
    expect(stats).toHaveProperty('strategiesByType');
  }

  function testSeparationOfConcerns(): void {
    // Test that strategy selection is separate from calculation logic
    const strategy = strategyRegistry.findBestStrategy(
      SizeValue.FILL,
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH
    );
    
    expect(strategy).toBeDefined();
    expect(strategy?.canHandle).toBeDefined();
    expect(strategy?.calculate).toBeDefined();
  }
});

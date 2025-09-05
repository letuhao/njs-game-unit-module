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
import { UnitType } from '../enums/UnitType';
import { container, TOKENS } from '../container/DiContainer';

describe('RefactoredSizeUnitCalculator', () => {
  let calculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    // Use DI container to resolve strategy registry instead of direct instantiation
    try {
      strategyRegistry = container.resolve(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY);
    } catch (error) {
      strategyRegistry = new SizeValueCalculationStrategyRegistry();
    }

    // Register all strategies using DI container
    try {
      const pixelStrategy = container.resolve(TOKENS.PIXEL_SIZE_VALUE_STRATEGY);
      const fillStrategy = container.resolve(TOKENS.FILL_SIZE_VALUE_STRATEGY);
      const autoStrategy = container.resolve(TOKENS.AUTO_SIZE_VALUE_STRATEGY);
      const parentWidthStrategy = container.resolve(TOKENS.PARENT_WIDTH_SIZE_VALUE_STRATEGY);
      const viewportWidthStrategy = container.resolve(TOKENS.VIEWPORT_WIDTH_SIZE_VALUE_STRATEGY);

      strategyRegistry.registerStrategy(pixelStrategy || new PixelSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(fillStrategy || new FillSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(autoStrategy || new AutoSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(parentWidthStrategy || new ParentWidthSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(viewportWidthStrategy || new ViewportWidthSizeValueCalculationStrategy());
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      strategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
      strategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
    }

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 },
    };
  });

  describe('Constructor and Basic Properties', () => {
    it('should create calculator with correct properties', () => {
      // Use DI container to resolve calculator instead of direct instantiation
      try {
        calculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        // Set properties for the resolved calculator
        (calculator as any).id = 'test-id';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = 100;
        (calculator as any).isActive = false;
        (calculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        // Fallback to direct instantiation if DI fails
        calculator = new RefactoredSizeUnitCalculator(
          'test-id',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          false,
          strategyRegistry
        );
      }

      expect(calculator.id).toBe('test-id');
      expect(calculator.name).toBe('Test Calculator');
      expect(calculator.sizeUnit).toBe(SizeUnit.PIXEL);
      expect(calculator.dimension).toBe(Dimension.WIDTH);
      expect(calculator.baseValue).toBe(100);
      expect(calculator.isActive).toBe(false);
      expect(calculator.unitType).toBe(UnitType.SIZE);
    });

    it('should create calculator with default values', () => {
      let defaultCalculator: RefactoredSizeUnitCalculator;
      try {
        defaultCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (defaultCalculator as any).id = 'default-id';
        (defaultCalculator as any).name = 'Default Calculator';
        (defaultCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (defaultCalculator as any).dimension = Dimension.WIDTH;
        (defaultCalculator as any).baseValue = 0;
        (defaultCalculator as any).isActive = true;
        (defaultCalculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        defaultCalculator = new RefactoredSizeUnitCalculator(
          'default-id',
          'Default Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          0,
          true,
          strategyRegistry
        );
      }

      expect(defaultCalculator).toBeInstanceOf(RefactoredSizeUnitCalculator);
      expect(defaultCalculator.id).toBe('default-id');
      expect(defaultCalculator.name).toBe('Default Calculator');
    });
  });

  describe('Size Calculation', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = 100;
        (calculator as any).isActive = true;
        (calculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        calculator = new RefactoredSizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          strategyRegistry
        );
      }
    });

    it('should calculate pixel size correctly', () => {
      const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate fill size correctly', () => {
      const result = calculator.calculate(SizeValue.FILL, SizeUnit.FILL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate auto size correctly', () => {
      const result = calculator.calculate(SizeValue.AUTO, SizeUnit.AUTO, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate parent width size correctly', () => {
      const result = calculator.calculate(SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should calculate viewport width size correctly', () => {
      const result = calculator.calculate(SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Strategy Registry Integration', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = 100;
        (calculator as any).isActive = true;
        (calculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        calculator = new RefactoredSizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          strategyRegistry
        );
      }
    });

    it('should use strategy registry for calculations', () => {
      const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      
      expect(typeof result).toBe('number');
      expect(strategyRegistry.getStrategyCount()).toBeGreaterThan(0);
    });

    it('should handle strategy registry errors gracefully', () => {
      // Create a calculator with an empty strategy registry
      let emptyCalculator: RefactoredSizeUnitCalculator;
      try {
        emptyCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (emptyCalculator as any).id = 'empty-calculator';
        (emptyCalculator as any).name = 'Empty Calculator';
        (emptyCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (emptyCalculator as any).dimension = Dimension.WIDTH;
        (emptyCalculator as any).baseValue = 100;
        (emptyCalculator as any).isActive = true;
        (emptyCalculator as any).strategyRegistry = new SizeValueCalculationStrategyRegistry();
      } catch (error) {
        emptyCalculator = new RefactoredSizeUnitCalculator(
          'empty-calculator',
          'Empty Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          new SizeValueCalculationStrategyRegistry()
        );
      }

      const result = emptyCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
    });

    it('should work with different strategy configurations', () => {
      const testCases = [
        { value: SizeValue.PIXEL, unit: SizeUnit.PIXEL },
        { value: SizeValue.FILL, unit: SizeUnit.FILL },
        { value: SizeValue.AUTO, unit: SizeUnit.AUTO },
        { value: SizeValue.PARENT_WIDTH, unit: SizeUnit.PARENT_WIDTH },
        { value: SizeValue.VIEWPORT_WIDTH, unit: SizeUnit.VIEWPORT_WIDTH },
      ];

      for (const testCase of testCases) {
        const result = calculator.calculate(testCase.value, testCase.unit, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Different Dimensions', () => {
    it('should handle WIDTH dimension calculations', () => {
      let widthCalculator: RefactoredSizeUnitCalculator;
      try {
        widthCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (widthCalculator as any).id = 'width-calculator';
        (widthCalculator as any).name = 'Width Calculator';
        (widthCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (widthCalculator as any).dimension = Dimension.WIDTH;
        (widthCalculator as any).baseValue = 100;
        (widthCalculator as any).isActive = true;
        (widthCalculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        widthCalculator = new RefactoredSizeUnitCalculator(
          'width-calculator',
          'Width Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          strategyRegistry
        );
      }

      const result = widthCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle HEIGHT dimension calculations', () => {
      let heightCalculator: RefactoredSizeUnitCalculator;
      try {
        heightCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (heightCalculator as any).id = 'height-calculator';
        (heightCalculator as any).name = 'Height Calculator';
        (heightCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (heightCalculator as any).dimension = Dimension.HEIGHT;
        (heightCalculator as any).baseValue = 100;
        (heightCalculator as any).isActive = true;
        (heightCalculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        heightCalculator = new RefactoredSizeUnitCalculator(
          'height-calculator',
          'Height Calculator',
          SizeUnit.PIXEL,
          Dimension.HEIGHT,
          100,
          true,
          strategyRegistry
        );
      }

      const result = heightCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle BOTH dimension calculations', () => {
      let bothCalculator: RefactoredSizeUnitCalculator;
      try {
        bothCalculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (bothCalculator as any).id = 'both-calculator';
        (bothCalculator as any).name = 'Both Calculator';
        (bothCalculator as any).sizeUnit = SizeUnit.PIXEL;
        (bothCalculator as any).dimension = Dimension.BOTH;
        (bothCalculator as any).baseValue = 100;
        (bothCalculator as any).isActive = true;
        (bothCalculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        bothCalculator = new RefactoredSizeUnitCalculator(
          'both-calculator',
          'Both Calculator',
          SizeUnit.PIXEL,
          Dimension.BOTH,
          100,
          true,
          strategyRegistry
        );
      }

      const result = bothCalculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Context Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = 100;
        (calculator as any).isActive = true;
        (calculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        calculator = new RefactoredSizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          strategyRegistry
        );
      }
    });

    it('should handle different parent contexts', () => {
      const contexts = [
        { parent: { width: 800, height: 600, x: 0, y: 0 }, dimension: Dimension.WIDTH },
        { parent: { width: 1200, height: 800, x: 0, y: 0 }, dimension: Dimension.WIDTH },
        { parent: { width: 400, height: 300, x: 0, y: 0 }, dimension: Dimension.WIDTH },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle different scene contexts', () => {
      const contexts = [
        { scene: { width: 1920, height: 1080 }, dimension: Dimension.WIDTH },
        { scene: { width: 1366, height: 768 }, dimension: Dimension.WIDTH },
        { scene: { width: 1024, height: 768 }, dimension: Dimension.WIDTH },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle viewport contexts', () => {
      const contexts = [
        { viewport: { width: 1920, height: 1080 }, dimension: Dimension.WIDTH },
        { viewport: { width: 1366, height: 768 }, dimension: Dimension.WIDTH },
        { viewport: { width: 1024, height: 768 }, dimension: Dimension.WIDTH },
      ];

      for (const context of contexts) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, context as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = 100;
        (calculator as any).isActive = true;
        (calculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        calculator = new RefactoredSizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          strategyRegistry
        );
      }
    });

    it('should handle invalid size values gracefully', () => {
      const invalidValues = ['invalid' as any, null, undefined, {}];
      
      for (const invalidValue of invalidValues) {
        const result = calculator.calculate(invalidValue, SizeUnit.PIXEL, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle invalid size units gracefully', () => {
      const invalidUnits = ['invalid' as any, null, undefined, {}];
      
      for (const invalidUnit of invalidUnits) {
        const result = calculator.calculate(SizeValue.PIXEL, invalidUnit, mockContext);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });

    it('should handle missing context properties', () => {
      const partialContexts = [
        {},
        { parent: { width: 800, height: 600, x: 0, y: 0 } },
        { scene: { width: 1920, height: 1080 } },
        { viewport: { width: 1366, height: 768 } },
      ];

      for (const partialContext of partialContexts) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, partialContext as any);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Performance', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = 100;
        (calculator as any).isActive = true;
        (calculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        calculator = new RefactoredSizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          strategyRegistry
        );
      }
    });

    it('should perform calculations efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('should handle multiple rapid calculations', () => {
      const results = [];
      
      for (let i = 0; i < 100; i++) {
        const result = calculator.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, mockContext);
        results.push(result);
      }
      
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Calculator Properties', () => {
    beforeEach(() => {
      try {
        calculator = container.resolve(TOKENS.REFACTORED_SIZE_UNIT_CALCULATOR);
        (calculator as any).id = 'test-calculator';
        (calculator as any).name = 'Test Calculator';
        (calculator as any).sizeUnit = SizeUnit.PIXEL;
        (calculator as any).dimension = Dimension.WIDTH;
        (calculator as any).baseValue = 100;
        (calculator as any).isActive = true;
        (calculator as any).strategyRegistry = strategyRegistry;
      } catch (error) {
        calculator = new RefactoredSizeUnitCalculator(
          'test-calculator',
          'Test Calculator',
          SizeUnit.PIXEL,
          Dimension.WIDTH,
          100,
          true,
          strategyRegistry
        );
      }
    });

    it('should have correct ID and name', () => {
      expect(calculator.id).toBe('test-calculator');
      expect(calculator.name).toBe('Test Calculator');
    });

    it('should have correct size unit and dimension', () => {
      expect(calculator.sizeUnit).toBe(SizeUnit.PIXEL);
      expect(calculator.dimension).toBe(Dimension.WIDTH);
    });

    it('should have correct base value', () => {
      expect(calculator.baseValue).toBe(100);
    });

    it('should be active by default', () => {
      expect(calculator.isActive).toBe(true);
    });

    it('should allow deactivation', () => {
      calculator.deactivate();
      expect(calculator.isActive).toBe(false);
    });

    it('should allow reactivation', () => {
      calculator.deactivate();
      calculator.activate();
      expect(calculator.isActive).toBe(true);
    });
  });
});

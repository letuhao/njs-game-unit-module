import {
  PerformanceComparisonSystem,
  TestScenario,
} from '../testing/performance/PerformanceComparisonSystem';
import { UnitContext } from '../interfaces/IUnit';
import { ISizeUnitConfig, IPositionUnitConfig, IScaleUnitConfig } from '../interfaces/IUnitConfig';
import { SizeValue } from '../enums/SizeValue';
import { PositionValue } from '../enums/PositionValue';
import { ScaleValue } from '../enums/ScaleValue';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';
import { container, TOKENS } from '../container/DiContainer';

describe('PerformanceComparisonSystem', () => {
  let performanceSystem: PerformanceComparisonSystem;

  beforeEach(() => {
    // Use DI container to resolve performance system instead of direct instantiation
    try {
      performanceSystem = container.resolve(TOKENS.PERFORMANCE_COMPARISON_SYSTEM);
    } catch (error) {
      // Fallback to direct instantiation if DI fails
      performanceSystem = new PerformanceComparisonSystem();
    }
  });

  describe('Performance Comparison', () => {
    it('should run performance comparison between original and refactored systems', async () => {
      // Create test scenarios
      const scenarios: TestScenario[] = [
        {
          id: 'basic-size-test',
          name: 'Basic Size Calculation Test',
          description: 'Test basic size calculations with pixel values',
          iterations: 1000,
          warmupIterations: 100,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'size-1',
              name: 'Test Size 1',
              sizeUnit: SizeUnit.PIXEL,
              dimension: Dimension.WIDTH,
              baseValue: SizeValue.PIXEL,
            } as ISizeUnitConfig,
          ],
        },
        {
          id: 'basic-position-test',
          name: 'Basic Position Calculation Test',
          description: 'Test basic position calculations with pixel values',
          iterations: 1000,
          warmupIterations: 100,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'position-1',
              name: 'Test Position 1',
              positionUnit: PositionUnit.PIXEL,
              dimension: Dimension.X,
              baseValue: PositionValue.PIXEL,
            } as IPositionUnitConfig,
          ],
        },
        {
          id: 'basic-scale-test',
          name: 'Basic Scale Calculation Test',
          description: 'Test basic scale calculations with factor values',
          iterations: 1000,
          warmupIterations: 100,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'scale-1',
              name: 'Test Scale 1',
              scaleUnit: ScaleUnit.FACTOR,
              dimension: Dimension.BOTH,
              baseValue: ScaleValue.FACTOR,
            } as IScaleUnitConfig,
          ],
        },
      ];

      // Run performance comparison
      const results = await performanceSystem.runComparison(scenarios);

      // Verify results
      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(scenarios.length);

      // Check each result
      results.forEach((result, index) => {
        expect(result.scenarioId).toBe(scenarios[index].id);
        expect(result.scenarioName).toBe(scenarios[index].name);
        expect(result.originalSystem).toBeDefined();
        expect(result.refactoredSystem).toBeDefined();
        expect(result.improvement).toBeDefined();
        expect(typeof result.improvement.percentage).toBe('number');
        expect(typeof result.improvement.factor).toBe('number');
      });
    });

    it('should handle single scenario comparison', async () => {
      const scenario: TestScenario = {
        id: 'single-test',
        name: 'Single Test Scenario',
        description: 'Test single scenario performance',
        iterations: 100,
        warmupIterations: 10,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: 'size-1',
            name: 'Test Size 1',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      const results = await performanceSystem.runComparison([scenario]);

      expect(results).toBeDefined();
      expect(results.length).toBe(1);
      expect(results[0].scenarioId).toBe('single-test');
    });

    it('should handle empty scenarios array', async () => {
      const results = await performanceSystem.runComparison([]);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });

  describe('Performance Metrics', () => {
    it('should collect accurate performance metrics', async () => {
      const scenario: TestScenario = {
        id: 'metrics-test',
        name: 'Metrics Test Scenario',
        description: 'Test performance metrics collection',
        iterations: 100,
        warmupIterations: 10,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: 'size-1',
            name: 'Test Size 1',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      const results = await performanceSystem.runComparison([scenario]);
      const result = results[0];

      expect(result.originalSystem).toBeDefined();
      expect(result.originalSystem.averageTime).toBeGreaterThan(0);
      expect(result.originalSystem.totalTime).toBeGreaterThan(0);
      expect(result.originalSystem.iterations).toBe(scenario.iterations);

      expect(result.refactoredSystem).toBeDefined();
      expect(result.refactoredSystem.averageTime).toBeGreaterThan(0);
      expect(result.refactoredSystem.totalTime).toBeGreaterThan(0);
      expect(result.refactoredSystem.iterations).toBe(scenario.iterations);
    });

    it('should calculate improvement metrics correctly', async () => {
      const scenario: TestScenario = {
        id: 'improvement-test',
        name: 'Improvement Test Scenario',
        description: 'Test improvement calculation',
        iterations: 100,
        warmupIterations: 10,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: 'size-1',
            name: 'Test Size 1',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      const results = await performanceSystem.runComparison([scenario]);
      const result = results[0];

      expect(result.improvement).toBeDefined();
      expect(typeof result.improvement.percentage).toBe('number');
      expect(typeof result.improvement.factor).toBe('number');
      expect(result.improvement.factor).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid scenarios gracefully', async () => {
      const invalidScenarios: TestScenario[] = [
        {
          id: 'invalid-test',
          name: 'Invalid Test',
          description: 'Test with invalid configuration',
          iterations: 0, // Invalid iterations
          warmupIterations: 0,
          context: {} as UnitContext, // Invalid context
          configs: [], // Empty configs
        },
      ];

      const results = await performanceSystem.runComparison(invalidScenarios);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(1);
      expect(results[0].scenarioId).toBe('invalid-test');
    });

    it('should handle missing context properties', async () => {
      const scenario: TestScenario = {
        id: 'missing-context-test',
        name: 'Missing Context Test',
        description: 'Test with missing context properties',
        iterations: 10,
        warmupIterations: 1,
        context: {
          // Missing required properties
        } as UnitContext,
        configs: [
          {
            id: 'size-1',
            name: 'Test Size 1',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      const results = await performanceSystem.runComparison([scenario]);

      expect(results).toBeDefined();
      expect(results.length).toBe(1);
    });
  });

  describe('System Integration', () => {
    it('should work with different unit types', async () => {
      const scenarios: TestScenario[] = [
        {
          id: 'size-test',
          name: 'Size Test',
          description: 'Test size calculations',
          iterations: 50,
          warmupIterations: 5,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'size-1',
              name: 'Test Size 1',
              sizeUnit: SizeUnit.PIXEL,
              dimension: Dimension.WIDTH,
              baseValue: SizeValue.PIXEL,
            } as ISizeUnitConfig,
          ],
        },
        {
          id: 'position-test',
          name: 'Position Test',
          description: 'Test position calculations',
          iterations: 50,
          warmupIterations: 5,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'position-1',
              name: 'Test Position 1',
              positionUnit: PositionUnit.PIXEL,
              dimension: Dimension.X,
              baseValue: PositionValue.PIXEL,
            } as IPositionUnitConfig,
          ],
        },
        {
          id: 'scale-test',
          name: 'Scale Test',
          description: 'Test scale calculations',
          iterations: 50,
          warmupIterations: 5,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'scale-1',
              name: 'Test Scale 1',
              scaleUnit: ScaleUnit.FACTOR,
              dimension: Dimension.BOTH,
              baseValue: ScaleValue.FACTOR,
            } as IScaleUnitConfig,
          ],
        },
      ];

      const results = await performanceSystem.runComparison(scenarios);

      expect(results).toBeDefined();
      expect(results.length).toBe(3);
      expect(results[0].scenarioId).toBe('size-test');
      expect(results[1].scenarioId).toBe('position-test');
      expect(results[2].scenarioId).toBe('scale-test');
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle large numbers of iterations efficiently', async () => {
      const scenario: TestScenario = {
        id: 'large-iterations-test',
        name: 'Large Iterations Test',
        description: 'Test with large number of iterations',
        iterations: 10000,
        warmupIterations: 100,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: 'size-1',
            name: 'Test Size 1',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      const startTime = performance.now();
      const results = await performanceSystem.runComparison([scenario]);
      const endTime = performance.now();

      expect(results).toBeDefined();
      expect(results.length).toBe(1);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });

    it('should handle multiple scenarios efficiently', async () => {
      const scenarios: TestScenario[] = Array.from({ length: 10 }, (_, i) => ({
        id: `scenario-${i}`,
        name: `Scenario ${i}`,
        description: `Test scenario ${i}`,
        iterations: 100,
        warmupIterations: 10,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: `size-${i}`,
            name: `Test Size ${i}`,
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      }));

      const startTime = performance.now();
      const results = await performanceSystem.runComparison(scenarios);
      const endTime = performance.now();

      expect(results).toBeDefined();
      expect(results.length).toBe(10);
      expect(endTime - startTime).toBeLessThan(10000); // Should complete within 10 seconds
    });
  });
});

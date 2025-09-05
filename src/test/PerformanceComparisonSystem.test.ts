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
              axis: Dimension.X,
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
              baseValue: ScaleValue.FACTOR,
              maintainAspectRatio: true,
            } as IScaleUnitConfig,
          ],
        },
      ];

      const results = await performanceSystem.runComparison(scenarios);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(3);

      // Verify each result has the expected structure
      results.forEach((result, index) => {
        expect(result.scenarioId).toBe(scenarios[index].id);
        expect(result.scenarioName).toBe(scenarios[index].name);
        expect(typeof result.originalPerformance).toBe('object');
        expect(typeof result.refactoredPerformance).toBe('object');
        expect(typeof result.improvement).toBe('object');
        expect(Array.isArray(result.details)).toBe(true);
      });
    });

    it('should handle single scenario comparison', async () => {
      const scenario: TestScenario = {
        id: 'single-test',
        name: 'Single Test',
        description: 'Test single scenario comparison',
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
      expect(Array.isArray(results)).toBe(true);
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
    it('should collect performance metrics correctly', async () => {
      const scenario: TestScenario = {
        id: 'metrics-test',
        name: 'Metrics Test',
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

      expect(result.originalPerformance).toBeDefined();
      expect(result.refactoredPerformance).toBeDefined();
      expect(typeof result.originalPerformance.averageTime).toBe('number');
      expect(typeof result.refactoredPerformance.averageTime).toBe('number');
      expect(typeof result.originalPerformance.totalTime).toBe('number');
      expect(typeof result.refactoredPerformance.totalTime).toBe('number');
      expect(typeof result.originalPerformance.memoryUsage).toBe('number');
      expect(typeof result.refactoredPerformance.memoryUsage).toBe('number');
    });

    it('should calculate improvement metrics correctly', async () => {
      const scenario: TestScenario = {
        id: 'improvement-test',
        name: 'Improvement Test',
        description: 'Test improvement metrics calculation',
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
      expect(typeof result.improvement.timeImprovement).toBe('number');
      expect(typeof result.improvement.memoryImprovement).toBe('number');
      expect(typeof result.improvement.overallImprovement).toBe('number');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid scenarios gracefully', async () => {
      const invalidScenarios = [
        {
          id: 'invalid-test',
          name: 'Invalid Test',
          description: 'Test with invalid configuration',
          iterations: 100,
          warmupIterations: 10,
          context: null as any,
          configs: [],
        },
      ];

      const results = await performanceSystem.runComparison(invalidScenarios);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(1);
      expect(results[0].scenarioId).toBe('invalid-test');
    });

    it('should handle calculation errors gracefully', async () => {
      const errorScenario: TestScenario = {
        id: 'error-test',
        name: 'Error Test',
        description: 'Test with calculation errors',
        iterations: 10,
        warmupIterations: 1,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: 'error-config',
            name: 'Error Config',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      const results = await performanceSystem.runComparison([errorScenario]);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(1);
    });
  });

  describe('Performance', () => {
    it('should run comparisons efficiently', async () => {
      const scenarios: TestScenario[] = [
        {
          id: 'efficiency-test-1',
          name: 'Efficiency Test 1',
          description: 'Test efficiency with small iterations',
          iterations: 10,
          warmupIterations: 1,
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
          id: 'efficiency-test-2',
          name: 'Efficiency Test 2',
          description: 'Test efficiency with small iterations',
          iterations: 10,
          warmupIterations: 1,
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
              axis: Dimension.X,
              baseValue: PositionValue.PIXEL,
            } as IPositionUnitConfig,
          ],
        },
      ];

      const startTime = performance.now();
      const results = await performanceSystem.runComparison(scenarios);
      const endTime = performance.now();

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(2);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });

  describe('Integration', () => {
    it('should work with different unit types', async () => {
      const scenarios: TestScenario[] = [
        {
          id: 'size-integration-test',
          name: 'Size Integration Test',
          description: 'Test size unit integration',
          iterations: 10,
          warmupIterations: 1,
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
          id: 'position-integration-test',
          name: 'Position Integration Test',
          description: 'Test position unit integration',
          iterations: 10,
          warmupIterations: 1,
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
              axis: Dimension.X,
              baseValue: PositionValue.PIXEL,
            } as IPositionUnitConfig,
          ],
        },
        {
          id: 'scale-integration-test',
          name: 'Scale Integration Test',
          description: 'Test scale unit integration',
          iterations: 10,
          warmupIterations: 1,
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
              baseValue: ScaleValue.FACTOR,
              maintainAspectRatio: true,
            } as IScaleUnitConfig,
          ],
        },
      ];

      const results = await performanceSystem.runComparison(scenarios);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(3);

      // Verify each result has the expected structure
      results.forEach((result, index) => {
        expect(result.scenarioId).toBe(scenarios[index].id);
        expect(result.scenarioName).toBe(scenarios[index].name);
        expect(typeof result.originalPerformance).toBe('object');
        expect(typeof result.refactoredPerformance).toBe('object');
        expect(typeof result.improvement).toBe('object');
      });
    });

    it('should work with different performance system configurations', () => {
      const systems = [
        container.resolve(TOKENS.PERFORMANCE_COMPARISON_SYSTEM) as PerformanceComparisonSystem,
        new PerformanceComparisonSystem(),
      ];

      systems.forEach(system => {
        expect(system).toBeInstanceOf(PerformanceComparisonSystem);
      });
    });
  });
});
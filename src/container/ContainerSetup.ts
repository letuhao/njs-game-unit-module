import { container, TOKENS } from './DiContainer';
import { UnitAdapterFactory } from '../adapters/IUnitAdapter';
import { LegacyPositionUnitAdapter } from '../adapters/LegacyPositionUnitAdapter';
import { LegacySizeUnitAdapter } from '../adapters/LegacySizeUnitAdapter';
import { EnhancedSizeUnitCalculator } from '../classes/EnhancedSizeUnitCalculator';
import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { RefactoredPositionUnitCalculator } from '../classes/RefactoredPositionUnitCalculator';
import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { RefactoredSizeUnitCalculator } from '../classes/RefactoredSizeUnitCalculator';
import { RefactoredScaleUnitCalculator } from '../classes/RefactoredScaleUnitCalculator';
import { RandomValueNumber } from '../classes/RandomValueNumber';

/**
 * Container Setup
 * Registers all services with the DI container
 */
export function setupContainer(): void {
  // Register adapter services
  container.registerSingleton(TOKENS.UNIT_ADAPTER_FACTORY, () => new UnitAdapterFactory());
  container.registerClass(TOKENS.LEGACY_POSITION_ADAPTER, LegacyPositionUnitAdapter);
  container.registerClass(TOKENS.LEGACY_SIZE_ADAPTER, LegacySizeUnitAdapter);

  // Register calculator services
  container.registerClass(TOKENS.ENHANCED_SIZE_CALCULATOR, EnhancedSizeUnitCalculator);
  container.registerClass(TOKENS.POSITION_CALCULATOR, PositionUnitCalculator);
  container.registerClass(TOKENS.REFACTORED_POSITION_CALCULATOR, RefactoredPositionUnitCalculator);
  container.registerClass(TOKENS.SIZE_CALCULATOR, SizeUnitCalculator);
  container.registerClass(TOKENS.SCALE_CALCULATOR, ScaleUnitCalculator);
  container.registerClass(TOKENS.REFACTORED_SIZE_CALCULATOR, RefactoredSizeUnitCalculator);
  container.registerClass(TOKENS.REFACTORED_SCALE_CALCULATOR, RefactoredScaleUnitCalculator);

  // Register random value services
  container.registerClass(TOKENS.RANDOM_VALUE_NUMBER, RandomValueNumber);

  // Register strategy registries (these will be resolved from existing registries)
  container.registerSingleton(TOKENS.SIZE_VALUE_STRATEGY_REGISTRY, () => {
    // This would be resolved from the existing strategy registry system
    return {}; // Placeholder - would be replaced with actual registry
  });

  container.registerSingleton(TOKENS.POSITION_VALUE_STRATEGY_REGISTRY, () => {
    // This would be resolved from the existing strategy registry system
    return {}; // Placeholder - would be replaced with actual registry
  });

  container.registerSingleton(TOKENS.SCALE_VALUE_STRATEGY_REGISTRY, () => {
    // This would be resolved from the existing strategy registry system
    return {}; // Placeholder - would be replaced with actual registry
  });

  // Register cache services
  container.registerSingleton(TOKENS.STRATEGY_CACHE, () => {
    // This would be resolved from the existing cache system
    return {
      get: () => null,
      set: () => {},
      clear: () => {},
      getStatistics: () => ({}),
    };
  });

  // Register unit calculator factory
  container.registerSingleton(TOKENS.UNIT_CALCULATOR_FACTORY, () => {
    // This would be resolved from the existing factory system
    return {};
  });
}

/**
 * Initialize the container with all services
 */
export function initializeContainer(): void {
  setupContainer();
}

// Simple test to check what's exported
const unitSystem = require('./dist/index.js');

console.log('Available exports:');
console.log(Object.keys(unitSystem));

console.log('\nTesting basic functionality...');

try {
  const { UnitCalculatorFactory, SizeUnit, Dimension } = unitSystem;
  console.log('UnitCalculatorFactory:', typeof UnitCalculatorFactory);
  console.log('SizeUnit:', typeof SizeUnit);
  console.log('Dimension:', typeof Dimension);
  
  if (UnitCalculatorFactory) {
    const factory = UnitCalculatorFactory.getInstance();
    console.log('Factory instance created:', !!factory);
    
    // Test basic size calculation
    const calculator = factory.createSizeUnit(
      'test-size',
      'Test Size',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      100
    );
    
    console.log('Calculator created:', !!calculator);
    
    const context = {
      viewportWidth: 1920,
      viewportHeight: 1080,
      parentWidth: 800,
      parentHeight: 600,
      viewport: { width: 1920, height: 1080 },
      parent: { width: 800, height: 600 },
      scene: { width: 1200, height: 800 }
    };
    
    const result = calculator.calculate(context);
    console.log('Calculation result:', result);
    
  } else {
    console.log('UnitCalculatorFactory not found');
  }
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}

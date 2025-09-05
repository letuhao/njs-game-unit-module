// Simple test runner to verify the unit system works
const { 
  UnitCalculatorFactory,
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  Dimension
} = require('./dist/index.js');

console.log('Testing Phaser Unit System...\n');

// Test context
const context = {
  viewportWidth: 1920,
  viewportHeight: 1080,
  parentWidth: 800,
  parentHeight: 600,
  viewport: { width: 1920, height: 1080 },
  parent: { width: 800, height: 600 },
  scene: { width: 1200, height: 800 }
};

console.log('Test Context:', context);
console.log('');

// Get factory instance
const factory = UnitCalculatorFactory.getInstance();

// Test Size Calculator
console.log('=== Size Calculator Tests ===');

const sizeTests = [
  { value: 100, unit: SizeUnit.PIXEL, expected: 100, name: 'Pixel Test' },
  { value: 50, unit: SizeUnit.PERCENTAGE, expected: 400, name: 'Percentage Test' }, // 50% of 800
  { value: 25, unit: SizeUnit.VIEWPORT_WIDTH, expected: 480, name: 'Viewport Width Test' }, // 25% of 1920
  { value: 30, unit: SizeUnit.VIEWPORT_HEIGHT, expected: 324, name: 'Viewport Height Test' } // 30% of 1080
];

sizeTests.forEach((test, index) => {
  try {
    const calculator = factory.createSizeUnit(
      `size-test-${index}`,
      test.name,
      test.unit,
      Dimension.WIDTH,
      test.value
    );
    
    const result = calculator.calculate(context);
    const passed = Math.abs(result - test.expected) < 0.01;
    console.log(`Test ${index + 1}: ${test.value} ${test.unit} → ${result} (expected: ${test.expected}) ${passed ? '✅' : '❌'}`);
  } catch (error) {
    console.log(`Test ${index + 1}: ${test.value} ${test.unit} → ERROR: ${error.message} ❌`);
  }
});

console.log('');

// Test Position Calculator
console.log('=== Position Calculator Tests ===');

const positionTests = [
  { value: 100, unit: PositionUnit.PIXEL, expected: 100, name: 'Pixel Position Test' },
  { value: 50, unit: PositionUnit.PERCENTAGE, expected: 400, name: 'Percentage Position Test' }, // 50% of 800
  { value: 0, unit: PositionUnit.PARENT_CENTER_X, expected: 400, name: 'Center Position Test' }, // center of 800
  { value: 0, unit: PositionUnit.PARENT_LEFT, expected: 0, name: 'Left Position Test' },
  { value: 0, unit: PositionUnit.PARENT_RIGHT, expected: 800, name: 'Right Position Test' }
];

positionTests.forEach((test, index) => {
  try {
    const calculator = factory.createPositionUnit(
      `position-test-${index}`,
      test.name,
      test.unit,
      Dimension.X,
      test.value
    );
    
    const result = calculator.calculate(context);
    const passed = Math.abs(result - test.expected) < 0.01;
    console.log(`Test ${index + 1}: ${test.value} ${test.unit} → ${result} (expected: ${test.expected}) ${passed ? '✅' : '❌'}`);
  } catch (error) {
    console.log(`Test ${index + 1}: ${test.value} ${test.unit} → ERROR: ${error.message} ❌`);
  }
});

console.log('');

// Test Scale Calculator
console.log('=== Scale Calculator Tests ===');

const scaleTests = [
  { value: 1.5, unit: ScaleUnit.FACTOR, expected: 1.5, name: 'Factor Scale Test' },
  { value: 150, unit: ScaleUnit.PERCENTAGE, expected: 1.5, name: 'Percentage Scale Test' }, // 150% = 1.5x
  { value: 1.0, unit: ScaleUnit.PARENT_SCALE, expected: 1.0, name: 'Parent Scale Test' }
];

scaleTests.forEach((test, index) => {
  try {
    const calculator = factory.createScaleUnit(
      `scale-test-${index}`,
      test.name,
      test.unit,
      test.value
    );
    
    const result = calculator.calculate(context);
    const passed = Math.abs(result - test.expected) < 0.01;
    console.log(`Test ${index + 1}: ${test.value} ${test.unit} → ${result} (expected: ${test.expected}) ${passed ? '✅' : '❌'}`);
  } catch (error) {
    console.log(`Test ${index + 1}: ${test.value} ${test.unit} → ERROR: ${error.message} ❌`);
  }
});

console.log('');
console.log('=== Test Complete ===');

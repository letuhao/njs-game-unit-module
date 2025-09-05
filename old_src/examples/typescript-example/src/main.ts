/**
 * TypeScript Example - Phaser Unit System
 * 
 * This example demonstrates how to use the unit system in a TypeScript project
 * with Phaser.js for game development.
 */

import Phaser from 'phaser';
import {
  SizeUnitCalculator,
  PositionUnitCalculator,
  ScaleUnitCalculator,
  UnitSystemManager,
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  UnitType,
  IUnitConfig,
  UnitContext
} from '@phaser-game/unit-system';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  parent: 'game-container',
  backgroundColor: '#2c3e50',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Game instance
let game: Phaser.Game;
let unitSystem: UnitSystemManager;
let gameObjects: Phaser.GameObjects.Container[] = [];

// Initialize the game
function initGame(): void {
  game = new Phaser.Game(config);
}

// Preload assets
function preload(this: Phaser.Scene): void {
  // Load any assets here
  console.log('Preloading assets...');
}

// Create game objects
function create(this: Phaser.Scene): void {
  console.log('Creating game scene...');
  
  // Initialize unit system
  unitSystem = new UnitSystemManager();
  
  // Create responsive UI elements
  createResponsiveUI(this);
  
  // Create game objects with unit-based positioning
  createGameObjects(this);
  
  // Add resize handler
  window.addEventListener('resize', () => {
    updateResponsiveElements(this);
  });
}

// Update loop
function update(this: Phaser.Scene): void {
  // Update logic here
}

// Create responsive UI elements
function createResponsiveUI(scene: Phaser.Scene): void {
  const sizeCalculator = new SizeUnitCalculator();
  const positionCalculator = new PositionUnitCalculator();
  
  // Get current context
  const context = getCurrentContext();
  
  // Create a responsive panel
  const panelWidth = sizeCalculator.calculate({
    value: 80,
    unit: SizeUnit.PERCENT,
    context
  });
  
  const panelHeight = sizeCalculator.calculate({
    value: 60,
    unit: SizeUnit.PERCENT,
    context
  });
  
  const panelX = positionCalculator.calculate({
    value: 50,
    unit: PositionUnit.PERCENT,
    context
  });
  
  const panelY = positionCalculator.calculate({
    value: 50,
    unit: PositionUnit.PERCENT,
    context
  });
  
  // Create the panel
  const panel = scene.add.rectangle(
    panelX, 
    panelY, 
    panelWidth, 
    panelHeight, 
    0x34495e
  );
  
  // Add text to the panel
  const text = scene.add.text(panelX, panelY, 'Responsive Panel', {
    fontSize: '24px',
    color: '#ffffff',
    align: 'center'
  }).setOrigin(0.5);
  
  // Store for responsive updates
  gameObjects.push(scene.add.container(0, 0, [panel, text]));
}

// Create game objects with unit-based calculations
function createGameObjects(scene: Phaser.Scene): void {
  const sizeCalculator = new SizeUnitCalculator();
  const positionCalculator = new PositionUnitCalculator();
  const scaleCalculator = new ScaleUnitCalculator();
  
  const context = getCurrentContext();
  
  // Create multiple game objects with different unit types
  const objects = [
    {
      name: 'Pixel Object',
      value: 100,
      unit: SizeUnit.PIXEL,
      color: 0xe74c3c
    },
    {
      name: 'Percent Object',
      value: 20,
      unit: SizeUnit.PERCENT,
      color: 0x3498db
    },
    {
      name: 'Viewport Object',
      value: 15,
      unit: SizeUnit.VIEWPORT_WIDTH,
      color: 0x2ecc71
    }
  ];
  
  objects.forEach((obj, index) => {
    const size = sizeCalculator.calculate({
      value: obj.value,
      unit: obj.unit,
      context
    });
    
    const x = positionCalculator.calculate({
      value: 20 + (index * 30),
      unit: PositionUnit.PERCENT,
      context
    });
    
    const y = positionCalculator.calculate({
      value: 30,
      unit: PositionUnit.PERCENT,
      context
    });
    
    const scale = scaleCalculator.calculate({
      value: 1.0 + (index * 0.2),
      unit: ScaleUnit.MULTIPLIER,
      context
    });
    
    // Create the game object
    const gameObj = scene.add.rectangle(x, y, size, size, obj.color);
    gameObj.setScale(scale);
    
    // Add label
    const label = scene.add.text(x, y + size/2 + 20, obj.name, {
      fontSize: '12px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);
    
    // Store for responsive updates
    gameObjects.push(scene.add.container(0, 0, [gameObj, label]));
  });
}

// Update responsive elements when window resizes
function updateResponsiveElements(scene: Phaser.Scene): void {
  const sizeCalculator = new SizeUnitCalculator();
  const positionCalculator = new PositionUnitCalculator();
  const scaleCalculator = new ScaleUnitCalculator();
  
  const context = getCurrentContext();
  
  // Update all game objects
  gameObjects.forEach((container, index) => {
    const children = container.list;
    
    if (children.length >= 2) {
      const gameObj = children[0] as Phaser.GameObjects.Rectangle;
      const label = children[1] as Phaser.GameObjects.Text;
      
      // Recalculate size and position
      const newSize = sizeCalculator.calculate({
        value: 100 + (index * 50),
        unit: SizeUnit.PIXEL,
        context
      });
      
      const newX = positionCalculator.calculate({
        value: 20 + (index * 30),
        unit: PositionUnit.PERCENT,
        context
      });
      
      const newY = positionCalculator.calculate({
        value: 30,
        unit: PositionUnit.PERCENT,
        context
      });
      
      const newScale = scaleCalculator.calculate({
        value: 1.0 + (index * 0.2),
        unit: ScaleUnit.MULTIPLIER,
        context
      });
      
      // Update the game object
      gameObj.setSize(newSize, newSize);
      gameObj.setPosition(newX, newY);
      gameObj.setScale(newScale);
      
      // Update label position
      label.setPosition(newX, newY + newSize/2 + 20);
    }
  });
}

// Get current context for calculations
function getCurrentContext(): UnitContext {
  return {
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    parentWidth: config.width as number,
    parentHeight: config.height as number
  };
}

// Advanced unit system usage
function demonstrateAdvancedFeatures(): void {
  console.log('Demonstrating advanced unit system features...');
  
  // Create unit configurations
  const sizeConfig: IUnitConfig = {
    id: 'button-size',
    unitType: UnitType.SIZE,
    value: 200,
    unit: SizeUnit.PIXEL
  };
  
  const positionConfig: IUnitConfig = {
    id: 'button-position',
    unitType: UnitType.POSITION,
    value: 50,
    unit: PositionUnit.PERCENT
  };
  
  // Register units with the manager
  unitSystem.registerUnit('button-size', sizeConfig);
  unitSystem.registerUnit('button-position', positionConfig);
  
  // Calculate with context
  const context = getCurrentContext();
  const size = unitSystem.calculateUnit('button-size', context);
  const position = unitSystem.calculateUnit('button-position', context);
  
  console.log('Calculated size:', size);
  console.log('Calculated position:', position);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Phaser Unit System Example...');
  
  // Initialize the game
  initGame();
  
  // Demonstrate advanced features after a short delay
  setTimeout(() => {
    demonstrateAdvancedFeatures();
  }, 1000);
});

// Export for module systems
export { initGame, demonstrateAdvancedFeatures };

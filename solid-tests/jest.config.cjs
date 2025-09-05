// Jest config for TypeScript via ts-jest
/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/__tests__/**'],
  coverageThreshold: {
    global: { lines: 60, functions: 60, statements: 60, branches: 50 }
  }
};

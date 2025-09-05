/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
};

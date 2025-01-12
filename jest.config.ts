import type { Config } from 'jest';

const config: Config = {
  // Specifies the root directory of the project
  roots: ['<rootDir>/app', '<rootDir>/components', '<rootDir>/lib'],

  // Match test files with these patterns
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // File extensions to process
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Transforms for processing files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for JS/JSX files
  },

  // Module aliasing to match Next.js's behavior
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS modules
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock images
  },

  // Configure Jest to use Node.js-like environment
  testEnvironment: 'jest-environment-jsdom',

  // Coverage collection
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx,js,jsx}',
    'components/**/*.{ts,tsx,js,jsx}',
    'lib/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  coverageDirectory: 'coverage',
};

export default config;

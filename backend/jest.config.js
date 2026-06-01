/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/tests/**/*.spec.js',
  ],
  testTimeout: 15000,
  verbose: true,
  passWithNoTests: true,
};

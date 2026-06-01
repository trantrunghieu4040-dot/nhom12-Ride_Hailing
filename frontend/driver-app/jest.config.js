/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.{js,jsx}',
    '**/*.test.{js,jsx}',
  ],
  moduleNameMapper: {
    'react-native': '<rootDir>/__mocks__/react-native.js',
    '@react-native-async-storage/async-storage': '<rootDir>/__mocks__/async-storage.js',
    'react-native-maps': '<rootDir>/__mocks__/react-native-maps.js',
    'react-native-vector-icons/(.*)': '<rootDir>/__mocks__/react-native-vector-icons.js',
  },
  passWithNoTests: true,
  verbose: true,
};

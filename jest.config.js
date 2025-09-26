module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|expo' +
      '|expo-.*' +
      '|@expo' +
      ')/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

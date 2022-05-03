export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  //rootDir: 'app',
  testEnvironment: 'node',
  testMatch: [
    //"**/__tests__/**/*.[jt]s?(x)",
    '**/?(*.)+(spec).[tj]s?(x)',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['./node_modules'],
}

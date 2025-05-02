export default {
    preset: 'ts-jest/presets/js-with-ts-esm',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          useESM: true,
        },
      ],
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    setupFiles: ['<rootDir>/__tests__/setup-env.ts'],
    // 设置超时，防止测试卡住
    testTimeout: 10000,
  };
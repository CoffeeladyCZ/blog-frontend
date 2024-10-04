module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: { metaObjectReplacement: { url: 'https://www.url.com' } }
            }
          ]
        }
      }
    ],
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': 'jest-transform-stub',
    '\\.svg\\?react$': '<rootDir>/helpers/svg.transform.ts'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  transformIgnorePatterns: ['<rootDir>/node_modules/?!(.*)']
};

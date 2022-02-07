export default {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  testEnvironment: "node",
  coverageThreshould: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  watchPathIgnorePatterns: ["node_modules"],
  transformIfnorePatterns: ["node_modules"],
  collectCoverageFrom: ["src/**/*.js", "!src/main/server.js"],
};
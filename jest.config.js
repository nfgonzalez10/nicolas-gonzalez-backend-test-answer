const config = {
  verbose: true,
  preset: "@shelf/jest-mongodb",
  globalSetup: "<rootDir>/dotenv/dotenv-test.js",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/private/jest/setup.js"],
};

module.exports = config;

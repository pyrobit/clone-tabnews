const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

// Create Next.js Jest configuration
const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;

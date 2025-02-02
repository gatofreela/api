/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "test",
  testEnvironment: "node",
  transform: {
    "^.+.ts?$": ["ts-jest", {}],
  },
  collectCoverageFrom: ["**/*.ts"],
  coverageDirectory: "../coverage",
};

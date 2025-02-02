/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "test",
  testEnvironment: "node",
  transform: {
    "^.+.ts?$": ["ts-jest", {}],
  },
  collectCoverageFrom: ["**/*.ts"],
  coverageDirectory: "../coverage",
};

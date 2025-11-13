

const config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': '<rootDir>/test/mocks/styleMock.js',
  },
  reporters: [
    "default",
    ["jest-junit", { "outputDirectory": "test-results", "outputName": "junit.xml" }]
  ]

}

export default config
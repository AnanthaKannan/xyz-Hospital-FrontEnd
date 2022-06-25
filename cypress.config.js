const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 600,
  viewportWidth: 1000,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // excludeSpecPattern: ["**//*", "**//*"]
  }
})
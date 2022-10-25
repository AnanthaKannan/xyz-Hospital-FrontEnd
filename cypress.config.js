const { defineConfig } = require('cypress')
const fs = require('fs-extra')
const path = require('path')

module.exports = defineConfig({
  viewportHeight: 600,
  viewportWidth: 1000,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // used to test different environment
    setupNodeEvents(on, config) {
      const file = config.env.configFile || 'dev'
      const pathToConfigFile = path.resolve('', 'cypress/config', `${file}.json`)
      return fs.readJson(pathToConfigFile)
    },
  }
})

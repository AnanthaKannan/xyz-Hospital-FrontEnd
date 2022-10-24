const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 600,
  viewportWidth: 1000,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // excludeSpecPattern: ["**//*", "**//*"]
  },
  env: {
    "email": "sreeananthakannan@gmail.com",
    "password": "Kannan$7500",
    "apiUrl": "https://5347sl44pj.execute-api.us-east-1.amazonaws.com/dev"
  }
})
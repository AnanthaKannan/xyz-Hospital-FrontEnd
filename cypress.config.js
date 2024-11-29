// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("cypress");
const fs = require("fs-extra");
const path = require("path");

module.exports = defineConfig({
  projectId: "q6gbda",
  viewportHeight: 600,
  viewportWidth: 1000,
  e2e: {
    specPattern: [
      "cypress/e2e/createDoc.spec.js",
      "cypress/e2e/listDoc.spec.js",
      "cypress/e2e/createPatient.spec.js",
      // 'cypress/e2e/updatePatient.spec.js', // command the line until back mock api get fix
      "cypress/e2e/listPatient.spec.js",
      "cypress/e2e/feedback.spec.js",
      "cypress/e2e/signup.spec.js",
    ],
    // used to test different environment
    setupNodeEvents(on, config) {
      const file = config.env.configFile || "dev";
      const pathToConfigFile = path.resolve(
        "",
        "cypress/config",
        `${file}.json`
      );
      return fs.readJson(pathToConfigFile);
    },
    projectId: "q6gbda",
  },
});

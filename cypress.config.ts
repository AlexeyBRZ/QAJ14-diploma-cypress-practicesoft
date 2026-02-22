import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        //       resultsDir: "allure-results",
      });

      return config;
    },

    env: {
      apiKey: "my-secret-key",
    },

    supportFile: "cypress/support/e2e.ts",
    trashAssetsBeforeRuns: false,
    video: true,
    screenshotOnRunFailure: true,
    allowCypressEnv: true,
  },
});

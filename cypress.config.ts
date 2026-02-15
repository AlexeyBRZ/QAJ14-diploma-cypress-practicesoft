import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    env: {
      // твои переменные окружения
      apiKey: "my-secret-key",
    },
    supportFile: "cypress/support/e2e.ts",
    trashAssetsBeforeRuns: false,
    video: true,
    screenshotOnRunFailure: true,
    allowCypressEnv: false,
  },
});

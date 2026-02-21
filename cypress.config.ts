import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
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

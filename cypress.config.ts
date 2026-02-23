import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
      });

      return config;
    },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    env: {
      apiKey: "my-secret-key",
    },
    baseUrl: 'https://practicesoftwaretesting.com',
    supportFile: "cypress/support/e2e.ts",
    trashAssetsBeforeRuns: false,
    video: false,
    screenshotOnRunFailure: false,
    allowCypressEnv: true,
  },
});

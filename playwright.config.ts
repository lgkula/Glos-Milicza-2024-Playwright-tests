import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// List of available environments
enum ENVIRONMENTS {
  stage = "Stage",
  prod = "Prod",
}
// Choosing the default environment
const defaultEnvironment = ENVIRONMENTS.stage;

const environment = process.env.ENV ?? defaultEnvironment;
dotenv.config({
  path: path.resolve(__dirname, `./environments/.env.${environment}`),
});

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "on-failure" }]],
  // reporter: process.env.CI ? 'dot' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    // baseURL: 'http://.../',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    video: "off",
    trace: "retain-on-failure",
  },
  // Maksymalny czas testów 90s
  // timeout: 120_000,
  // Maksymalny czas testów 3min
  timeout: 180_000,
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 20_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     // Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

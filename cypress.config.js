import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin'

const env = dotenv.config().parsed || {}

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports', // The directory where reports will be saved
    overwrite: true, // Overwrite existing reports
    html: true, // Generate HTML reports
    json: true, // Generate JSON reports
    embeddedScreenshots: true, // Embed screenshots in the report
    inlineAssets: true, // Inline assets for portability
  },
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    downloadsFolder: 'cypress/downloads',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    env: {
      apiUrl: 'https://automationexercise.com/api',
      apiKey: env.REQRES_API_KEY || '',
    },
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
        // implement node event listeners here
      cypressMochawesomeReporter(on)
      return config
    },
   },
  },
})

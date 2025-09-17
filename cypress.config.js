import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

const env = dotenv.config().parsed || {}

export default defineConfig({
  e2e: {
    baseUrl: 'https://360.stage.pano.ai',
    downloadsFolder: 'cypress/downloads',
    defaultCommandTimeout: 10000,
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    env: {
      apiUrl: 'https://automationexercise.com/api',
      panoApiUrl: 'https://api.360.stage.pano.ai',
      apiKey: env.REQRES_API_KEY || '',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },
})

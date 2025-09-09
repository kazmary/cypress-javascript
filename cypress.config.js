import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

const env = dotenv.config().parsed || {}

export default defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    downloadsFolder: 'cypress/downloads',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    env: {
      apiUrl: 'https://automationexercise.com/api',
      apiKey: env.REQRES_API_KEY || '',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },
})

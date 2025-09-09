import { accountData } from '../fixtures/user'

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')

  cy.contains('Login').click()
  cy.get('[data-qa="login-button"]').should('be.visible')

  cy.get('[action="/login"]').within(() => {
    cy.get('input[data-qa="login-email"]').type(email)
    cy.get('input[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()
    cy.get('.shop-menu.pull-right', { timeout: 50000 })
      .should('exist')
      .find('b')
      .contains(accountData.name)
    cy.contains('button', 'Logout').scrollIntoView().should('be.visible')
  })
})

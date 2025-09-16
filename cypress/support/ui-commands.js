Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')

  cy.contains('Login').click()
  cy.get('[data-qa="login-button"]').should('be.visible')

  cy.get('[action="/login"]').within(() => {
    cy.get('input[data-qa="login-email"]').type(email)
    cy.get('input[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()
  })
})

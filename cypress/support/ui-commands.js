Cypress.Commands.add('getByDataQa', (dataQaAttr) => {
  cy.get(`[data-qa="${dataQaAttr}"]`)
})

Cypress.Commands.add('uiLogin', (email, password) => {
  cy.visit('/')

  cy.contains('Login').click()
  cy.getByDataQa('login-button').should('be.visible')

  cy.get('[action="/login"]').within(() => {
    cy.getByDataQa('login-email').type(email)
    cy.getByDataQa('login-password').type(password)
    cy.getByDataQa('login-button').click()
  })
})

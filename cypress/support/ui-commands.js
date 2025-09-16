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

Cypress.Commands.add('findProduct', (product) => {
  return cy
    .get('.features_items')
    .find('.productinfo')
    .contains(product.name)
    .should('be.visible')
    .siblings('h2')
    .scrollIntoView()
    .should('contain', product.price)
})

Cypress.Commands.add('navigateToCart', () => {
  cy.get('#cartModal')
    .should('be.visible')
    .and('contain', 'Your product has been added to cart.')
    .within(() => {
      cy.get('u').contains('View Cart').should('be.visible').click()
    })
  cy.url().should('contain', '/view_cart')
})

Cypress.Commands.add('verifyCartTableSize', (rowsNumber) => {
  cy.get('#cart_info_table')
    .as('cartTable')
    .find('tbody tr')
    .should('have.length', rowsNumber)
})

Cypress.Commands.add('fillInPayment', (user, paymentMethod) => {
  cy.getByDataQa('name-on-card').type(user.name)
  cy.getByDataQa('card-number').type(paymentMethod.card_number)
  cy.getByDataQa('cvc').type(paymentMethod.cvv)
  cy.getByDataQa('expiry-month').type(paymentMethod.expiration_month)
  cy.getByDataQa('expiry-year').type(paymentMethod.expiration_year)
})

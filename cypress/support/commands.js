import { verifyResponse } from './helpers'
const BASE_HEADERS = {
  Vary: 'Accept',
  //   'x-api-key': Cypress.env('apiKey'),
}

Cypress.Commands.add('createAccount', (options) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/createAccount`,
    form: true,
    headers: BASE_HEADERS,
    body: { ...options },
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('deleteAccount', ({ email, password }) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/deleteAccount`,
    form: true,
    headers: BASE_HEADERS,
    body: { email, password },
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
  // .catch((err) => {
  //   cy.log('Delete account failed:', err.message)
  //   // Optionally, throw error to fail the test
  //   throw err
  // })
})

Cypress.Commands.add('getProductsList', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/productsList`,
    form: true,
    headers: BASE_HEADERS,
  }).then((response) => {
    verifyResponse(response, 200)
  })
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

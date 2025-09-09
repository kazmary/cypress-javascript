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

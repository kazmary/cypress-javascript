it('retrieve the incident', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('panoApiUrl')}/incident/390007`,
    headers: {
      Authorization: Cypress.env('panoToken'),
      Accept: 'application/json, text/plain, */*',
      'correlation-id': Cypress.env('panoCorrelationId'),
    },
  }).then((response) => {
    cy.log(JSON.stringify(response))
    expect(response.status).to.eq(200)
    expect(response.body.name).to.eq('QA Interview')
  })
})

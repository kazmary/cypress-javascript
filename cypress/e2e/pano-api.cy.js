it('retrieve the incident', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('panoApiUrl')}/incident/390007`,
    headers: {
      Authorization: 'Bearer aW5jaWRlbnQ6ZDczY3JreHd3ZG1xNA==',
      Accept: 'application/json, text/plain, */*',
      'correlation-id': 'mfn7414x00063b6jaztz3z0',
    },
  }).then((response) => {
    cy.log(JSON.stringify(response))
    expect(response.status).to.eq(200)
    expect(response.body.name).to.eq('QA Interview')
  })
})

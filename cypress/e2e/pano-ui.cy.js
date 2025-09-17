describe('UI', () => {
  before(() => {
    cy.visit('/i/d73crkxwwdmq4', { failOnStatusCode: false })
    cy.getByDataCy('image-detail-info').should('be.visible')
  })

  it('verify header', () => {
    cy.getByDataCy('incident-title')
      .should('be.visible')
      .invoke('text')
      .should('contain', 'QA Interview - #390007')
  })
})

import { accountData } from '../fixtures/user'

describe('API Tests', () => {
  //   const user = {
  //     username: Cypress.env('userName'),
  //     email: Cypress.env('userEmail'),
  //     password: Cypress.env('userPassword'),
  //   }

  before(() => {
    cy.createAccount(accountData).then((response) => {
      const res = JSON.parse(response.body)
      expect(response.status).to.eq(200)
      expect(res).to.have.property('responseCode', 201)
    })
  })
  after(() => {
    cy.deleteAccount({
      email: accountData.email,
      password: accountData.password,
    }).then((response) => {
      const res = JSON.parse(response.body)
      expect(res).to.have.property('responseCode', 200)
      expect(res).to.have.property('message', 'Account deleted!')
    })
  })

  it('Log in', () => {
    cy.uiLogin(accountData.email, accountData.password).then(() => {
      cy.get('.shop-menu.pull-right')
        .should('exist')
        .find('b')
        .contains(accountData.name)
      cy.contains('Logout').scrollIntoView().should('be.visible')
    })
  })
})

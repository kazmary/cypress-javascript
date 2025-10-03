import { accountData } from '../fixtures/user'

describe('API Tests', () => {
  //   const user = {
  //     username: Cypress.env('userName'),
  //     email: Cypress.env('userEmail'),
  //     password: Cypress.env('userPassword'),
  //   }

  before(() => {
    cy.createAccount(accountData).then((response) => {
      //   cy.log(JSON.stringify(response))
      const res = JSON.parse(response.body)
      expect(response.status).to.eq(200)
      expect(res).to.have.property('responseCode', 201)
    })
  })

  it('Log in', () => {
    cy.login(accountData.email, accountData.password).then(() => {
      cy.url().should('include', '/userPage')
    })
  })
})

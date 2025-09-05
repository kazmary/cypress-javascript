import { faker } from '@faker-js/faker/locales/en_US'

describe('API Tests', () => {
  const user = {
    username: Cypress.env('userName'),
    email: Cypress.env('userEmail'),
    password: Cypress.env('userPassword'),
  }

  it('User Create - POST', () => {
    cy.registerUser(user.email, user.password).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('token')
    })
  })
})

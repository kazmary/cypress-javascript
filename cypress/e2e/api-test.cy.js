import { accountData } from '../support/constants/user'

describe('API Tests', () => {
  before(() => {
    cy.createAccount(accountData).then((response) => {
      const res = JSON.parse(response.body)
      expect(res).to.have.property('responseCode', 201)
      expect(res).to.have.property('message', 'User created!')
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
    cy.login(accountData.email, accountData.password).then(() => {
      cy.contains('Logout').scrollIntoView().should('be.visible')
      cy.get('.shop-menu.pull-right')
        .should('be.visible')
        .find('b')
        .contains(accountData.name)
      cy.contains('Logout').should('be.visible').click()
    })
  })

  it('should NOT log in with invalid credentials', () => {
    cy.login('invalid@example.com', 'wrongpassword').then(() => {
      cy.getByDataQa('login-button')
        .siblings('p')
        .should('be.visible')
        .and('contain', 'Your email or password is incorrect!')
    })
  })
})

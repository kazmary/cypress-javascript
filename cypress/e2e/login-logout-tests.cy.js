import { accountData } from '../support/constants/user'
import { verifyResponse } from '../support/helpers'

describe('Log in tests', () => {
  before(() => {
    cy.createAccount(accountData).then((response) => {
      verifyResponse(response, 201, 'User created!')
    })
  })

  after(() => {
    cy.deleteAccount({
      email: accountData.email,
      password: accountData.password,
    }).then((response) => {
      verifyResponse(response, 200, 'Account deleted!')
    })
  })

  it('should log in with valid creds', () => {
    cy.uiLogin(accountData.email, accountData.password).then(() => {
      cy.contains('Logout').scrollIntoView().should('be.visible')
      cy.get('.shop-menu.pull-right')
        .should('be.visible')
        .find('b')
        .contains(accountData.name)
      cy.contains('Logout').should('be.visible').click()
    })
  })

  it('should NOT log in with invalid credentials', () => {
    cy.uiLogin('invalid@example.com', 'wrongpassword').then(() => {
      cy.getByDataQa('login-button')
        .siblings('p')
        .should('be.visible')
        .and('contain', 'Your email or password is incorrect!')
    })
  })
})

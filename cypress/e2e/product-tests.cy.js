import { accountData } from '../support/constants/user'
import { verifyResponse } from '../support/helpers'
let womensProducts
let womensProductsFixture

describe('Products Tests', () => {
  before('create user account', () => {
    cy.createAccount(accountData).then((response) => {
      verifyResponse(response, 201, 'User created!')
    })
  })

  beforeEach('create fixture and log in', () => {
    cy.getProductsList()
      .then((response) => {
        const res = JSON.parse(response.body)
        womensProducts = res.products
          .filter((product) => product.category.usertype.usertype === 'Women')
          .slice(0, 5)
        womensProductsFixture = womensProducts.map(({ name, price }) => ({
          name,
          price,
        }))
        cy.writeFile(
          'cypress/fixtures/womensProducts.json',
          womensProductsFixture,
          {
            log: true,
          }
        )
      })
      .then(() => {
        cy.uiLogin(accountData.email, accountData.password).then(() => {
          cy.contains('Logout').scrollIntoView().should('be.visible')
        })
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

  it('Search for a product', () => {
    cy.log('...to be continued')
  })
})

import { accountData } from '../support/constants/user'
import { verifyResponse, getRandomProduct } from '../support/helpers'
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

  it('should shop for a product', () => {
    cy.readFile('cypress/fixtures/womensProducts.json', { log: true }).then(
      (womensProductsFixture) => {
        const randomProduct1 = getRandomProduct(womensProductsFixture)
        const randomProduct2 = getRandomProduct(womensProductsFixture)
        // select a random product from fixture
        cy.get('.features_items')
          .find('.productinfo')
          .contains(randomProduct1.name)
          .as('chosenProduct')
          .should('be.visible')
          .siblings('h2')
          .scrollIntoView()
          .should('contain', randomProduct1.price)
        cy.get('@chosenProduct').parent().find('.add-to-cart').click()
        //verify the selected product is in the cart
        cy.get('#cartModal')
          .should('be.visible')
          .and('contain', 'Your product has been added to cart.')
          .within(() => {
            cy.get('u').contains('View Cart').should('be.visible').click()
          })
        cy.get('#cart_info_table')
          .as('cartTable')
          .find('tbody tr')
          .should('have.length', 1)
          // delete selected product from cart
          .within(() => {
            cy.get('.cart_quantity_delete').should('be.visible').click()
          })
        cy.get('@cartTable').find('tbody tr').should('have.length', 0)
        cy.get('#empty_cart')
          .should('be.visible')
          .and('contain', 'Cart is empty!')
          .within(() => {
            // navigate back to products page to shop
            cy.get('a[href="/products"]').should('be.visible').click()
          })
        cy.url().should('contain', '/products')
        cy.get('.features_items').contains('All Products').should('be.visible')
      }
    )
  })
})

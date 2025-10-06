import { accountData } from '../support/constants/user'
import { verifyResponse, getRandomProduct } from '../support/helpers'
import { visa } from '../support/constants/paymentMethods.json'

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
        cy.findProduct(randomProduct1).parent().find('.add-to-cart').click()
        //verify the selected product is in the cart
        cy.navigateToCart()
        cy.verifyCartTableSize(1)
        // delete selected product from cart
        cy.get('@cartTable').within(() => {
          cy.get('.cart_quantity_delete').should('be.visible').click()
        })
        cy.verifyCartTableSize(0)
        cy.get('#empty_cart')
          .should('be.visible')
          .and('contain', 'Cart is empty!')
          .within(() => {
            // navigate back to products page to shop
            cy.get('a[href="/products"]').should('be.visible').click()
          })
        cy.url().should('contain', '/products')
        cy.get('.features_items').contains('All Products').should('be.visible')
        // add another product to the cart
        cy.findProduct(randomProduct2).parent().find('.add-to-cart').click()
        cy.navigateToCart()
        cy.verifyCartTableSize(1)
        // checkout
        cy.contains('Proceed To Checkout').should('be.visible').click()
        cy.url().should('contain', '/checkout')
        cy.contains('Review Your Order').should('be.visible')
        cy.get('#cart_info')
          .find('tr[id^="product-"]')
          .should('have.length', 1)
          .and('contain', randomProduct2.name)
        cy.get('.check_out').click()
        // make a payment
        cy.url().should('contain', '/payment')
        cy.fillInPayment(accountData, visa)
        cy.getByDataQa('pay-button').click()
        cy.url().should('contain', '/payment_done/')
        cy.getByDataQa('order-placed')
          .should('have.text', 'Order Placed!')
          .and('be.visible')
      }
    )
  })
})

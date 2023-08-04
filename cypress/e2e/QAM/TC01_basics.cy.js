/// <reference types = "Cypress"/>
describe('Login', () => {
    it('Sign in', () => {
      cy.visit('https://react-redux.realworld.io/#/login?_k=oiw5ye')
      cy.get('input[type="email"]').type('shubham.chutke@zeuslearning.com')
      cy.get('input[type="password"]').type('zeus@1234')
      cy.get('.btn').contains('Sign in').click()
    })
  })


import 'cypress-file-upload';
Cypress.Commands.add("SignIn", () => {
    cy.visit('https://react-redux.realworld.io/#/login')
    cy.title().should('eq', 'Conduit')
    cy.location('protocol').should('eq', 'https:')
    cy.get('form').within(($form) => {
        // cy.get() will only search for elements within form, not within the entire document
        cy.get('input[type = "email"]').type('shubham.chutke@zeuslearning.com')
        cy.get('input[type = "password"]').type('zeus@1234')
        cy.root().submit()   // submits the form yielded from 'within'
    })
    cy.contains('Your Feed', { timeout: 10000 }).should('be.visible')
})
Cypress.Commands.add("login", (username,password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').should("be.visible").click();
})
Cypress.Commands.add("logout", () => {
    cy.get("#react-burger-menu-btn").should("be.visible").click();
    cy.get("#logout_sidebar_link").should('have.class', 'bm-item').click();
    
})
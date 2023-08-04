/// <reference types="Cypress" />

describe('intercept with cypress examples', ()=>{


   

    it('test api with simple intercept stubbing', ()=>{

        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.once('uncaught:exception', () => false);
        cy.wait(2000)

        cy.intercept({
            path : '/posts'

        }).as('posts')

        cy.get('a[href="/posts"]').first().click()
        cy.wait('@posts').then(inter =>{
            cy.log(JSON.stringify(inter))
            console.log(JSON.stringify(inter))
            expect(inter.response.body).to.have.length(100)
                
        })


    })


    it('mocking with intercept test with static response', ()=>{
        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.once('uncaught:exception', () => false);
        cy.intercept('GET', '/posts', {totalpost:5 , name: 'Shubham'}).as('posts')
        cy.get('a[href="/posts"]').first().click()
        cy.wait('@posts')
    })

    it('mocking with intercept test with dynamic fixture', ()=>{
        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.once('uncaught:exception', () => false);
        cy.intercept('GET', '/posts', {fixture: 'createuser.json'}).as('posts')
        cy.get('a[href="/posts"]').first().click()
        cy.wait('@posts')
    })

    
    

 })








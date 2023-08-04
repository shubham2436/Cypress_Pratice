describe('Create and mark-unmark as favorite', function () {

    Cypress.config('pageLoadTimeout', 100000)

    before(function () {
       cy.SignIn()
    })

    it('Create a post', function () {
        cy.get('ul.navbar-nav').children().as('menu')
        cy.get('@menu').contains('New Post').click()
        cy.hash().should('include', '#/editor')
        cy.get('form').within(($form) => {
            cy.get('input').first().type('Test')
            cy.get('input').eq(1).type('Test 1')
            cy.get('textarea').last().type('Test 2')
            cy.contains('Publish Article').click()
        })
        cy.url().should('include', 'article')
    })
    it('Checking all tabs are present in navigation Menu', function () {
        cy.get('.navbar-nav').children().should('have.length','4')
        
    })
    it('Checking all Popular tags are present', function () {
        cy.get('.tag-list').children().should('have.length','10')
        
    })
    it('Checking the likes of welcome tag', function () {
        cy.get('.tag-default').eq(0).click()
        //cy.wait(9000)
        cy.get('.article-preview').should('contain.text','Welcome to RealWorld project')
        cy.get('.btn-outline-primary').first().then(($likes) =>{
            const count = $likes.text()
            cy.log(count)
            expect(parseInt(count)).to.eq(3219)
        }) 
    })
    // let a = "100";
    // let b = parseInt(a);
    // it.only('Checking like is updating or not', function () {
    //     cy.get('.nav-link').last().click()
    //     cy.wait(11000)
    //     cy.get('.btn-outline-primary').first().then(($fav) => {
    //         let likes = $fav.text()
    //         let likesint = parseInt(likes)
    //         cy.wrap(likesint).as('wrapText')
            
    //     }).as('favCount')
    //     cy.get('.btn-outline-primary').first().click()
    //     cy.get('@wrapText').then(($cnt) => {
    //         expect(parseInt($cnt)).to.eq(this.wrapText + 1)
    //     })
    // })
    it.only('Checking like is updating or not', function () {
        cy.get('.nav-link').last().click()
        cy.wait(11000)
        cy.get('.btn-outline-primary').first().then(($fav) => {
            let likes = $fav.text()
            let likesint = parseInt(likes)
            cy.wrap(likesint).as('wrapText')
            console.log(likesint)
        })
         cy.get('.btn-outline-primary').first().click()
         cy.wait(3000)
         cy.get('.btn-primary').first().then(($fav) => {
            const favCount = $fav.text()
            expect(parseInt(favCount)).to.eq(this.wrapText + 1)
        // cy.get('@wrapText').then(($cnt) => {
        //     expect(parseInt($cnt)).to.eq(this.wrapText + 1)
         })
    })
    it('Checking synchronous function', function () {
        cy.get('[href="#editor"]').then(() => {
            console.log('first log')
        })
        cy.get('[href="#editor"]').click()
        console.log('Second log') // Ye normal javascript wala code pahele hi run ho jaayega.
        
    })


    it('Mark-unmark as favorite', function () {
        cy.get('ul.navbar-nav').children().contains('Shubham2436').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').first().click()
        cy.contains('Favorited Articles').click()
        cy.url().should('include', 'favorites')
        cy.get('.btn-primary').first().then(($fav) => {
            return $fav.text()
        }).as('favCount')
        cy.get('@favCount').then(($cnt) => {
            expect(parseInt($cnt)).to.eq(1)
        })
        cy.get('.btn-primary').first().click()
        cy.reload()
        cy.contains('No articles are here... yet.').should('be.visible')
        cy.go('back')
    })
})
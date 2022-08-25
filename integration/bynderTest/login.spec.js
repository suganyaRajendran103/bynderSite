/// <reference types="cypress" />

context('Bynder Site Experience', () => {
    describe('Login Page()', () => {
        it('Happy Path - Validate user is able to login with valid credentials and verify error message display when invalid credentials entered while login', () => {
        cy.visit('https://wave-trial.getbynder.com/login')
        cy.get('#inputEmail').click().type('suganya.rajendran@atos.net');
        cy.get('#inputPassword').click().type('Bynder@123$');
        cy.get('.login-btn').click();
        cy.url().should('include', '/account/dashboard/')
        cy.get('.account-logo > img').should('be.visible');
        cy.get('.profile').invoke('text').then(profile => {
          expect(profile).to.include('Suganya Rajendran')
        })
        cy.get('.profile').click();
        cy.get('form > .action-btn').click();
        cy.get('.cbox_messagebox').invoke('text').then( msg => { 
          expect (msg).to.include('You have successfully logged out.')
        })
        cy.url().should('be.equal', 'https://wave-trial.getbynder.com/login/')
        cy.get('#inputEmail').click().type('msm@com');
        cy.get('#inputPassword').click().type('Bynder@123$');
        cy.get('.login-btn').click();
        cy.url().should('not.include', '/account/dashboard/')
        cy.get('.notification > h1').contains('You have entered an incorrect username or password.')
        cy.get('.cbox_messagebox').invoke('text').
          then( msg => { 
            expect (msg).to.include('You have entered an incorrect username or password.')
          })
      })
      it('Validate user is not able to login with invalid credentials', () => {
        cy.visit('https://wave-trial.getbynder.com/login')
        cy.get('#inputEmail').click().type('rajendran@com');
        cy.get('#inputPassword').click().type('Bynder@123$');
        cy.get('.login-btn').click();
        cy.url().should('not.include', '/account/dashboard/')
        cy.get('.cbox_messagebox').invoke('text').
          then( msg => { 
            expect (msg).to.include('You have entered an incorrect username or password.')
          })
      })
      it('Validate user is able to click on lost password link', () => {
        cy.visit('https://wave-trial.getbynder.com/login')
        cy.get('.lost-password > a').contains('Lost password?').click();
        cy.url().should('include', 'user/forgotPassword/?redirectToken=')
        cy.get('.account-logo').should('be.visible')
        cy.get('h2').contains('Reset password')
        cy.get('#sendPassword').click();
        cy.url().should('include', 'user/forgotPassword/?redirectToken=')
      })
    })
})
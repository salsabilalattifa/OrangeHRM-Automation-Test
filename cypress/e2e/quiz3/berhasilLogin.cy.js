const baseurl = Cypress.config('baseUrl')

describe('Verifikasi Login Berhasil', () => {

    beforeEach(() => {
        // Akses halaman login berhasil
        cy.visit(baseurl)
        cy.contains('Login')
        cy.fixture('dataLogin').as('loginData')
    })

    // TC-002
    it('Login dengan valid username dan password', function () {
        const validuser = this.loginData.validData

        // Locator Name
        cy.get('input[name="username"]').type(validuser.username)
        cy.get('input[name="password"]').type(validuser.password)
        cy.get('.orangehrm-login-button').click()

        // Assertion berhasil login
        cy.url().should('include','/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    // TC-003
    it('Login dengan username valid huruf kapital dan password valid', function () {
        const validuser = this.loginData.validData

         // Locator Name
        cy.get('input[name="username"]').type(validuser.usernameKapital)
        cy.get('input[name="password"]').type(validuser.password)
        cy.get('.orangehrm-login-button').click()

        // Assertion berhasil login
        cy.url().should('include','/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })
})
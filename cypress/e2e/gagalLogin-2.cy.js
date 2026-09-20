const baseurl = Cypress.config('baseUrl')

describe('Verifikasi Gagal Login - 2', () => {

    beforeEach(() => {
        // Akses halaman login berhasil
        cy.visit(baseurl)
        cy.contains('Login')
        cy.fixture('dataLogin').as('loginData')
    })

    // TC-009
    it('Login dengan field email dan field password kosong', () => {
        // Tidak mengisi username dan password
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('span', 'Required').should('be.visible')
    })

    // TC-010
    it('Login dengan spasi di awal username dan password valid', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData

         // Locator Name
        cy.get('input[name="username"]').type(invaliduser.spacedUsername1)
        cy.get('input[name="password"]').type(validuser.password)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC-011
    it('Login dengan spasi di akhir username dan password valid', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData

         // Locator Name
        cy.get('input[name="username"]').type(invaliduser.spacedUsername2)
        cy.get('input[name="password"]').type(validuser.password)
        cy.get('.orangehrm-login-button').click()

         // Assertion berhasil login
        cy.url().should('include','/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    // TC-012
    it('Login dengan username dan password yang di switch', function () {
        const validuser = this.loginData.validData

         // Locator Name
        cy.get('input[name="username"]').type(validuser.password)
        cy.get('input[name="password"]').type(validuser.username)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC-013
    it('Login dengan password valid huruf kapital dan username valid', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData

        // Locator Name
        cy.get('input[name="username"]').type(validuser.username)
        cy.get('input[name="password"]').type(invaliduser.passwordKapital)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('Invalid credentials').should('be.visible')
    })
})
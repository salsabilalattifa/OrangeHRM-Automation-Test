const baseurl = Cypress.config('baseUrl')

describe('Verifikasi Gagal Login', () => {

    beforeEach(() => {
        // Akses halaman login berhasil
        cy.visit(baseurl)
        cy.contains('Login')
        cy.fixture('dataLogin').as('loginData')
    })

    // TC-004
    it('Login dengan invalid username dan invalid password', function () {
        const invaliduser = this.loginData.invalidData

        // Locator Name
        cy.get('input[name="username"]').type(invaliduser.invalidUsername)
        cy.get('input[name="password"]').type(invaliduser.invalidPassword)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC-005
    it('Login dengan invalid username dan valid password', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData

         // Locator Name
        cy.get('input[name="username"]').type(invaliduser.invalidUsername)
        cy.get('input[name="password"]').type(validuser.password)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC-006
    it('Login dengan valid username dan invalid password', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData

         // Locator Name
        cy.get('input[name="username"]').type(validuser.username)
        cy.get('input[name="password"]').type(invaliduser.invalidPassword)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC-007
    it('Login dengan hanya mengisi field username dengan data valid', function () {
        const validuser = this.loginData.validData

         // Locator Name
        cy.get('input[name="username"]').type(validuser.username)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('span', 'Required').should('be.visible')
    })

    // TC-008
    it('Login dengan hanya mengisi field password dengan data valid', function () {
        const validuser = this.loginData.validData

         // Locator Name
        cy.get('input[name="password"]').type(validuser.password)
        cy.get('.orangehrm-login-button').click()

        // Assertion gagal login
        cy.contains('span', 'Required').should('be.visible')
    })
})
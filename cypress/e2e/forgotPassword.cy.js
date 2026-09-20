const baseurl = Cypress.config('baseUrl')
const forgotpage = Cypress.config('forgotPage')

describe('Verifikasi Fungsional Forgot Password', () => {

    it('Halaman forgot password', () => {
        // Akses halaman forgot password
        cy.visit(baseurl)
        cy.get('.orangehrm-login-forgot-header').click()

        // TC-014 Halaman forgot password dapat diakses
        // Assertion berhasil akses halaman reset password
        cy.url().should('include','/requestPasswordResetCode')
        cy.contains('h6', 'Reset Password').should('be.visible')
        cy.get('.orangehrm-forgot-password-button--reset').should('be.visible')

        // TC-017 Reset password tanpa mengisi username
        cy.get('.orangehrm-forgot-password-button--reset').click()
        // Assertion gagal reset password
        cy.contains('span', 'Required').should('be.visible')

        // TC-018 Verifikasi tombol Cancel berfungsi
        cy.get('.orangehrm-forgot-password-button--cancel').click()
        cy.url().should('include','/login')
        cy.contains('Login').should('be.visible')
    })
})
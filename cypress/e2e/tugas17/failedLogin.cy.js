import loginPage from '../../pages/loginPage.js'

describe('Verifikasi Gagal Login', () => {
    beforeEach(() => {
        // Akses halaman login berhasil
        loginPage.visitWeb()
        cy.fixture('dataLogin').as('loginData')
    })

    // TC-004
    it('Login dengan invalid username dan invalid password', function () {
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(invaliduser.invalidUsername).inputPassword(invaliduser.invalidPassword)
                    .clickLogin()
            // Assertion gagal login
            //loginPage.assertionGagalLogin()
            cy.wait(7000)
            cy.contains('Invalid credentials').should('be.visible')
    })

    // TC-005
    it('Login dengan invalid username dan valid password', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(invaliduser.invalidUsername).inputPassword(validuser.password)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-006
    it('Login dengan valid username dan invalid password', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(validuser.username).inputPassword(invaliduser.invalidPassword)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-007
    it('Login dengan hanya mengisi field username dengan data valid', function () {
        const validuser = this.loginData.validData
        // Locator Name
        loginPage.inputUsername(validuser.username).clickLogin()
        // Assertion gagal login
        loginPage.assertionRequired()
    })

    // TC-008
    it('Login dengan hanya mengisi field password dengan data valid', function () {
        const validuser = this.loginData.validData
         // Locator Name
        loginPage.inputPassword(validuser.password).clickLogin()
        // Assertion gagal login
        loginPage.assertionRequired()
    })

    // TC-009
    it('Login dengan field email dan field password kosong', () => {
        // Tidak mengisi username dan password
        loginPage.clickLogin()
        // Assertion gagal login
        loginPage.assertionRequired()
    })

    // TC-010
    it('Login dengan spasi di awal username dan password valid', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(invaliduser.spacedUsername1)
                 .inputPassword(validuser.password)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-011
    it('Login dengan spasi di akhir username dan password valid', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(invaliduser.spacedUsername2)
                 .inputPassword(validuser.password)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionSuccessLogin()
    })

    // TC-012
    it('Login dengan username dan password yang di switch', function () {
        const validuser = this.loginData.validData
        // Locator Name
        loginPage.inputUsername(validuser.password).inputPassword(validuser.username)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-013
    it('Login dengan password valid huruf kapital dan username valid', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(validuser.username).inputPassword(invaliduser.passwordKapital)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })
})
const baseurl = Cypress.config('baseUrl')

describe('Akses Halaman Login', () => {

  // TC-001
  it('Akses halaman login melalui halaman beranda', () => {
    cy.visit(baseurl)
    cy.contains('Login').should('be.visible')
  })
})
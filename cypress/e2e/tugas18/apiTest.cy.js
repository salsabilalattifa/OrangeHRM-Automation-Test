const urlApi = Cypress.config('urlAPI')

describe('API Testing', () => {
    let categoryID

    // 1. GET ALL DATA
    it('Get all data', () => {
        cy.request('GET', `${urlApi}/categories`).then((response) => {
            // Cek status code
            expect(response.status).to.eq(200)
            // Response time
            expect(response.duration).to.be.lessThan(1500)
            // Cek response body array
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.be.greaterThan(0)
            // Cek response body struktur
            const category = response.body[0] // ambil index pertama saja
            expect(category).to.have.property('id')
            expect(category).to.have.property('name')
            expect(category).to.have.property('slug')
            expect(category).to.have.property('image')
            expect(category).to.have.property('creationAt')
            expect(category).to.have.property('updatedAt')
            // Cek tipe data
            expect(category.id).to.be.a('number')
            expect(category.name).to.be.a('string')
            expect(category.slug).to.be.a('string')
            expect(category.image).to.be.a('string')
            expect(category.creationAt).to.be.a('string')
            expect(category.updatedAt).to.be.a('string')
        })
    })

    // 2. CREATE CATEGORY
    it('Create data category', () => {
        cy.fixture('dataApiTest').then((newData) => {
            cy.request('POST', `${urlApi}/categories`, newData.createData).then((createResponse) => {
                //Cek status code
                expect(createResponse.status).to.eq(201)
                // Response time
                expect(createResponse.duration).to.be.lessThan(3000)
                // Cek response body struktur
                expect(createResponse.body).to.have.property('id')
                expect(createResponse.body).to.have.property('name')
                expect(createResponse.body).to.have.property('slug')
                expect(createResponse.body).to.have.property('image')
                expect(createResponse.body).to.have.property('creationAt')
                expect(createResponse.body).to.have.property('updatedAt')

                expect(createResponse.body).to.have.property('id')
                expect(createResponse.body.name).to.eq(newData.createData.name)
                expect(createResponse.body.image).to.eq(newData.createData.image)
                expect(createResponse.body).to.have.property('slug')
                expect(createResponse.body).to.have.property('creationAt')
                expect(createResponse.body).to.have.property('updatedAt')

                categoryID = createResponse.body.id // menyimpan id dari data yang sudah ditambahkan untuk bisa digunakan di it lain
            })
        })
    })

    // 3. UPDATE CATEGORY (PUT)
    it('Update data category', () => {
        cy.fixture('dataApiTest').then((newData) => {
            cy.request('PUT', `${urlApi}/categories/${categoryID}`, newData.updateData).then((updateResponse) => {
                // Cek status code
                expect(updateResponse.status).to.eq(200)
                // Response time
                expect(updateResponse.duration).to.be.lessThan(1500)
                // Cek response body setelah di update
                expect(updateResponse.body.id).to.eq(categoryID)
                expect(updateResponse.body.name).to.eq(newData.updateData.name) // cek data yg diupdate
                expect(updateResponse.body.image).to.eq(newData.updateData.image)
                expect(updateResponse.body).to.have.property('slug')
                expect(updateResponse.body).to.have.property('creationAt')
                expect(updateResponse.body).to.have.property('updatedAt')
            })
        })
    })

    // 4. UPDATE CATEGORY (PATCH)
    it('Update data category (patch)', () => {
        cy.fixture('dataApiTest').then((newData) => {
            cy.request('PATCH',`${urlApi}/categories/${categoryID}`, newData.updateSlug).then((patchResponse) => {
                // Cek status code
                expect(patchResponse.status).to.eq(200)
                // Response time
                expect(patchResponse.duration).to.be.lessThan(1500)
                // Cek slug berubah sesuai data baru dan id masih sama
                expect(patchResponse.body.id).to.eq(categoryID)
                expect(patchResponse.body.slug).to.eq(newData.updateSlug.slug)
            })
        })
    })

    // 5. GET DATA BY ID
    it('Get data by ID', () => {
        cy.fixture('dataApiTest').then((data) => {
            const idValid = data.sampleID.validID
            cy.request('GET', `${urlApi}/categories/${idValid}`).then((getResponse) => {
                // Cek status code
                expect(getResponse.status).to.eq(200)
                // Response time
                expect(getResponse.duration).to.be.lessThan(1500)
                // Cek response body struktur
                expect(getResponse.body).to.have.property('id')
                expect(getResponse.body).to.have.property('name')
                expect(getResponse.body).to.have.property('slug')
                expect(getResponse.body).to.have.property('image')
                expect(getResponse.body).to.have.property('creationAt')
                expect(getResponse.body).to.have.property('updatedAt')
                // Cek id hasil response sama dengan id yang digunakan untuk get
                expect(getResponse.body.id).to.eq(idValid)
            })
        })
    })

    // 6. GET DATA BY INVALID ID
    it('Get data by invalid id', () => {
        cy.fixture('dataApiTest').then((data) => {
            const idInvalid = data.sampleID.invalidID
            cy.request({method: 'GET', url: `${urlApi}/categories/${idInvalid}`, failOnStatusCode: false}).then((getResponse) => {
                // Cek status code
                expect(getResponse.status).to.eq(400)
                // Response time
                expect(getResponse.duration).to.be.lessThan(1000)
                // Cek response body struktur
                expect(getResponse.body).to.have.property('message')
            })
        })
    })

    // 7. GET DATA IF ID NOT NUMBER
    it('Get data jika id bukan tipe number', () => {
        cy.fixture('dataApiTest').then((data) => {
            const dataNotNumber = data.sampleID.notNumber
            cy.request({method: 'GET', url: `${urlApi}/categories/${dataNotNumber}`, failOnStatusCode: false}).then((getResponse) => {
                // Cek status code
                expect(getResponse.status).to.eq(400)
                // Response time
                expect(getResponse.duration).to.be.lessThan(1000)
                // Cek response body struktur
                expect(getResponse.body).to.have.property('error')
                expect(getResponse.body).to.have.property('message')
            })
        })
    })

    // 8. GET DATA BY SLUG
    it('Get data dengan slug', () => {
        cy.fixture('dataApiTest').then((data) => {
            const slugSample = data.sampleData.sampleSlug
            cy.request('GET', `${urlApi}/categories/slug/${slugSample}`).then((getResponse) => {
                // Cek status code
                expect(getResponse.status).to.eq(200)
                // Response time
                expect(getResponse.duration).to.be.lessThan(1500)
                // Cek response body struktur
                expect(getResponse.body).to.have.property('id')
                expect(getResponse.body).to.have.property('name')
                expect(getResponse.body).to.have.property('slug')
                expect(getResponse.body).to.have.property('image')
                expect(getResponse.body).to.have.property('creationAt')
                expect(getResponse.body).to.have.property('updatedAt')
                // Cek slug sesuai
                expect(getResponse.body.slug).to.eq(slugSample)
            })
        })
    })

    // 9. GET DATA WITH LIMIT
    it('Get data dengan batasan 3', () => {
        cy.request('GET', `${urlApi}/categories?limit=3`).then((limitResponse) => {
            // Cek status code
            expect(limitResponse.status).to.eq(200)
            // Response time
            expect(limitResponse.duration).to.be.lessThan(1500)
            // Cek response body array
            expect(limitResponse.body).to.be.an('array')
            // Cek jumlah data sesuai limit
            expect(limitResponse.body.length).to.eq(3)
            // Cek response body struktur
            const category = limitResponse.body[0] // ambil index pertama saja
            expect(category).to.have.property('id')
            expect(category).to.have.property('name')
            expect(category).to.have.property('slug')
            expect(category).to.have.property('image')
            expect(category).to.have.property('creationAt')
            expect(category).to.have.property('updatedAt')
            // Cek tipe data
            expect(category.id).to.be.a('number')
            expect(category.name).to.be.a('string')
            expect(category.slug).to.be.a('string')
            expect(category.image).to.be.a('string')
            expect(category.creationAt).to.be.a('string')
            expect(category.updatedAt).to.be.a('string')
        })
    })

    // 10. GET ALL PRODUCTS BY CATEGORY
    it('Get data semua produk berdasarkan category', () => {
        cy.request('GET', `${urlApi}/categories/2/products`).then((getProductResponse) => {
            // Cek status code
            expect(getProductResponse.status).to.eq(200)
            // Response time
            expect(getProductResponse.duration).to.be.lessThan(1500)
            // Cek response body adalah array
            expect(getProductResponse.body).to.be.an('array')
            // Cek response body struktur jika ada data
            if (getProductResponse.body.length > 0) {
                const productResponse = getProductResponse.body[0]

                expect(productResponse).to.have.property('id')
                expect(productResponse).to.have.property('title')
                expect(productResponse).to.have.property('slug')
                expect(productResponse).to.have.property('price')
                expect(productResponse).to.have.property('description')
                expect(productResponse).to.have.property('category')

                // Cek data produk apakah categorynya sesuai
                expect(productResponse.category.id).to.eq(2)
            }
        })
    })

    // 11. DELETE BY VALID ID
    it('Hapus category dengan id yg valid', () => {
        cy.fixture('dataApiTest').then((newData) => {
            cy.request('DELETE', `${urlApi}/categories/${categoryID}`).then((deleteResponse) => {
                // Cek status code
                expect(deleteResponse.status).to.eq(200)
                // Response time
                expect(deleteResponse.duration).to.be.lessThan(1500)
                // Cek response body mengembalikan nilai true jika berhasil hapus dan id ada
                expect(deleteResponse.body).to.eq('true')
            })
        })
    })

    // 12. DELETE BY INVALID ID
    it('Hapus category dengan id yg tidak valid', () => {
        cy.fixture('dataApiTest').then((newData) => {
            const delInvalidID = newData.sampleID.deleteInvalidID
            cy.request({method: 'DELETE', url: `${urlApi}/categories/${delInvalidID}`, failOnStatusCode: false}).then((deleteResponse) => {
                // Cek status code
                expect(deleteResponse.status).to.eq(400)
                // Response time
                expect(deleteResponse.duration).to.be.lessThan(1500)
                // Cek response body isi pesan error
                expect(deleteResponse.body).to.have.property('message')
            })
        })
    })
})
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
        const user = {
            'username': 'testing',
            'name': 'tester',
            'password': 'test',
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testing')
            cy.get('#password').type('test')
            cy.get('#login-button').click()
            cy.get('html').should('contain', 'testing is currently logged in')

        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('sun')
            cy.get('#password').type('mutsis')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'testing is currently logged in')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testing', password: 'test' }).then(() => {
                cy.create({ author: 'yo mama', title: 'cookig', url: 'asd' })
                cy.create({ author: 'yo fafa', title: 'cleaning', url: 'dsa' })
            })
            cy.reload()
        })

        it('A blog can be created', function() {
            cy.get('#show-create').click()
            cy.get('input[name="title"]').type('title')
            cy.get('input[name="author"]').type('author')
            cy.get('input[name="url"]').type('url')
            cy.get('#create-blog').click()
            cy.get('.success')
                .should('contain', 'Blog created successfully')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('have.css', 'border-style', 'solid')
            cy.get('html').should('contain', 'title author')
        })
        it('A blog can liked', function() {
            cy.contains('yo mama').contains('view').click()
            cy.contains('Like').click()
            cy.get('html').should('contain', 1)
        })
        it('A blog can deleted', function() {
            cy.contains('yo mama').contains('view').click()
            cy.contains('Remove').click()
            cy.get('.success')
                .should('contain', 'Blog deleted succesfully')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'yo mama')
        })
        it('Blogs are ordered by likes', function() {
            cy.get('.blog-wrapper').first().should('contain', 'yo mama')
            cy.contains('yo fafa').contains('view').click()
            cy.contains('Like').click()
            cy.get('.blog-wrapper').first().should('contain', 'yo fafa')
        })

    })
})

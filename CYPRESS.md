# Cypress 
(cyprer link)[https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress]

### Install npm for cypress
``
npm install cypress --save-dev
``
### To Open the cypress in the chore browser
``
npx cypress open
``

### To run the cypress in the terminal
``
npx cypress run
``

## To run the cypress for the particular test case
``
npx cypress run --spec cypress/integration/filename.spec.js
``

# Note
  * cypress is a tool for testing web applications.
  * *spec* key is not mandatory one
  * we can use *ChroPath* chrome extension to find the selector


## Call the element using below
  * cy.get('.className')
  * cy.get('#id')
  * cy.get('[data-cy=data-cy]')
  * cy.get('[data-cy=data-cy]').click()
  * cy.get('[data-cy=data-cy]').type('text')
  * cy.get('[data-cy=data-cy]').clear()
  * cy.get('[data-cy=data-cy]').should('have.value', 'text')
  * cy.get('[data-cy=data-cy]').should('have.attr', 'data-cy')
  * cy.get('[data-cy=data-cy]').should('have.class', 'className')
  * cy.get('[data-cy=data-cy]').should('be.visible')
  * cy.get('[data-cy=data-cy]').should('be.disabled')
  * cy.get('[data-cy=data-cy]').should('be.enabled')
  * cy.get('[data-cy=data-cy]').should('be.focused')
  * cy.get('[data-cy=data-cy]').should('be.selected')
  * cy.get('[data-cy=data-cy]').should('be.checked')
  * cy.get('[data-cy=data-cy]').should('be.empty')
  * cy.get('[data-cy=data-cy]').should('not.be.empty')
  * cy.get('[data-cy=data-cy]').should('exist')
  * cy.get('[data-cy=data-cy]').should('not.exist')
  * cy.get('[data-cy=data-cy]').should('contain', 'text')
  * cy.get('[data-cy=data-cy]').should('not.contain', 'text')
  * cy.get('[data-cy=data-cy]').should('have.length', 1)
  * cy.get('[data-cy=data-cy]').should('have.length', 2)
  * cy.get('[data-cy=data-cy]').should('have.length.greaterThan', 1)
  * cy.get('[data-cy=data-cy]').should('have.length.lessThan', 2)
  * cy.get('[data-cy=data-cy]').should('have.length.gte', 1)
  * cy.get('[data-cy=data-cy]').should('have.length.lte', 2)
  * cy.get('[data-cy=data-cy]').should('have.length.within', [1, 2])
  * cy.get('[data-cy=data-cy]').should('have.length.outside', [1, 2])
  * cy.get('[data-cy=data-cy]').should('have.length.above', 1)
  * cy.get('[data-cy=data-cy]').should('have.length.below', 2)
  * cy.get('[data-cy=data-cy]').should('have.length.and', [1, 2])
  * cy.get('[data-cy=data-cy]').should('have.length.or', [1, 2])
  * cy.get('[data-cy=data-cy]').should('have.length.above', 1)
  * cy.get('[data-cy=data-cy]').should('have.length.below', 2)

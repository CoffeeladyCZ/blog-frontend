describe('Can access protected pages', () => {
  beforeEach(() => {
    cy.login();
  });

  it('tries to create an article', () => {
    cy.visit('http://localhost:3000/articles');
    cy.clickLink('article/new', 'New Article');

    cy.get('input#title').type('[Cypress] Test article ');
    cy.get('input#perex').type('Perex');

    cy.uploadFile('[data-testid="addFile"]', 'sample-img.jpg', 'image/jpeg').then(() => {
      cy.get('[data-testid="uploadFileButton"]').click({ force: true });
    });

    cy.get('div#content')
      .find('textarea.w-md-editor-text-input')
      .type('{selectAll}')
      .type('Content');

    cy.get('[data-testid="addArticleButton"]').click();
    cy.wait(1000);

    cy.url().should('match', new RegExp('http://localhost:3000/article'));
  });

  it('allows the user to edit an article', () => {
    cy.clickLink('/articles', 'My Articles');
    cy.visit('localhost:3000/article/edit/41c5a55d-b6cd-4dae-8929-55651ab2ad9b');

    cy.get('[data-testid="editButton"]').click();
    cy.get('form').should('be.visible');

    cy.get('input#title').clear().type('Nový název článku');
    cy.get('input#perex').clear().type('Nový perex článku');

    cy.get('div#content').find('textarea').clear().type('Nový obsah článku');
    cy.get('[data-testid="editButton"]').click();

    cy.url().should('eq', 'http://localhost:3000/articles');
  });
});

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};

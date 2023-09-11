describe("Can't access protected pages", () => {
  it('should hide certain menu items when the user is not logged in', () => {
    cy.visit('localhost:3000/');
    cy.get('a[href*="/article/new"]').should('not.exist');
    cy.get('a[href*="/articles"]').should('not.exist');
  });
});

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};

describe('Login Page', () => {
  it('should display an error message for invalid login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="loginEmail"]').type('invalid@example.com');
    cy.get('[data-testid="loginPassword"]').type('invalidpassword');
    cy.get('[data-testid="loginButton"]').click();
    cy.get('[id="error"]').should('be.visible');
  });
});

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};

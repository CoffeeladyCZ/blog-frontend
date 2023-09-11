/// <reference types="cypress" />
import 'cypress-file-upload';

Cypress.Commands.add('clickLink', (href: string | RegExp, label: string | RegExp) => {
  cy.get(`a[href*="${href}"]`).contains(label).click();
});

Cypress.Commands.add('login', () => {
  cy.visit('localhost:3000/');
  cy.clickLink('login', 'Log in');
  cy.fixture('login').then((loginData) => {
    cy.get('input#email').type(loginData.username);
    cy.get('input#password').type(loginData.password);
    cy.get('[data-testid="loginButton"]').click();
    cy.wait(1000);
  });
  return;
});

Cypress.Commands.add('uploadFile', (selector, fileUrl, fileType) => {
  return cy.get<HTMLInputElement>(selector).then((subject) => {
    return cy.fixture(fileUrl, 'base64').then((fileContent) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, fileType);
      const testFile = new File([blob], fileUrl, { type: fileType });
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(testFile);
      subject[0].files = dataTransfer.files;

      return new Promise<void>((resolve) => resolve());
    });
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      clickLink(href: string | RegExp, value: string | RegExp): Chainable<JQuery<HTMLElement>>;
      login(): Chainable<JQuery<HTMLElement>>;
      uploadFile(selector: string, fileUrl: string, type: string);
    }
  }
}

// cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module
export {};

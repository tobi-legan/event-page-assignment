// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import '@testing-library/cypress/add-commands';

import 'cypress-wait-until';

Cypress.Commands.add("verifyLink", (linkText, href) => {
    cy.findByText(linkText).should("have.attr", "href", href);
});

Cypress.Commands.add("clickButton", (buttonTextName) => {
  cy.findByRole('button', {name: buttonTextName}).click();
});


Cypress.Commands.add('findButton', (buttonTextName) => {
  return cy.findByRole('button', {name: buttonTextName});
})

Cypress.Commands.add("getTextCheckIfTextExists", (textName) => {
  cy.findByText(textName).should('exist');
});

Cypress.Commands.add("getTextCheckIfTextDoesNotExists", (textName) => {
  cy.findByText(textName).should('not.exist');
});

Cypress.Commands.add("clickATextValue", (textName) => {
  cy.findByText(textName).click();
});
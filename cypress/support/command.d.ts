// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {

    /**
     * Finds a link text and helps validate the link 
     *
     * @example
     * cy
     *   .verifyLink('Link Text', hrefLink)
     */
     verifyLink();
     
     /**
     * Finds a button and helps click the button
     *
     * @example
     * cy
     *   .clickButton("buttonTextName")
     */
     clickButton();

     /**
     * Finds a text and helps check if it exists
     *
     * @example
     * cy
     *   .getTextCheckIfTextExists("textValue")
     */
      getTextCheckIfTextExists();

      /**
     * Finds a text and helps check if it does not exists
     *
     * @example
     * cy
     *   .getTextCheckIfTextDoesNotExists("textValue")
     */
       getTextCheckIfTextDoesNotExists();
  }
}
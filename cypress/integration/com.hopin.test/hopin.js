/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @module Hopin
 * @description This test suite will contains all the tests for the hopin interview.
 * @author Alessandro Follo Borini
 * @see <a href="https://github.com/AleBorini/privateRepo"> Git repository</a>
 *
 */

describe('Hopin Suite', function () {

  /**
   * @Class Hopin
   * @Description Login/Logout test hopin.com
   */

  /*it('Login/Logout Test', function () {
    cy.login(Cypress.env('url'), Cypress.env('email'), Cypress.env('password'))
    cy.logout();
  })*/

  it('Login/Logout Test', function () {
    cy.login(Cypress.env('url'), Cypress.env('email'), Cypress.env('password'))
    cy.wait(3000)
  })

})


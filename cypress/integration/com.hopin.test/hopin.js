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
   * @Description Login test hopin.com
   */

  it('Login Test', function () {

    cy.visit(Cypress.env('url'));
    cy.get('[class*="nav_link hidden"]').click();
    cy.get('#user_email').type(Cypress.env('email'));
    cy.get('#user_password').type(Cypress.env('password'));
    cy.get('[data-smoke-test-id="signin_button"]').click();
    cy.get('.flash > p').should('be.visible')
    .text().should('equal', "Signed in successfully")
    //cy.wait(2000)

  })

})


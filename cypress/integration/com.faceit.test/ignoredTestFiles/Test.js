/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @author Alessandro Follo Borini
 * @module Test
 * @description Suite description test
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 */

describe('Test Suite', function () {

  /**
   * @Class Test 1
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Test 1', function () {

    cy.visit(Cypress.env("url"));
    cy.url().should('include', 'faceit')

  })

  /**
   * @Class Test 2
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Test 2', function () {

    cy.visit(Cypress.env("url"));
    cy.get('[class="m2l-sm111"]').click();

  })

  /**
   * @Class Test 3
   * @Description This will login to Faceit using oauth endpoint
   **/

  it('Test 3', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

  })

})

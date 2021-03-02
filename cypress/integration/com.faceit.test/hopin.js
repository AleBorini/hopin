/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @module Hopin
 * @description This test suite will contains all the tests for the hopin interview.
 * @author Alessandro Follo Borini
 * @see <a href="https://github.com/AleBorini/privateRepo"> Git repository</a>
 *
 */

describe('Clean Suite', function () {

  /**
   * @Class Hopin
   * @Description Login test hopin.com
   */

  it('Premade Team Delete All', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.get('[ng-click="vm.openCloseSection(\'teams\')"]').click();

    cy.get('[name="team.name"]')
    .each(($el) => {
      if ($el.text() === 'TeamTest') {
        cy.log("There are no teams to delete here")
      } else {
        cy.wrap($el).click();
        cy.get('.subpage-nav__list__link > span').click();
        cy.get('.users-list > :nth-child(1)').scrollIntoView()
        .should('be.visible');
        cy.elementExistClick('[ng-click*="vm.remove"]');
        cy.get('.text-right > .btn').click();
        cy.get('[ng-click="close()"]').click();
        cy.url().should('not.include', 'teams');
        cy.log("One team has been deleted")
        cy.wait(1500);
      }
    })

  })

})


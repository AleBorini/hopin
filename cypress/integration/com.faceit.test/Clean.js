/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @module Clean
 * @description This test suite will contains all the tests that are used to clean the environment
 * from useless teams, hubs and championships.
 * @author Alessandro Follo Borini
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 *
 */

describe('Clean Suite', function () {

  /**
   * @Class Premade Team delete all
   * @Description The test will clean the environment from
   * all the premade teams that are not in use.
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

  /**
   * @Class Hubs Leave All User 2
   * @Description The test will clean the environment
   * from all not necessary hubs using user 2
   */

  it('Hubs Leave All User 2', function () {
    const user2 = "autofaceit6"
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        user2 + "@faceit.com", Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.get('[ng-click*="hubs"]').click();
    cy.get('[ng-bind*="hub.name"]')
    .each(($el) => {
      if ($el.text() === 'TestHub') {
        cy.log("There are no hubs to delete here")
      } else {
        cy.get('[ng-bind*="vm.hub.name"]').eq(0).click();
        cy.get('[popover-is-open*="MenuOpen"]').trigger('mouseover');
        cy.xpath("//*[contains(text(),'Leave hub')]").click();
        cy.get('[class*="btn btn-primary btn"]').click();
        cy.get('[class="championship__title"]').should('be.visible');
        cy.wait(1500);
      }
    })
  })

  /**
   * @Class Hubs delete all
   * @Description The test will clean the environment from
   * all the premade teams that are not in use.
   */

  it('Hubs Delete All', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.get('[ng-click*="hubs"]').click();
    cy.get('[ng-bind*="hub.name"]')
    .each(($el) => {
      if ($el.text() === 'TestHub') {
        cy.log("There are no hubs to delete here")
      } else {
        cy.wrap($el).click();
        cy.xpath("//*[contains(text(),'Rules')]").should('be.visible');
        cy.wait(1000);
        cy.elementExistClick('[class="fi-navbar__drawer__button"]');
        cy.elementExistClick(
            '[class*="icon-ic_navigation_settings"]:nth-last-of-type(1)');
        cy.get("[class='btn--text text-danger text-initial']").click();
        cy.get("button[class='btn btn-primary btn-min-width']").click();
        cy.url().should('not.include', 'hub')
        cy.xpath("//*[contains(text(),'steps')]").should("be.visible");
        cy.xpath(
            "//*[@class='fi-navbar__main__item']//*[contains(text(),'Play')]")
        .click({force: true});

      }
    })
  })

  /**
   * @Class Preamde Team Fix User 1
   * @Description The test will clean the environment fixing
   * problem there on the test premade team from user 1 pov.
   */

  it('Premade Team Fix User 1', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.get('[ng-click="vm.openCloseSection(\'teams\')"]').click();

    cy.get('[name="team.name"]')
    .each(($el) => {
      if ($el.text() === 'TeamTest') {
        cy.wrap($el).click();
      }
    })
    cy.get('.subpage-nav__list__link > span').click();
    cy.elementExistClick('[ng-click*="demoteMember"]');
    cy.get('[ng-click*="demoteMember"]').should('not.exist');

  })

  /**
   * @Class Preamde Team Fix User 1
   * @Description The test will clean the environment fixing
   * problem there on the test premade team from user 1 pov.
   */

  it('Premade Team Fix User 2', function () {
    const user2 = "autofaceit6"
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        user2 + "@faceit.com", Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.get('[ng-click="vm.openCloseSection(\'teams\')"]').click();
    cy.get('[name="team.name"]')
    .each(($el) => {
      if ($el.text() === 'TeamTest') {
        cy.wrap($el).click();
      }
    })
    cy.get('[class="users-list__item flex-center-spaced"]').should(
        'be.visible');
    cy.elementExistClick('.subpage-nav__list__link > span');
    cy.elementExistClick('[ng-click*="vm.promoteMember"]');
    cy.elementExistClick('[class*="btn btn-primary"]');
    cy.wait(500);
    cy.elementExistClick('[ng-click*="vm.demoteMember"]');
    cy.get('[ng-click*="vm.demoteMember"]').should('not.exist');
    cy.log("User 1 promoted to admin correctly");

  })
})


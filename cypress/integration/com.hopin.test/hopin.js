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
   * @Class Login/Logout Test
   * @Description Login/Logout test hopin.com.
   * Contains commands from "../com.hopin.commands/loginCommands"
   * Data loaded from environment variables.
   */

  it('Login/Logout Test', function () {
    cy.login(Cypress.env('url'), Cypress.env('email'), Cypress.env('password'))
    cy.logout();

  })

  /**
   * @Class Create random event test
   * @Description Check element on contact sales team page and compile form.
   * Data loaded from environment variable.
   */

  it('Contact sales team', function () {

    cy.visit(Cypress.env('url'));
    cy.get('.mr-2').click();

    cy.get('[class*="section-title"]').should('be.visible');
    cy.get('[class*="contact-sales-text"]').should('be.visible');

    cy.get('[data-animation="cross"]')
    .should('have.attr', 'data-delay', '4000')
    .should('have.attr', 'data-autoplay', '1')
    .should('have.attr', 'data-duration', '500')
    cy.get('[class*="slider-arrow"]').should('be.visible');

    cy.get('[data-name="first_name"]').type(Cypress.env('name'));
    cy.get('[data-name="last_name"]').type(Cypress.env('lastName'));

    cy.get('[data-name="00N4W00000MF13q"] > option').eq(
        Math.floor(Math.random() * 3) + 1).then(
        ($el) => {
          cy.get('[data-name="00N4W00000MF13q"]').select($el.get(0).innerText);
          cy.log("Region selected as | " + $el.get(0).innerText)
        })

    cy.get('[data-name="company"]').type(Cypress.env('company'));
    cy.get('[data-name="title"]').type(Cypress.env('job'));
    cy.get('[data-name="email"]').type(Cypress.env('email'));
    cy.get('[class*="custom-radio-item"]').eq(0).click();
    cy.get('[class*="custom-checkbox-item"]').click();
    //cy.get('#submitButton').click();

  })

  /**
   * @Class Create organization
   * @Description Create an organization and upload
   * profile and cover images.
   * Images loaded from fixtures.
   */

  it('Create an organization test', function () {
    const orgData = Math.random().toString(36).substr(2, 10);

    cy.login(Cypress.env('url'), Cypress.env('email'), Cypress.env('password'))
    cy.get('[class="dashboard-navigation_item "]').eq(-1).click();
    cy.get('#organization_name').type(orgData);
    cy.get('#organization_email').type(orgData + "@google.com");
    cy.get('#organization_about').type(orgData);

    cy.get('[class="option_content"]')
    .each(($el) => {
      cy.wrap($el).click()
    })

    cy.get('#organization_picture').attachFile('logo.png');
    cy.get('#organization_cover_image').attachFile('cover.png');


    //Not gonna save I still dont know if I can delete and limitations
    //cy.get('.-full').click();
  })

  /**
   * @Class Create random event test
   * @Description Create a completely random event and delete it. Pretty useless but fun.
   */




})


/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @module Hopin
 * @description This test suite will contains all the tests for the hopin interview.
 * @author Alessandro Follo Borini
 * @see <a href="https://github.com/AleBorini/privateRepo"> Git repository</a>
 *
 */

describe('WIP Suite', function () {

  /**
   * @Class Hopin
   * @Description Work in progress test hopin.com
   */

  /*it('WIP', function () {

    cy.login(Cypress.env('url'), Cypress.env('email'), Cypress.env('password'))
    cy.contains('Find an event').click();
    cy.get('[role="combobox"]').type('Google');
    cy.get("[aria-label='search for events']").click();
    cy.get('[aria-pressed="false"]').eq(0).click();
    cy.get("[for='price-filter-type-free']").click();
    cy.get("[class*='select-styles']").select('Any currency');
    cy.get('[for="events-only"]').click();
    cy.get('[class*="component-styles__Label"]').eq(0).click();
    cy.get('[class*="TitleLink"]').eq(1).click();
    cy.get('#event_registration_fields_Job\ Title').type(Cypress.env('Job'));
    cy.get('#event_registration_fields_Company\ Name').type(Cypress.env('name'));
    cy.get('#event_registration_fields_Company\ Name').type(Cypress.env('email'));
    cy.wait(2000);


  })*/

  it('Create sposor event', function () {
      const eventName = Math.random().toString(36).substr(2, 10);

      cy.login(Cypress.env('url'), Cypress.env('email'),
          Cypress.env('password'))

      cy.eventCreate(eventName);
      cy.sponsorCreate(this.data.sponsor_name, this.data.sponsor_website, 'logo.png');

      cy.get('[data-original-title*="sign up"]').click();




      cy.eventDelete(eventName)
  })

})


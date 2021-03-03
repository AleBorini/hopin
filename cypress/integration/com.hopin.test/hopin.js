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

  it('Create random event test', function () {
    const eventName = Math.random().toString(36).substr(2, 10);
    cy.login(Cypress.env('url'), Cypress.env('email'),
        Cypress.env('password'))
    cy.get('[class="dashboard-navigation_item "]').eq(0).click();
    cy.get('[data-testid="tab-panel"]').eq(1).click();
    cy.get('[class="button"]').click();
    cy.get('#name').type(eventName);
    cy.get('#start').click();

    cy.get('[class="nice-dates-day -wide"]')
    .eq(Math.floor(Math.random() * 24))
    .click();

    cy.get('[class="nice-dates-day -wide"]')
    .eq(Math.floor(Math.random() * 2))
    .click();

    const time = Math.floor(Math.random() * 23) + ":00";
    cy.get('[aria-label="Start time"]').clear().type(time);
    cy.get('[aria-label="End time"]').clear().type(time);
    cy.log('Starting/End time selected as | ' + time)

    cy.get('#timezone > option').eq(Math.floor(Math.random() * 150)).then(
        ($el) => {
          cy.get('#timezone').select($el.get(0).innerText);
          cy.log("Time zone selected as | " + $el.get(0).innerText)
        })

    cy.get('[class*="option_content "]').each(randomElement => {
      cy.wrap(randomElement).click();
    });

    for(let i = 0; i < 5; i++){
    cy.get('[class*="option_content "]').eq(Math.floor(Math.random() * 3)).click();
    }

    for(let i = 0; i < 5; i++){
    cy.get('[class="option_content"]').eq(Math.floor(Math.random() * 6)).click();
    }


    cy.get('.button').should('be.visible').click({force:true});
    cy.url().should('contain', eventName + '/dashboard');
    cy.get('[class*="EventTitle"]').text().should('equal', eventName);

    cy.get('[data-original-title="Back to dashboard"]').click();
    cy.get('[data-toggle-dropdown*="event-dropdown"]').eq(0).click();
    cy.get('[data-method="delete"]').eq(0).click();
    //cy.on('window:confirm', () => true);
    cy.contains(eventName).should('not.exist');

  })

})


/// <reference types="Cypress" />

import "cypress-iframe"
import {LoremIpsum} from "lorem-ipsum";

/**
 * @module Hopin
 * @description This test suite will contains all the tests for the hopin interview.
 * @author Alessandro Follo Borini
 * @see <a href="https://github.com/AleBorini/privateRepo"> Git repository</a>
 *
 */

describe('Hopin Suite', function () {


  /**
   * @Class Login/Logout test
   * @Description Login/Logout test hopin.com.
   * Contains commands from "../com.hopin.commands/loginCommands"
   * Data loaded from environment variables.
   */

  it('Login/Logout Test', function () {
    cy.login(Cypress.env('url'), Cypress.env('email'), Cypress.env('password'))
    cy.logout();

  })


  /**
   * @Class Contact sales team test
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

    //Not gonna save to avoid spamming production
    //cy.get('#submitButton').click();

  })


  /**
   * @Class Create organization test
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
   * @Class Create event sponsor test
   * @Description The test creates a new event, a new sponsor and
   * then add tne sponsor to the event registration page.
   *
   * test will generate a random lore ipsum for the the
   * registration 'about' and all the other data are loaded
   * from the fixtures.
   */

  it('Create event sponsor', function () {

    const eventName = Math.random().toString(36).substr(2, 10);
    cy.login(Cypress.env('url'), Cypress.env('email'),
        Cypress.env('password'))

    cy.eventCreate(eventName);
    cy.sponsorCreate(this.data.sponsor_name, this.data.sponsor_website,
        'logo.png');

    cy.get('[data-original-title*="sign up"]').click();

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 4,
        min: 2
      },
      wordsPerSentence: {
        max: 6,
        min: 3
      }
    });

    cy.get("[aria-label*=' Editor']").type(lorem.generateSentences(5));
    cy.get('#event_picture').attachFile('cover.png');
    cy.get('[aria-labelledby*="add-a-new-sponsor"]').eq(0).click();

    cy.contains(this.data.sponsor_name).should('be.visible');
    cy.get('[src*="sponsors/logos"]').should('be.visible');
    cy.get("[class*='SponsorRowAction']").click();
    cy.get('[class*="selected"]').should('be.visible');
    cy.get('[class="btn btn-success"]').click();
    cy.get('[src*="sponsors/logos"]').should('be.visible');
    cy.get("[name='button']").click();
    cy.get('.flash > p').should('be.visible')
    .text().should('equal', "Event was successfully updated.");

    cy.eventDelete(eventName)
  })


  /**
   * @Class Create random event test
   * @Description The test creates a new event selecting completely random data.
   * Pretty useless but fun to write.
   *
   */

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
    .eq(Math.floor(Math.random() * (15 - 3 + 1)) + 3)
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

    for (let i = 0; i < 3; i++) {
      cy.get('[class*="option_content "]').eq(
          Math.floor(Math.random() * 3)).click();
    }

    for (let i = 0; i < 5; i++) {
      cy.get('[class="option_content"]').eq(
          Math.floor(Math.random() * 6)).click();
    }

    cy.get('.button').should('be.visible').click({force: true});
    cy.url().should('contain', eventName + '/dashboard');
    cy.get('[class*="EventTitle"]').text().should('equal', eventName);

    cy.eventDelete(eventName)

  })


})


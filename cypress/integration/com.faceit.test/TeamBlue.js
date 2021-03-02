/// <reference types="Cypress" />

import "cypress-iframe"


/**
 * @module TeamBlue
 * @description Suite description test
 * @author Alessandro Follo Borini
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 */

describe('Team Blue Suite', function () {

  /**
   * @Class Send Chat Message
   * @Description The test will open the chat and will send a normal text message
   * to a friend in the list. Will also double check that the message has been
   * displayed correctly on the FE.
   */

  it('Send Chat Message', function () {

    const random = Math.random().toString(36).substr(2, 6);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.log("Opening the chat session")
    cy.xpath("/html/body/fcc-react-floater/div/div/div/div[1]/div[1]/div")
    .click();
    cy.log("Chat session opened")
    cy.get("[placeholder*='Message']").click();
    cy.log("Selecting text area")
    cy.get("[placeholder*='Message']").type(random);
    cy.log("Message sent as | " + random)
    cy.get("[placeholder*='Message']").type("{enter}");
    cy.get(".nickname").text().then((nickname) => {
      cy.xpath("(//*[@color='#e1e1e1'])[last()-0]")
      .text()
      .should("equal", nickname);
      cy.log("User nickname displayed correctly")
    })
    cy.wait(1000);
    cy.xpath("(//*[@class='paragraph'])[last()-0]").text().should("equal",
        random);
    cy.log("Message displayed correctly")

  })


  /**
   * @Class Send Emoji Message
   * @Description The test will open the chat and will send a random emoji message
   * to a friend in the list. Will also double check that the emoji has been
   * displayed correctly on the FE.
   */

  it('Send Emoji Message', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.log("Opening the chat session")
    cy.xpath("/html/body/fcc-react-floater/div/div/div/div[1]/div[1]/div")
    .click();
    cy.log("Chat session opened")
    cy.log("Selecting a random emoji")
    cy.xpath("(//*[@viewBox='0 0 128 128'])[2]").click();
    const randomInt = Math.floor(Math.random() * 6) + 1;
    cy.xpath("//img[contains(@alt, 'face')]")
    .eq(randomInt)
    .click();
    cy.log("Random emo")
    cy.get("[placeholder*='Message']").text().then((emoji) => {
      cy.get("[placeholder*='Message']").type("{enter}")
      cy.wait(1000)
      cy.log("Random emoji selected as | " + emoji)
      cy.xpath("(//img[contains(@alt, 'face')])[last()-0]")
      .invoke("attr", "alt").should("contain", emoji);
    });
  })

})

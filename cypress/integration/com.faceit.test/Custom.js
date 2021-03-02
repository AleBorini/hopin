/// <reference types="Cypress" />

/**
 * @module Custom
 * @description  Custom suite created to contain all the work in progress tests.
 * @author Alessandro Follo Borini
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 */

describe('Custom work in progress Suite', function () {

  it('Clan Create', function () {

    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.clanCreate(random);
    cy.clanDelete(random);

 })

  it('Clan Lobby Create', function () {

    const random = Math.random().toString(36).substr(2, 5);
    const i = Math.floor((Math.random() * 2));
    const i2 = Math.floor(Math.random() * 8);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.clanCreate(random);
    cy.xpath("//div[normalize-space()='Create the first lobby']").should('be.visible');
    cy.get('[data-testid="Holder"]').eq(1).should('be.visible');
    cy.get('[data-testid="Holder"]').eq(0).click();
    cy.get('[class*="LobbyNameInput"]').clear().type("lobby_" + random);
    cy.get('[aria-label="open menu"]').eq(0).click();
    cy.get('[id*="downshift-0-item"]').eq(i).click();

    cy.get('[aria-label="open menu"]').eq(1).click();
    cy.get('[id*="downshift-1-item"]').eq(i2).click();
    cy.get('[class*="FooterButton"]').eq(1).click();
    cy.contains("lobby_" + random).should('be.visible');
    cy.xpath("//button[contains(text(),'Play')]").should('be.visible');
    cy.clanDelete(random);

  })

  it('Clan Chat Message', function () {

    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.clanCreate(random);

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
    cy.xpath("(//*[@class='paragraph'])[1]").text().should("equal",
        random);
    cy.log("Message displayed correctly")
    cy.clanDelete(random);

  })

  it('Clan Chat Emoji', function () {

    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.clanCreate(random);

    cy.log("Chat session opened")
    cy.log("Selecting a random emoji")
    cy.xpath("(//*[@viewBox='0 0 128 128'])[2]").click();
    cy.get('[alt=":grinning_face:"]').eq(1)
    .click();
    cy.get("[placeholder*='Message']").text().then((emoji) => {
      cy.get("[placeholder*='Message']").type("{enter}")
      cy.wait(1000)
      cy.log("Random emoji selected as | " + emoji)
      cy.get('[alt=":grinning_face:"]').eq(2).should('be.visible');
    });
    cy.log("Emoji message is displayed correctly on the FE.")

    cy.clanDelete(random);

  })

  it('Clan Lobby Chat Message', function () {

    const random = Math.random().toString(36).substr(2, 5);
    const message = Math.random().toString(36).substr(2, 10);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.clanCreate(random);
    cy.clanLobbyCreate();

    cy.log("Chat session opened")
    cy.get("[placeholder*='Message']").eq(0).click();
    cy.log("Selecting text area")
    cy.log("Text area selected");
    cy.get("[placeholder*='Message']").eq(0).type(message);
    cy.log("Message sent as | " + message)
    cy.get("[placeholder*='Message']").eq(0).type("{enter}");
    cy.log("Checking if all the information are displyed correctly on the FE")
    cy.get(".nickname").text().then((nickname) => {
      cy.xpath("(//*[@color='#e1e1e1'])[last()-0]")
      .text()
      .should("equal", nickname);
      cy.log("User nickname displayed correctly")
    })
    cy.contains(message).should('be.visible')
    cy.log("Message displayed correctly");
    cy.clanDelete(random);

  })

  it('Clan Feed Post', function () {

    const random = Math.random().toString(36).substr(2, 5);
    const message = Math.random().toString(36).substr(2, 10);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.clanCreate(random);
    cy.xpath("//*[normalize-space()='Feed']").click();
    cy.get('[placeholder*="Post"]').type(message);
    cy.xpath("//*[contains(text(),'Post')]").click();
    cy.contains(message).should('be.visible')
    cy.clanDelete(random);

  })


})




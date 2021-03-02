/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @module TeamBlack
 * @description Suite description test
 * @author Alessandro Follo Borini
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 */


describe('Team Black Suite', function () {

  /**
   * @Class Hub Join Push
   * @Description This test will make a user join a hub and will double
   * check if the pusher events did work properly.
   */


  /*it('Hub Join Push', function () {

    const hubName = "PushHub"
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(hubName,
        {force: true}).should('have.value', hubName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath('(//div[@class="competition__details"])[1]').click();

    cy.get('.text-center > .btn').should("be.visible");
    cy.xpath("//div[contains(text(),'Hubs')]").click();
    cy.xpath("(//span[@ng-bind='::vm.hub.name'])[1]")
    .text().should("not.be.equal", "PushHub");
    cy.get('.text-center > .btn').click();
    cy.get('fi-navbar-menu > button').click();
    cy.xpath("//*[contains(text(),'Leave hub')]").click();
    cy.get('[ng-click="close()"]').click();
    cy.get('.text-center > .btn', {timeout: 15000}).should("be.visible");

  })*/


  /**
   * @Class Hub Details Push
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Hub Details Push', function () {

    const random = Math.random().toString(36).substr(2, 5);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.hubCreate(random);
    cy.hubValidate(random);
    const newDetails = Math.random().toString(36).substr(2, 5);
    cy.xpath("//span[contains(text(),'Settings')]").click();
    cy.get('[name="name"]').clear().type(newDetails);
    cy.xpath('//textarea[@name="description"]').type(newDetails);
    cy.get('[type="number"]').clear().type('900');
    cy.get('[type="submit"]').click();
    cy.get('[class*="title__te"]').text().should("contain", newDetails);
    cy.hubDelete();

  })


  /**
   * @Class Hub Queue Push
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Hub Queue Push', function () {

    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.hubCreate(random);
    cy.hubValidate(random);
    cy.hubQueueCreate("First In First Out", "1v1")
    cy.get('[ng-model="vm.editableData.open"]').click({force: true});
    cy.get('[type="submit"]').click();
    cy.wait(500);
    cy.get('[data-testid="ClosedButton"]').should('be.visible');
    cy.xpath('(//span[@class="text-no-wrap"])[1]').click();
    cy.get('[type="submit"]').click();
    cy.wait(500);
    cy.get('[data-testid="PlayButton"]').should('be.visible');
    cy.hubQueueDelete();
    cy.hubDelete();

  })


  /**
   * @Class Championship Queue Join Push
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Championship Queue Join Push', function () {

    const ChampName = "PushChamp";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]')
    .type(ChampName, {force: true}).should('have.value', ChampName)
    .type("{enter}");
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.xpath("//span[contains(text(),'Join tournament')]").click();
    cy.wait(500);
    cy.contains("1 queuing").should("be.visible");
    cy.xpath("//button[contains(text(),'Cancel search')]")
    .should("be.visible").click()
    cy.xpath("//span[contains(text(),'Join tournament')]")
    .should("be.visible");

  })


  /**
   * @Class Championship Update Push
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Championship Update Push', function () {

    const random = Math.random().toString(36).substr(2, 5);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.champCreate(random, "5v5");

    const newInfo = Math.random().toString(36).substr(2, 5);
    cy.xpath("//div[contains(text(),'Settings')]").click();
    cy.get("[name='name']").clear().type(newInfo);
    cy.get(".CodeMirror-scroll").click().type(newInfo)
    cy.get("[class*='btn btn-rounded btn-disabled-outline-p']").click();
    cy.wait(1000);
    cy.xpath("//*[contains(text(),'Overview')]").click();

    cy.contains(newInfo).should("be.visible");
    cy.get('p').text().should("contain", newInfo);
    cy.xpath('(//div[@class="flex flex-1"])[2]').click();
    cy.champDelete();

  })


  /**
   * @Class Championship Queue Status Push
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Championship Queue Status Push', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.log("Looking for PushChamp tournament")
    cy.get('.main-header__search > .form-control').click().type('PushChamp',
        {force: true}).should('have.value', "PushChamp");
    cy.get('.main-header__search > .form-control').type("{enter}");
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.log("PushChamp tournament found");

    cy.log("Checking if the Queue is open and working");
    cy.contains("solo").should("be.visible");
    cy.log("Queue is open");
    cy.log("Closing the queue");
    cy.xpath("//div[contains(text(),'Settings')]").click();
    cy.get(':nth-child(2) > .settings-v2__menu__item').click();
    cy.get('[ng-model*="QueueJoin"]').click({force:true});
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    cy.log('Queue closed');
    cy.contains("Overview").click();
    cy.contains("solo").should('not.exist');
    cy.log('Queue closed correctly');

    cy.log('Reopening the queue');
    cy.xpath("//div[contains(text(),'Settings')]").click();
    cy.get(':nth-child(2) > .settings-v2__menu__item').click();
    cy.get('[ng-model*="QueueJoin"]').click({force:true});
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    cy.log('Queue reopened');
    cy.contains("Overview").click();
    cy.contains("solo").should("be.visible");
    cy.log('Queue reopened correctly');

  })


  /**
   * @Class Premade Team Create Push
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Premade Team Create Push', function () {

    const random = Math.random().toString(36).substr(2, 5);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.get('[ui-sref="app.createTeamModal"]').click();
    cy.get('[name="name"]').type(random);
    cy.get('[name="tag"]').type(random);

    cy.get('[ng-model="selected.game"] > option')
    .eq(1).text().then(($el)=>{
      cy.get('[ng-model="selected.game"]').select($el)
    })
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    cy.get('[ng-click="vm.openCloseSection(\'teams\')"]', {timeout: 15000}).click();

    cy.get('[name="team.name"]:last-of-type').should(($el) => {
      expect($el.get(0).innerText).to.eq(random)
    })

    cy.get('.subpage-nav__list__link > span').click();
    cy.get('.text-right > .btn').click();
    cy.get('[ng-click="close()"]').click();
    cy.url().should('not.include', 'teams');
  })


  /**
   * @Class Premade Team Update Push
   * @Description This will login to Faceit using oauth endpoint
   */

  it('Premade Team Update Push', function () {

    const random = Math.random().toString(36).substr(2, 6);

    cy.log('Logging with user 1');
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.teamCreate(random, random);
    cy.wait(1000);
    cy.get('[ng-click="vm.openCloseSection(\'teams\')"]',
        {timeout: 15000}).click();

    cy.get('[name="team.name"]:last-of-type').should(($el) => {
      expect($el.get(0).innerText).to.eq(random)
    })

    cy.get('.subpage-nav__list__link > span').click();
    cy.get('.text-right > .btn').click();
    cy.get('[ng-click="close()"]').click();


  })

})

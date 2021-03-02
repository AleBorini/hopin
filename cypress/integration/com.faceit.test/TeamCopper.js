/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @module TeamCopper
 * @description Suite description test
 * @author Alessandro Follo Borini
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 */


describe('Team Copper Suite', function () {

  /**
   * @Class Championship Create
   * @Description Description of the test
   */

  it('Championship Create', function () {
    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.champCreate(random, "5v5");
    cy.champDelete();

  })

  /**
   * @Class Championship Update
   * @Description Description of the test
   */

  it('Championship Update', function () {

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
   * @Class Create Hub
   * @Description Description of the test
   */

  it('Create Hub', function () {

    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.hubCreate(random);
    cy.hubValidate(random);
    cy.hubDelete();

  })

  /**
   * @Class Create Hub Queue
   * @Description Description of the test
   */

  it('Create Hub Queue', function () {

    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();


    cy.hubCreate(random);
    cy.hubValidate(random);

    cy.hubQueueCreate("First In First Out", "1v1")
    cy.hubQueueDelete();

    cy.hubDelete();

  })

  /**
   * @Class Hub Change Details
   * @Description Description of the test
   */

  it('Hub Change Details', function () {

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
   * @Class Hub Chat Message
   * @Description The test will create a new hub and it
   * will proceed to interact with the chat service
   * sending a text message
   */

  it('Hub Chat Message', function () {
    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.hubCreate(random);
    cy.hubValidate(random);
    cy.log("Chat session opened")
    cy.get("[placeholder*='Message']").click();
    cy.log("Selecting text area")
    cy.log("Text area selected");
    cy.get("[placeholder*='Message']").type(random);
    cy.log("Message sent as | " + random)
    cy.get("[placeholder*='Message']").type("{enter}");
    cy.log("Checking if all the information are displyed correctly on the FE")
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
    cy.hubDelete();
    cy.log("Hub deleted correctly");

  })

  /**
   * @Class Hub Chat Emoji
   * @Description The test will create a new hub and it
   * will proceed to interact with the chat service
   * sending a Emoji message
   */

  it('Hub Chat Emoji', function () {
    const random = Math.random().toString(36).substr(2, 5);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.hubCreate(random);
    cy.hubValidate(random);

    cy.log("Chat session opened")
    cy.log("Selecting a random emoji")
    cy.xpath("(//*[@viewBox='0 0 128 128'])[2]").click();
    const randomInt = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    cy.xpath("//img[contains(@alt, 'face')]")
    .eq(randomInt)
    .click();
    cy.get("[placeholder*='Message']").text().then((emoji) => {
      cy.get("[placeholder*='Message']").type("{enter}")
      cy.wait(1000)
      cy.log("Random emoji selected as | " + emoji)
      cy.xpath("(//img[contains(@alt, 'face')])[22]")
      .invoke("attr", "alt").should("contain", emoji);
    });
    cy.log("Emoji message is displayed correctly on the FE.")
    cy.hubDelete();
    cy.log("Hub deleted correctly")

  })

  /**
   * @Class Hub Stats Page
   * @Description The test will select an official Faceit hub
   * on production and will double check if the stats page is available
   * and displayed correctly
   */

  it('Hub Stats Page', function () {

    const hubName = "FPL CSGO Europe";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.log("Searching for the Faceit hub on production | " + hubName )
    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(hubName,
        {force: true}).should('have.value', hubName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.log("Hub selected correctly");
    cy.xpath(
        '//span[contains(text(),\'Hubs\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.log("Selecting Stats page");
    cy.xpath(
        '//span[contains(text(),\'Stats\') and @ng-bind="vm.item.label"]').click();
    cy.getIframeBody('[ng-src*="faceit.com/widgets/stats"]')
    .find('[class="stats__main-container__table"]')
    .should('be.visible');
    cy.log("Stats displayed correctly");

  })

  /**
   * @Class Hub Matches Page
   * @Description The test will select an official Faceit hub
   * on production and will double check if the matches page is available
   * and displayed correctly
   */

  it('Hub Matches Page', function () {

    const hubName = "FPL CSGO Europe";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.log("Searching for the Faceit hub on production | " + hubName )
    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(hubName,
        {force: true}).should('have.value', hubName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Hubs\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.xpath(
        '//span[contains(text(),\'Matches\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('//span[contains(text(),\'Past\')]').click();
    cy.get('[ng-repeat*="match.matchId"]')
    .its('length')
    .should('be.gte', 19);

  })

  /**
   * @Class Hub Members Page
   * @Description The test will select an official Faceit hub
   * on production and will double check if the members page is available
   * and displayed correctly
   */

  it('Hub Members Page', function () {

    const hubName = "FPL CSGO Europe";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(hubName,
        {force: true}).should('have.value', hubName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Hubs\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.xpath(
        '//span[contains(text(),\'Members\') and @ng-bind="vm.item.label"]').click();
    cy.get('[ng-repeat*="memberships.list"]')
    .its('length')
    .should('be.gte', 19);

  })

  /**
   * @Class Hub Rules Page
   * @Description The test will select an official Faceit hub
   * on production and will double check if the rules page is available
   * and displayed correctly
   */

  it('Hub Rules Page', function () {

    const hubName = "FPL CSGO Europe";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(hubName,
        {force: true}).should('have.value', hubName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Hubs\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.xpath(
        '//span[contains(text(),\'Rules\') and @ng-bind="vm.item.label"]').click();
    cy.get('[class="hub-rules__requirements flex-row"]').should('be.visible');
    cy.get('[ng-if="!vm.rules.body"]').should('be.visible');
    cy.get('[ng-bind="vm.item.badge | number"]')
    .should(($element) => {
      // access the native DOM element
      expect($element.get(0).innerText).to.not.equal('1');
    })

  })

  /**
   * @Class Hub Leaderboard All Time Page
   * @Description The test will select an official Faceit hub
   * on production and will double check if the leaderboard all time page is available
   * and displayed correctly
   */

  it('Hub Leaderboard All Time Page', function () {

    const hubName = "FPL CSGO Europe";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(hubName,
        {force: true}).should('have.value', hubName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Hubs\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.xpath(
        '//span[contains(text(),\'Leaderboard\') and @ng-bind="vm.item.label"]').click();
    cy.xpath("//*[contains(text(),'All time')]").click();
    cy.get('[class="fi-table__cell text-left text-nowrap"]')
    .its('length')
    .should('be.gte', 19);
  })

  /**
   * @Class Hub Leaderboard Season Page
   * @Description The test will select an official Faceit hub
   * on production and will double check if the leaderboard all time page is available
   * and displayed correctly
   */

  it('Hub Leaderboard Season Page', function () {

    const hubName = "FPL CSGO Europe";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(hubName,
        {force: true}).should('have.value', hubName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Hubs\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('(//div[@class="competition__details"])[1]').click();
    cy.xpath(
        '//span[contains(text(),\'Leaderboard\') and @ng-bind="vm.item.label"]').click();
    cy.xpath('(//span[@ng-if="vm.item.showActiveChild"])[1]')
    .should(($div) => {
      // access the native DOM element
      expect($div.get(0).innerText).to.not.equal('SEASON 1');
    })
    cy.get('[class="fi-table__cell text-left text-nowrap"]')
    .its('length')
    .should('be.gte', 19);
  })

  /**
   * @Class Organizer Follow
   * @Description The test will select an official Faceit organizer
   * to interact with the follow functionality
   */

  it('Hub Organizer Follow', function () {
    const orgName = "FPL";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(orgName,
        {force: true}).should('have.value', orgName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Organizers\') and @ng-bind="vm.item.label"]').click();
    cy.get('[ng-repeat="object in data"]').eq(0).click();
    cy.get('[ng-if*="Following"]').should(($div) => {
      expect($div.get(0).innerText).equal(' FOLLOW');
    }).click();
    cy.get('[data-toggle="dropdown"]')
    .should(($div) => {
      expect($div.get(0).innerText).equal(' FOLLOWING ');
    })
    cy.get('[data-toggle="dropdown"]').click();
    cy.get('[ng-click*="unfollow"]').click();
    cy.get('follow-connection > div > .btn').should('be.visible');
  })

  /**
   * @Class Organizer Donate
   * @Description The test will select an official Faceit organizer
   * to interact with the donate functionality
   */

  it('Hub Organizer Donate', function () {
    const orgName = "FPL";
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(orgName,
        {force: true}).should('have.value', orgName)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Organizers\') and @ng-bind="vm.item.label"]').click();
    cy.get('[ng-repeat="object in data"]').eq(0).click();
    cy.get('[class*="btn btn-primary ml"]')
    .should(($div) => {
      expect($div.get(0).innerText).equal('DONATE');
    })
    cy.get('[class*="btn btn-primary ml"]').click();
    cy.wait(2000);
  })

  /**
   * @Class Hub Invite Friend
   * @Description The test will create a hub and will proceed
   * to invite a friend and accept the
   * invitation with a second user.
   */

  it('Hub Invite Friend', function () {
    const random = Math.random().toString(36).substr(2, 5);
    const user2 = "autofaceit6"

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.hubCreate(random);
    cy.hubValidate(random);
    cy.get('[popover-is-open*="MenuOpen"]').trigger('mouseover');
    cy.xpath("//*[contains(text(),'Invite players')]").click();
    cy.get('[placeholder="Search for friends"]').type(user2);
    cy.xpath("//button[contains(text(),'Invite')]").click();
    cy.xpath("//button[contains(text(),'Invited')]").should("be.visible");

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        user2 + "@faceit.com", Cypress.env("user_password_autotest"));
    cy.loginValidate2();
    cy.get('[ui-sref*="app.competitions"]').click();
    cy.get('[ng-bind*="invite.competition.name"]').eq(0).text()
    .should('contain', random);
    cy.get('[ng-click*="vm.joinCompetition"]').eq(0).click();
    cy.get('[ng-bind-html*="growl.message"]')
    .should('be.visible')
    .text().should('contain', 'You joined the');
    cy.get('[class="close"]').eq(0).click();
    cy.get('[ng-bind*="vm.hub.name"]').eq(0)
    .text().should('be.equal', random);
    cy.get('[ng-bind*="vm.hub.name"]').eq(0).click();
    cy.get('[popover-is-open*="MenuOpen"]').trigger('mouseover');
    cy.xpath("//*[contains(text(),'Leave hub')]").click();
    cy.get('[class*="btn btn-primary btn"]').click();
    cy.wait(1000)

    cy.get("body").then(($body) => {
      if ($body.find('[ng-bind*="vm.hub.name"]').length) {
        cy.get('[ng-bind*="vm.hub.name"]').eq(0)
        .text().should('not.be.equal', random);
      }
    })
  })

  /**
   * @Class Hub Invite Link
   * @Description The test will create a hub and will proceed
   * to create an invitation link. The test will then login
   * with a second user and double check if the invite link is working correctly.
   */

  it('Hub Invite Link', function () {
    const random = Math.random().toString(36).substr(2, 5);
    const user2 = "autofaceit6"

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.hubCreate(random);
    cy.hubValidate(random);
    cy.get('[popover-is-open*="MenuOpen"]').trigger('mouseover');
    cy.xpath("//*[contains(text(),'Invite players')]").click();

    cy.get('[value*="faceit"]').attribute('value').then($val => {
      cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
          Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
          Cypress.env("automation_test_secret"),
          user2 + "@faceit.com", Cypress.env("user_password_autotest"));
      cy.visit($val);
    })

    cy.xpath(
        '/html/body/div[4]/invite-react/div/div[2]/div/div[2]/div/div[2]/div[1]')
    .text().should('equal', random);
    cy.xpath("//button[contains(text(),'Accept')]").click();
    cy.get('[class*="cover__info__title__text"]').text().should('equal', random)
    cy.get('[ng-bind*="vm.hub.name"]').eq(0)
    .text().should('be.equal', random);
    cy.get('[ng-bind*="vm.hub.name"]').eq(0).click();
    cy.get('[popover-is-open*="MenuOpen"]').trigger('mouseover');
    cy.xpath("//*[contains(text(),'Leave hub')]").click();
    cy.get('[class*="btn btn-primary btn"]').click();
    cy.wait(1000)

    cy.get("body").then(($body) => {
      if ($body.find('[ng-bind*="vm.hub.name"]').length) {
        cy.get('[ng-bind*="vm.hub.name"]').eq(0)
        .text().should('not.be.equal', random);
      }
    })
  })

  /**
   * @Class Hub Application Join
   * @Description The test will initially create a hub and enable the
   * application to joi will then login with a second user and request
   * to join the hub through application
   *
   */

  it('Hub Application Join', function () {
    const random = Math.random().toString(36).substr(2, 5);
    const application = Math.random().toString(36).substring(2, 16);
    const user2 = "autofaceit6"

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.hubCreate(random);
    cy.hubValidate(random);

    cy.log('Enabling the application option in the settings page')
    cy.xpath("//span[contains(text(),'Settings')]").click();
    cy.get('[name="applicationPermissions"]').click({force: true});
    cy.get('[name="applicationPermissions"]').attribute('class')
    .should('contain', 'not-empty');
    cy.get('[name="applicationInstructions"]').type(random);
    cy.get('[type="submit"]').click();
    cy.get('[type="submit"]').attribute('disabled');
    cy.log('Application option enabled correctly')

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        user2 + "@faceit.com", Cypress.env("user_password_autotest"));
    cy.loginValidate2();

    cy.xpath('(//input[@type="text"])[1]').click()
    cy.xpath('(//input[@type="text"])[1]').type(random,
        {force: true}).should('have.value', random)
    cy.xpath('(//input[@type="text"])[1]').type("{enter}");
    cy.xpath(
        '//span[contains(text(),\'Hubs\') and @ng-bind="vm.item.label"]').click();
    cy.get('[class="competition__details"]').eq(0).click();
    cy.get('[class*="__title --not"]').text().should('equal', random)
    cy.wait(1000);
    cy.get('[class="btn btn-primary"]').should('be.visible').click();
    cy.get('[ng-bind="vm.message"]').text().should('equal', random);
    cy.get('[name="applicationMessage"]').type(application + " " + application);
    cy.get('[type="submit"]').click();
    cy.get('[class="btn btn-default"]').should('be.visible')

  })

  /**
   * @Class Hub Application Accept/Reject
   * @Description The test will interact will the last hub created in
   * the previous test to accept or decline randomly
   * all the applications available
   */

  it('Hub Application Accept/Reject', function () {

    const i = Math.floor((Math.random() * 2));
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.get('[ng-click*="hubs"]').click();
    cy.get('[ng-bind*="hub.name"]').eq(0).then($el => {
      if ($el.text() === 'TestHub') {
        cy.log("Test hub, nothing to do here")
      } else {
        cy.get('[ng-bind*="hub.name"]').eq(0).click();
        cy.xpath("//*[contains(text(),'Admin')]").click();
        cy.xpath("//*[contains(text(),'Applications')]").click();
        cy.xpath("//b[contains(text(),'AutoFaceit6')]").should("be.visible");
        cy.get('[class*="table-actions__button"]').eq(i).click();
        cy.get('[class="--auto-stripe"]').should('not.exist');
      }
    })
  })

})

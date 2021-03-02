/// <reference types="Cypress" />

import "cypress-iframe"

/**
 * @module TeamCore
 * @description Suite description test
 * @author Alessandro Follo Borini
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 *
 *
 * @Todo test that when we publish a new status message the frontend shows the updated message via push notification
 * @Todo test that the frontend, when it loads the page, shows the status message
 */


const user2 = "autofaceit6"

describe('Team Core Suite', function () {

  /*it('Create Party Basic', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.get('[data-test-id="createParty"]').click();
    cy.xpath('(//button[@data-test-id="partyInvite"])[1]').click();
    cy.get('[data-test-id="inviteToParty"]').click();
    cy.get('[size="3"]').should("be.visible");

    cy.get('[data-test-id="partySettings"]').click();
    cy.get('[data-test-id="partySettingLineChat"]').click();
    cy.xpath("//*[contains(text(),'team_AutoFaceit5')]").should("be.visible");
    cy.get('[data-test-id="partySettingLineUpdateTeamName"]').click();
    cy.get('[data-testid="partyNameInput"]').clear().type(random);
    cy.get('[data-test-id="partySettingLineUpdateTeamNameConfirm"]').click();

    cy.get('[data-test-id="partySettingLineUpdateTeamName"]').should(($div) => {
      expect($div.get(0).innerText).to.contain(random)
    })

    cy.get('[data-test-id="partyLeave"]').click();
    cy.xpath("//*[contains(text(),'team_AutoFaceit5')]").should("not.exist");

  })*/

  /**
   * @Class Premade Team Create
   * @Description Description of the test
   */

  it('Premade Team Create', function () {

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

  /**
   * @Class Premade Team Update Details
   * @Description Description of the test
   */

  it('Premade Team Update Details', function () {

    const random = Math.random().toString(36).substr(2, 6);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.teamCreate(random, random);
    cy.get('.subpage-nav__list__link > span').click();
    cy.get('[ng-click*="TYPES.NAME)"]').click();

    const nameAndTag = Math.random().toString(36).substr(2, 5);
    cy.get('[name="name"]').clear().type(nameAndTag);
    cy.get('[type="submit"]').click();

    cy.get('[ng-click*="TYPES.TAG"]').click();
    cy.get('[name="tag"]').clear().type(nameAndTag);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    const newDetails = nameAndTag + " (" + nameAndTag + ")";
    cy.get('[class*="content__title__p"]').text().should("equal", newDetails)
    cy.teamDelete();

  })

  /**
   * @Class Premade Team Invite
   * @Description Description of the test
   */

  it('Premade Team Invite', function () {
    const random = "a" + Math.random().toString(36).substr(2, 5);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();
    cy.teamCreate(random, random)

    cy.get('[class*="subpage-nav__list__item su"]').click();

    cy.get('[name="friendSearch"]').type(user2)
    cy.get('[class="friend-search__friend"]').click();
    cy.xpath(
        '(//div[@class="flex-1 users-list__details"])[2]').scrollIntoView().should(
        "be.visible");

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        user2 + "@faceit.com", Cypress.env("user_password_autotest"));
    cy.xpath("//*[contains(text(),'steps')]").should("be.visible");
    cy.xpath(
        "//*[@class='fi-navbar__main__item']//*[contains(text(),'Play')]").click(
        {force: true});
    cy.url().should('include', '/en/dashboard');

    cy.get('[ng-click="vm.openCloseSection(\'teams\')"]',
        {timeout: 15000}).click();
    cy.get('[class="flex-center-start p2l-lg full-width"]').click();
    cy.xpath('(//button[@class="btn btn-primary btn-just-icon"])[1]').click();
    cy.get('[class="animated ng-fadeInDown"]').should('be.visible');

  })

  /**
   * @Class Premade Team Upload Images
   * @Description Description of the test
   */

  it('Premade Team Upload Images', function () {

    const random = Math.random().toString(36).substr(2, 6);

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.teamCreate(random, random);
    cy.fixture('images/logo.png').as('logo')
    cy.get('[read-file*="AvatarImg"]').then(function (el) {
      // convert the logo base64 string to a blob
      const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/png')

      const file = new File([blob], 'images/logo.png', {type: 'image/png'})
      const list = new DataTransfer()

      list.items.add(file)
      el[0].files = list.files
      el[0].dispatchEvent(new Event('change', {bubbles: true}))
    })

    cy.get('[class*="cropit-export"]').click();
    cy.get('img[src*="https://cdn.faceit"]').should("exist");

    cy.fixture('images/cover.png').as('cover')
    cy.get('[read-file*="CoverImg"]').then(function (el) {
      // convert the logo base64 string to a blob
      const blob = Cypress.Blob.base64StringToBlob(this.cover, 'image/png')

      const file = new File([blob], 'images/cover.png', {type: 'image/png'})
      const list = new DataTransfer()

      list.items.add(file)
      el[0].files = list.files
      el[0].dispatchEvent(new Event('change', {bubbles: true}))
    })

    cy.get('.cropit-edit > .btn-primary').click();
    cy.get('section[style*="background-image"]').should("exist");
    cy.teamDelete();

  })

  /**
   * @Class Premade Team Promote To Captain
   * @Description The test will promote a user to Captain
   * inside the team premade settings after that the test will demote user2
   * back to normal
   */

  it('Premade Team Promote To Captain', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.log("Selecting TeamTest")
    cy.get('[ng-click*="teams"]').click();
    cy.xpath("//*[contains(text(),'TeamTest')]").click();
    cy.log("Opening team settings")
    cy.get('[class*="subpage-nav__list__item su"]').click();
    cy.log("Promoting a user to captain")
    cy.get('[class*="btn btn-default btn-sm btn"]').click();
    cy.get('[class*="text-light-gray icon"]').scrollIntoView().should(
        "be.visible");
    cy.log("User promoted to captain correctly")
    cy.log("Demoting user")
    cy.get('[ng-click*="vm.demoteMember"]').click();
    cy.get('[class*="text-light-gray icon"]').should("not.exist");
    cy.log("User demoted correctly")


  })

  /**
   * @Class Premade Team Promote To Admin
   * @Description   The test will promote user 2 new administrator
   * inside the team premade settings after that the test will demote user2
   * back to normal
   */

  it('Premade Team Promote To Admin', function () {

    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        Cypress.env("email"), Cypress.env("user_password_autotest"));
    cy.loginValidate();

    cy.log("Selecting TeamTest")
    cy.get('[ng-click*="teams"]').click();
    cy.xpath("//*[contains(text(),'TeamTest')]").click();
    cy.log("Opening team settings")
    cy.get('[class*="subpage-nav__list__item su"]').click();
    cy.get('[class*="btn btn-default btn-sm btn"]').click();
    cy.log("Promoting a user to admin")
    cy.get('[ng-click*="vm.promoteMember"]').click();
    cy.get('[class*="btn btn-primary"]').click();
    cy.wait(500);
    cy.log("User promoted to admin correctly");
    cy.log("Logging in with user | " + user2);
    cy.loginAuth(Cypress.env("url"), Cypress.env("frontend_client_id"),
        Cypress.env("frontend_client_secret"), Cypress.env("api_url"),
        Cypress.env("automation_test_secret"),
        user2 + "@faceit.com", Cypress.env("user_password_autotest"));
    cy.xpath("//*[contains(text(),'steps')]").should("be.visible");
    cy.log("User logged in correctly");
    cy.xpath(
        "//*[@class='fi-navbar__main__item']//*[contains(text(),'Play')]").click(
        {force: true});

    cy.log("Promoting user 1 back to admin");
    cy.xpath("//*[contains(text(),'TeamTest')]").click();
    cy.get('[class*="subpage-nav__list__item su"]').click();
    cy.get('[ng-click*="vm.promoteMember"]').click();
    cy.get('[class*="btn btn-primary"]').click();
    cy.wait(500);
    cy.get('[ng-click*="vm.demoteMember"]').click();
    cy.get('[ng-click*="vm.demoteMember"]').should('not.exist');
    cy.log("User 1 promoted to admin correctly");


  })



})

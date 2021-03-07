
/**
 * @author Alessandro Follo Borini
 * @description Login command
 * @see <a href="https://github.com/AleBorini/privateRepo"> Git repository</a>
 */


/**
 * @function eventCreate()
 * @description command to create a simple event using default parameters and default
 * random string name
 * @param {string} eventName - chosen event name
 */


Cypress.Commands.add("eventCreate", (eventName) => {

  cy.get('[class="dashboard-navigation_item "]').eq(0).click();
  cy.get('[data-testid="tab-panel"]').eq(1).click();
  cy.get('[class="button"]').click();
  cy.get('#name').type(eventName);

  cy.get('#timezone > option').eq(Math.floor(Math.random() * 149)).then(
      ($el) => {
        cy.get('#timezone').select($el.get(0).innerText);
        cy.log("Time zone selected as | " + $el.get(0).innerText)
      })

  for(let i = 0; i < 2; i++){
    cy.get('[class*="option_content "]').eq(Math.floor(Math.random() * 3)).click();
  }

  for(let i = 0; i < 3; i++){
    cy.get('[class="option_content"]').eq(Math.floor(Math.random() * 6)).click();
  }

  cy.get('.button').should('be.visible').click({force:true});
  cy.url().should('contain', eventName + '/dashboard');
  cy.get('[class*="EventTitle"]').text().should('equal', eventName);

})

/**
 * @function eventCreate()
 * @description command to delete the last created event after creation.
 * @param {string} eventName - chosen event name
 */

Cypress.Commands.add("eventDelete", (eventName) => {
  cy.get('[data-original-title="Back to dashboard"]').click();
  cy.get('[data-toggle-dropdown*="event-dropdown"]').eq(0).click();
  cy.get('[data-method="delete"]').eq(0).click();
  //cy.on('window:confirm', () => true);
  cy.contains(eventName).should('not.exist');

})

/**
 * @function sponsorCreate()
 * @description command to create a new sponsor for the event.
 * Data available in fixtures folder.
 * @param {string} sponsorName - chosen sponsor name
 * @param {string} sponsorWebsite - chosen sponsor website url
 * @param {string} sponsorLogo - chosen sponsor logo file path
 */

Cypress.Commands.add("sponsorCreate", (sponsorName, sponsorWebsite, sponsorLogo)=> {
  cy.get('[data-original-title*="sponsors"]').click();
  cy.get('[data-testid="empty-button"]').click();
  cy.get('#sponsor_name').type(sponsorName);
  cy.get('#sponsor_website').type(sponsorWebsite);
  cy.get('#sponsor_logo').attachFile(sponsorLogo);
  cy.get("[name='button']").click();
  cy.contains(sponsorName).should('be.visible');
  cy.contains(sponsorWebsite).should('be.visible');
  cy.get('[src*="sponsors/logos"]').should('be.visible');

})













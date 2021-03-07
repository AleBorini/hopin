
/**
 * @author Alessandro Follo Borini
 * @description Login command
 * @see <a href="https://github.com/AleBorini/privateRepo"> Git repository</a>
 */


/**
 * @function eventCreate()
 * @description login the user via auth end point
 * @param {string} url - env URL
 * @param {string} email - user email
 * @param {string} password - password
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

Cypress.Commands.add("eventDelete", (eventName) => {

  cy.get('[data-original-title="Back to dashboard"]').click();
  cy.get('[data-toggle-dropdown*="event-dropdown"]').eq(0).click();
  cy.get('[data-method="delete"]').eq(0).click();
  //cy.on('window:confirm', () => true);
  cy.contains(eventName).should('not.exist');


})














/**
 * @author Alessandro Follo Borini
 * @description Login command
 * @see <a href="https://github.com/AleBorini/privateRepo"> Git repository</a>
 */


/**
 * @function login()
 * @description User login command via FE
 * @param {string} url - env URL
 * @param {string} email - user email
 * @param {string} password - password
 */


Cypress.Commands.add("login", (url, email, password) => {

  cy.visit(url);
  cy.get('[class*="nav_link hidden"]').click();
  cy.get('#user_email').type(email);
  cy.get('#user_password').type(password);
  cy.get('[data-smoke-test-id="signin_button"]').click();
  cy.get('.flash > p').should('be.visible')
  .text().should('equal', "Signed in successfully")


})

/**
 * @function logout()
 * @description User logout command via FE
 * @param {string} url - env URL
 * @param {string} email - user email
 * @param {string} password - password
 */

Cypress.Commands.add("logout", () => {
  cy.get('.avatar').click();
  cy.get('[href="/sign_out"]').click();
  cy.get('[class*="nav_link hidden"]').should('be.visible');
})








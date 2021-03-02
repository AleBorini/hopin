
import {Buffer as buffer} from "buffer";


/**
 * @author Alessandro Follo Borini
 * @description Login command
 * @see <a href="https://faceit.atlassian.net/wiki/spaces/QA/pages/1493368852/Faceit+Automation"> Confluence Documentation</a>
 */

/**
 * @function login()
 * @description login the user via auth end point
 * @param {string} url - Faceit env URL
 * @param {string} email -  user email
 * @param {string} user_password_autotest -  user password
 */


Cypress.Commands.add("login", (url, email, password) => {

  cy.visit(url);
  cy.get("[data-testid='signin-header']").click();
  cy.get('[class="modal-dialog "]').should("be.visible");
  cy.get('[name="email"]').type(email,
      {force: true}).should("have.value", email);
  cy.get("[name='password']").type(password, {force: true})
  .should("have.value", password);
  cy.get("[type='submit']").click();
})




/**
 * @function loginAuth()
 * @description login the user via auth end point
 * @param {string} url - Faceit env URL
 * @param {string} frontend_client_id - Frontend client id
 * @param {string} automation_client_secret - Frontend client secret
 * @param {string} api_url - API url
 * @param {string} automation_test_secret - Fronted secret for automation testing
 * @param {string} email -  user email
 * @param {string} user_password_autotest -  user password
 */

Cypress.Commands.add("loginAuth", (url, clientId, clientSecret, apiUrl, testSecret, userName, password) => {
  cy.log("Logging in with user | " + userName);
  cy.visit(url);
  cy.url().should('include', 'faceit');
  const basic = "Basic " + buffer.from(clientId + ":" + clientSecret).toString('base64');
  cy.request({
    method: 'POST',
    url: apiUrl + '/auth/v1/oauth/token',
    headers: {
      'Authorization': basic,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      'grant_type': 'password',
      'automation_test_secret': testSecret,
      'username': userName,
      'password': password,
    }
  }).then(response => {
    const token = response.body["access_token"];
    const token_type = response.body["token_type"];
    cy.log(token_type + " " + token);
    cy.setCookie("t", token);
    cy.reload();
    //cy.get('[data-testid="PlayButton"]').should("be.visible");
  })

})

Cypress.Commands.add("loginValidate", () => {
  cy.log("Validating user login");
  cy.xpath("//*[contains(text(),'steps')]").should("be.visible");
  cy.xpath("//*[contains(text(),'under')]").click();
  cy.xpath("//*[@class='fi-navbar__main__item']//*[contains(text(),'Play')]").click({force: true});
  cy.url().should('include', '/en/dashboard');
  cy.log("User logged in correctly");

})

Cypress.Commands.add("logout", () => {

cy.get("[class='dropdown-wrapper']").click();
cy.get("[class*='dropdown-menu__link dr']").click();
cy.get("[data-testid='signin-header']").should("be.visible");

})

Cypress.Commands.add("loginValidate2", () => {
  cy.xpath("//*[contains(text(),'steps')]").should("be.visible");
  cy.xpath(
      "//*[@class='fi-navbar__main__item']//*[contains(text(),'Play')]").click(
      {force: true});
})







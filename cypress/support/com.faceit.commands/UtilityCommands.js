

Cypress.Commands.add("elementExistClick", (selector) => {
  cy.get("body").then(($body) => {
    if ($body.find(selector).length) {
      cy.get(selector).eq(-1).click();
    }
  })
})


Cypress.Commands.add('getIframeBody', (selector) => {
  return cy
  .get(selector, { log: false })
  .its('0.contentDocument.body', { log: false }).should('not.be.empty')
  .then((body) => cy.wrap(body, { log: false }))
})
















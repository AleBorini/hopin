

Cypress.Commands.add("teamCreate", (teamName, teamTag) => {

  cy.get('[ui-sref="app.createTeamModal"]').click();
  cy.get('[name="name"]').type(teamName);
  cy.get('[name="tag"]').type(teamTag);

  cy.get('[ng-model="selected.game"] > option')
  .eq(1).text().then(($el)=>{
    cy.get('[ng-model="selected.game"]').select($el)
  })
  cy.get('[type="submit"]').click();

})

Cypress.Commands.add("teamDelete", () => {

  cy.get('[ng-click="vm.openCloseSection(\'teams\')"]', {timeout: 15000}).click();
  cy.get('.subpage-nav__list__link > span').click();
  cy.get('.text-right > .btn').click();
  cy.get('[ng-click="close()"]').click();
  cy.url().should('not.include', 'teams');

})



















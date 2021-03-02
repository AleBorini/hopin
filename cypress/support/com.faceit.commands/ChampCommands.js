//import ChampPage from "../com.faceit.pageObject/ChampPage";
//const obj = new ChampPage();

Cypress.Commands.add("champCreate", (name, gameMode) => {

  cy.xpath("(//div[@ui-sref='app.createJoinCompetition'])[2]").click();
  cy.xpath("//a[contains(text(),'Create tournament')]").click();
  cy.get("[ng-model='vm.selected.organizer']").select("AutoFaceitOrganizer");
  cy.get("[name='gameMode']").select(gameMode);
  cy.get("[placeholder='Tournament name']").type(name)
  .should('have.value', name);
  cy.get("[class='btn btn-default btn-fixed-height btn-block']").click();
  cy.get("[class='fi-react-navbar-sticky']", {timeout:15000}).should("be.visible");
  cy.xpath("//*[contains(text(),'Overview')]").click();

})




Cypress.Commands.add("champDelete", () => {

  cy.xpath("//div[contains(text(),'Settings')]").click();
  cy.get("[class='btn--text text-danger text-initial']").click();
  cy.get("[class='btn btn-primary btn-min-width']").click();
  cy.url().should('not.include', 'championship');

})















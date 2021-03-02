

Cypress.Commands.add("clanCreate", (ClanName) => {

  cy.get('[class="navigation-v2__icon clickable link m2r-sm "]').eq(0).click();
  cy.get("select[ng-model='vm.selected.organizer']").select("AutoFaceitOrganizer");
  cy.get("[name='name']").type(ClanName);
  cy.get('[type="submit"]').click();
  cy.contains(ClanName).should('be.visible');

})

Cypress.Commands.add("clanDelete", (ClanName) => {
  cy.get("div[id='main-content'] a:nth-child(5)").click();
  cy.get("form[action='#'] div div button[type='button']").scrollIntoView().click();
  cy.get("div[role='dialog'] button:nth-child(2)").click();
  cy.url().should('not.include', 'clan');

})

Cypress.Commands.add("clanLobbyCreate", () => {
  cy.xpath("//div[normalize-space()='Create the first lobby']").should('be.visible');
  cy.get('[data-testid="Holder"]').eq(1).should('be.visible');
  cy.get('[data-testid="Holder"]').eq(0).click();
  cy.get('[class*="FooterButton"]').eq(1).click();
  cy.contains("lobby_").should('be.visible');
  cy.xpath("//button[contains(text(),'Play')]").should('be.visible');
})



















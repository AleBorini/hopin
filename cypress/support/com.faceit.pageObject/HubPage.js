class HubPage {

//HUB CREATE TEST

  getAddHub() {
    return cy.get("div[ng-if='vm.GAME_SPECIFIC_LINKS.HUBS']");
  }

  getCreateHub() {
    return cy.get("a[translate-once='CREATE-HUB']");
  }

  getName() {
    return cy.get("[name='name']");
  }

  getSubmit() {
    return cy.get("button[class='btn btn-default btn-fixed-height btn-block']")
  }

  getOrganizer() {
    return cy.get("select[ng-model='vm.selected.organizer']")
  }

  getHubName() {
    return cy.get("[class='fi-page-cover__info__title__text']")
  }

  getHubList() {
    return cy.xpath(
        "//div[@class='flex-grow text-uppercase m2l-sm flex-center-start'][contains(text(),'Hubs')]")
  }

  getHubPusher() {
    return cy.xpath("(//span[@ng-bind='::vm.hub.name'])[1]")
  }

  getSettings() {
    return cy.xpath("//div[9]//fi-navbar-item[1]//a[1]")
  }

  getDelete() {
    return cy.get("[class='btn--text text-danger text-initial']")
  }

  getConfirm() {
    return cy.get("button[class='btn btn-primary btn-min-width']")
  }

  getHome() {
    return cy.xpath("//span[contains(text(),'AutoFaceit1, complete')]")
  }

  //HUB QUEUE CREATE

  getCreateQueue() {
    return cy.get("a[class='btn btn-primary']")
  }

  getAlgo() {
    return cy.get("[name='algorithm']")
  }

  getGameMode() {
    return cy.get("[name='gameMode']")
  }

  getSubmitQueue() {
    return cy.get("button[type='submit']")
  }

  getPlay() {
    return cy.get("[data-testid='PlayButton']")
  }

  getTab() {
    return cy.xpath(
        "//a[@class='fi-navbar__main__item']//span[contains(text(),'Leaderboard')]")
  }

  getKebab() {
    return cy.get("button[class='fi-navbar__drawer__button']")
  }

  getHubSettings() {
    return cy.xpath(
        "//a[@class='fi-navbar__drawer__item']//span[contains(text(),'Settings')]")
  }

  getQueueSettings() {
    return cy.xpath("//li[3]//a[1]")
  }

  getQueueDelete() {
    return cy.get("button[class='btn--text text-danger text-initial']")
  }


// HUB JOIN QUEUE TEST

  getHublist() {
    return cy.get(
        '[ng-if="vm.competitionAllowed.hub"] > .navigation-v2__subtitle');
  }

  getFirstHub() {
    return cy.xpath("//span[contains(text(),'TestHub')]");
  }

  getJoinQueue() {
    return cy.get('[data-testid=PlayButton]');
  }

  getModal() {
    return cy.get(".modal-content");
  }

  getClose() {
    return cy.get('[class="close"]', {timeout: 10000}).should('be.visible');
  }

  getAcceptMatch() {
    return cy.get("[class=\'btn btn-primary btn-fixed-width center-block\']",
        {timeout: 30000}).should('be.visible');
  }

  getActions() {
    return cy.get("[class='btn btn-default min-width-200 btn-fixed-height']",
        {timeout: 20000}).should('be.visible');
  }

  getResult() {
    return cy.xpath(
        "//div[@class='modal modal-dialog-v2 fade in']//button[5]").should(
        'be.visible');
  }

  getFaction1() {
    return cy.get("[name='faction1']");
  }

  getFaction2() {
    return cy.get("[name='faction2']");
  }

  getSubmitResult() {
    return cy.get("[class='text-center mb-xl']").find(
        "[class='btn btn-primary btn-fixed-width btn-fixed-height']");
  }

  getStatus() {
    return cy.xpath("//*[text() = 'FINISHED']");
  }


  //HUB JOIN



}

export default HubPage


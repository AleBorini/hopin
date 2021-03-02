class HubPage {


    getHublist() {
        return cy.get('[ng-if="vm.competitionAllowed.hub"] > .navigation-v2__subtitle');
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
        return cy.get("[class=\'btn btn-primary btn-fixed-width center-block\']", {timeout: 30000}).should('be.visible');
    }

    getActions() {
        return cy.get("[class='btn btn-default min-width-200 btn-fixed-height']", {timeout: 20000}).should('be.visible');
    }

    getResult() {
        return cy.xpath("//div[@class='modal modal-dialog-v2 fade in']//button[5]").should('be.visible');
    }

    getFaction1() {
        return cy.get("[name='faction1']");
    }

    getFaction2() {
        return cy.get("[name='faction2']");
    }

    getSubmitResult() {
        return cy.get("[class='text-center mb-xl']").find("[class='btn btn-primary btn-fixed-width btn-fixed-height']");
    }

    getStatus() {
        return cy.xpath("//*[text() = 'FINISHED']");
    }



}

export default HubPage


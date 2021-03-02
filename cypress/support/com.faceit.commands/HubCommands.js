import HubPage from "../com.faceit.pageObject/HubPage";
import {Buffer as buffer} from "buffer";

const obj = new HubPage();

Cypress.Commands.add("hubCreate", (name) => {
  cy.log("Creating a new hub");
  obj.getAddHub({timeout: 15000}).click();
  obj.getCreateHub().click();
  obj.getOrganizer().select("AutoFaceitOrganizer");
  obj.getName().type(name)
  obj.getSubmit().click();
  cy.wait(500);
  cy.log("Hub created");
})

Cypress.Commands.add("hubValidate", (name) => {
  cy.log("Validating hub creation");
  obj.getHubName().should("be.visible")
  obj.getHubList().click();
  obj.getHubPusher().text().should("be.equal", name);
  cy.log("Hub created correctly");
})

Cypress.Commands.add("hubDelete", () => {
  obj.getSettings().click();
  obj.getDelete().click();
  obj.getConfirm().click();
  cy.url().should('not.include', 'hub')
})

Cypress.Commands.add("hubQueueCreate", (algo, gameMode) => {
  obj.getCreateQueue().click();
  obj.getAlgo().select(algo);
  obj.getGameMode().select(gameMode);
  obj.getSubmitQueue().click();
  cy.wait(500);
  obj.getPlay().should("be.visible");
})

Cypress.Commands.add("hubQueueDelete", () => {
  obj.getTab().click();
  obj.getKebab().click();
  obj.getSettings().click({force: true});
  obj.getQueueSettings().click();
  obj.getDelete().click();
  obj.getCreateQueue().should("be.visible");
})


Cypress.Commands.add("joinQueue", (url, clientId, clientSecret, apiUrl, testSecret, userName, password, queueId, guid) => {
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
    cy.request({
      method: 'POST',
      url: apiUrl + '/queue/v1/player/' + queueId,
      headers: {
        'Authorization': token_type + " " + token,
      },
      body: {
        'leaderId': guid,
        'playerType': 'solo',
        'playerId': guid,
        'userIds': [guid],
        'id': queueId
      }
    })

  })

})













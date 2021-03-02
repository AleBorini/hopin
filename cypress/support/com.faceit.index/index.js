require('cypress-xpath');
require('cypress-commands');


/// <reference path="../support/index.d.ts" />

import "cypress-iframe"
import "../com.faceit.commands/LoginCommands"
import "../com.faceit.commands/HubCommands"
import "../com.faceit.commands/ChampCommands"
import "../com.faceit.commands/TeamCommands"
import "../com.faceit.commands/UtilityCommands"
import "../com.faceit.commands/ClanCommands"

Cypress.on('uncaught:exception', () => {
    return false
})


before(function () {
    cy.fixture('properties.json').as('data')
    Cypress.Server.defaults({
        ignore: (xhr) => {
            return true;
        }
    })
})


beforeEach(function () {
    cy.fixture('properties.json').then(function (data) {
        this.data = data;
    })
})


// Import LoginCommands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')
// This example support/index.js is processed and
// loaded automatically before your test files.
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
// You can read more here:
// https://on.cypress.io/configuration
//


require('cypress-xpath');
require('cypress-commands');
require('cypress-dark')


/// <reference path="../support/index.d.ts" />

import "cypress-iframe";
import "../com.hopin.commands/loginCommands";
import "../com.hopin.commands/eventCommands";
import 'cypress-file-upload';



Cypress.on('uncaught:exception', () => {
    return false
})


before(function () {

})


beforeEach(function () {
    cy.fixture('properties.json').then(function (data) {
        this.data = data;
    })
})


// Import loginCommands.js using ES2015 syntax:
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


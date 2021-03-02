declare namespace Cypress {
    interface Chainable {
        //Login Custom Commands
        login(ulr:String, email:String, password:String): Chainable<Element>;
        logout(): Chainable<Element>;


    }
}
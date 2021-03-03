declare namespace Cypress {
    interface Chainable {
        //Login Custom Commands
        login(ulr:String, email:String, password:String): Chainable<Element>;
        logout(): Chainable<Element>;


        //Utility commands
        uploadImage(selector:String, image:String, filename:String): Chainable<Element>;

    }
}
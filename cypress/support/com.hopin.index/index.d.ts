declare namespace Cypress {
    interface Chainable {
        //Login Custom Commands
        login(ulr:String, email:String, password:String): Chainable<Element>;
        logout(): Chainable<Element>;


        //Event commands
        eventCreate(eventName:String): Chainable<Element>;
        eventDelete(eventName:String): Chainable<Element>;
        sponsorCreate(sponsorName:String,sponsorWebsite:String, sponsorLogo:String): Chainable<Element>;

    }
}
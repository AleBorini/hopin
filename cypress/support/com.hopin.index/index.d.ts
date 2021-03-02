declare namespace Cypress {
    interface Chainable {
        //Login Custom Commands
        login( url:String, username: String, password: String)
        loginForced(ulr:String, cookie:String): Chainable<Element>;
        loginValidate(): Chainable<Element>;
        loginValidate2(): Chainable<Element>;
        loginAuth(url:String, clientId:String, clientSecret:String,
                  apiUrl:String, testSecret:String, email:String, password:String): Chainable<Element>;
        logout(): Chainable<Element>;

        //Hub Custom Commands
        hubCreate(name:String): Chainable<Element>;
        hubValidate(name:String): Chainable<Element>;
        hubDelete(): Chainable<Element>;
        hubQueueCreate(gameMode:String, algo:String): Chainable<Element>;
        hubQueueDelete(): Chainable<Element>;

        //Queue Join
        joinQueue(url:String, clientId:String, clientSecret:String,
                  apiUrl:String, testSecret:String, email:String, password:String, queueId:String, guid:String): Chainable<Element>;

        //Champ Custom Commands
        champCreate(name:string, gameMode:String): Chainable<Element>;
        champDelete(): Chainable<Element>;
        teamCreate(teamName:String, teamTag:String): Chainable<Element>
        teamDelete(): Chainable<Element>

        //Utility commands
        elementExistClick(selector:String): Chainable<Element>;
        getIframeBody(selector:String): Chainable<Element>;

        //Clan commands
        clanCreate(clanName:String): Chainable<Element>
        clanDelete(clanName:String): Chainable<Element>
        clanLobbyCreate(): Chainable<Element>

    }
}
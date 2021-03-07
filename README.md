## How to run
You can run the entire suite by using directly `npm run follo`. The command will automatically select the `hopin.js` spec file containing all the tests.
All the data are automatically loaded from the `cypress.json` file and `cypress.env.json`.

## Data
All the data needed to run the test are alredy stored as enviroment variables in the `cypress.json` file. The 2 only missing parts are the `email` and `password` needed for the test user to login on hopin.com that have been removed for security reasons. 

Create a local file `cypress.env.json` at the same root content level of `cypress.json` and add password and email with the following json format:

`{
  "email": "example@gmail.com",
  "password": "123abc"
}`

The data will be automatically loaded. 

## Commands
All the tests contains different commands all available in the folder `cypress/support/com.hopin.commands`. The commands have been also added to a typescript index file to enable autocompletion in the editor. The file can be found at `cypress/support/com.hopin.index/index.d.ts`


## Reporter
Running the test via `npm run follo` will enable also the html report. Before the run starts the report folder will be automatically deleted and a new one will be generate at the end of the run containing the reports both in json and html report. The html and json report can be found at `cypress/reports/mocha/assets/...`. 

The report folder has been added to the gitignore file and is not visible from the repository. 

## Documentation
Via command line `npm run doc` a `index.html` document containing a complete list of tests, suites and command available in the project will be atuomatically generated. The document can be found at this path from content root `doc/index.html` and can be open in any browser. 


## Cypress Dahsboard
If the cypress dashoard is needed the `package.json` and `cypress,json` files need to be modified.

`cypress.json` add the `"projectId": "abcde123"` relative to your cypress project at the end of the document.

`package.json` add `--record --key YourRecordKey` to the command `npm run follo` or create a new custom commands. 

Without this two elements the test will not be available on your Cypress dashboard. 


# privateRepo

Automation Hopin.com

## How to run
You can run the entire suite just once by using directly `npm run follo`. The command will automatically select the `hopin.js` containing all the tests.
All the data are automatically loaded from the cypress.json file.

### data
All the data needed to run the test are alredy stored as enviroment variables in the `cypress.json` file. The 2 only missing parts are the email and password removed from the file for security reasons. 

Create a local file `cypress.env.son` at root content level (same as `cypress.json`) and add password and email with the following format:

{
  "email": "example@gmail.com",
  "password": "123bc"
}

###commands
All the tests contains different commands all available in the folder `cypress/support/com.hopin.commands`. The commands have been also added to a `index.d.ts` file to enable autocompletion in the editor. The file can be found at `cypress/support/com.hopin.index/...`


### reporter
Running the test via `npm run follo` will enable also the html report. Before the run starts the report folder will be automatically deleted and a new one will be generate at the end of the run containing the reports both in json and html report. The html and json report can be found at `cypress/reports/mocha/assets/...`. 

The report folder has been added to the gitignore file and is not visible from the repository. 

### documentation
Via comand line `npm run doc` will generate a `index.html` document containing a complete list of tests, suites and command available in the project. The document can be founf at this path from content root `doc/index.html` and can be open in any browser. 


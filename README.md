# automation-test-cypress
Automation test Cypress

## CI/CD
The `Jenkinsfile` of the project will build and push to GCR a docker image called `automation-test-cypress`.

The semantic versioning is used in order to generate a new version number when merging to master.
Whenever a new version is released, the new docker image is also tagged as `stable`.

The CI/CD Jenkinsfile, when running on a PR, if it finds a label called `test: XXX` will launch the Jenkins job which runs the `custom` suite against the `XXX` environment.

If you want to trigger a rebuild of the project - maybe because you have added the label after opening the pr - you can simply add a comment with the word `rebuild`.

## How to run
You can run the entire suite just once by using directly `npm`, or you can build/run a docker image containing the suite.
There is a Jenkinsfile (`JenkinsfileAgents`) that can be used to run the suites on Jenkins with parallel agents.

### npm
There is one command for each suite:

`npm run all` will run all the suite
`npm run check` will run a suite with just one test, in order to test if the tests are working

### Docker
You can build a docker image of the project by running

`docker build .` 

The image then can be run by launching

`
docker run --entrypoint=cypress --env-file ./env.list IMAGE_ID run \
	--record \
	--parallel \
    --headless \
    --browser chrome \
    --group run_${BUILD_ID} \
    --ci-build-id ${BUILD_ID} 
`

`env.list` should contain all the environment variables that we want to pass to Cypress (e.g. the key for the Dashboard).
The `BUILD_ID` variables might be needed in order to group the tests and having the parallel magic working.

The tests will run as the Jenkins user under the `/home/jenkins` folder, because the docker image runs with the Jenkins user under Jenkins and I did not find any other way to make `npm` work under Jenkins with another user (usually, `node`). 

### JenkinsfileAgent
This Jenkinsfile will run the specified version of the docker image multiple times to have the tests running on parallel.

There are some steps to merge the reports generated during each parallel execution and to upload the final result to GCS.

When running the docker image, Jenkins sets the working directory to be `/tmp/$JOB_NAME`: for this reason, when we want run the tests or handle the generated reports, we have first to `cd` into the right directory of the docker image.
For the same reason, if we want to `stash` or `unstash` the files, we have to do the same thing: we have to copy the files into the Jenkins working directory so that they are copied into the actual workspace, only after that `stash` and `unstash` work as expected.
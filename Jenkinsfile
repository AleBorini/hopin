#!/usr/bin/env groovy
// These are general variable used in the script

pipeline {
    agent {
        label 'frontend'
    }

    options {
        // Because of how semantic release plugin works, we don't want the automatic checkout but we want to be able to push changes to the master
        skipDefaultCheckout()

        // Discard old builds to not clog up jenkins
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))

        // We don't want two builds to run at the same time. This allows builds for different branches to run at the same time.
        disableConcurrentBuilds()
    }

    environment {
        PROJECT_NAME = "automation-test-cypress"

        GITHUB_TOKEN = credentials('faceitdev-github-personal-token')
    }
    
    triggers {
        issueCommentTrigger('^(rebuild)$')
    }
    
    stages {
        // Clearing the workspace
        stage ('Clean') {
            steps {
                deleteDir()
            }
        }

        // Doing the manual checkout
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Calculating version') {
            environment {
                SEMANTIC_VERSION_PATH = tool name: 'semantic-version', type: 'com.cloudbees.jenkins.plugins.customtools.CustomTool'
            }

            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        sh """
                        git checkout master
                        ${SEMANTIC_VERSION_PATH}/semantic-version \
                            -slug ${env.ORG}/${PROJECT_NAME} \
                            -vf \
                            -changelog CHANGELOG.md
                        """
                        script {
                            releaseVersion = sh(returnStdout: true, script: 'cat .version')
                        }
                    } else {
                        releaseVersion = sh(returnStdout: true, script: 'git rev-parse HEAD').trim().take(14)
                    }
                }
                sh """
                echo "Version will be ${releaseVersion}"
                """
            }
        }

        stage('Build') {
            steps {
                sh """
                    gcloud auth configure-docker --quiet
                    echo "Building ${env.DOCKER_PREFIX}/${env.PROJECT_NAME} - version ${releaseVersion}"
                    docker build -t ${env.DOCKER_PREFIX}/${env.PROJECT_NAME}:${releaseVersion} .
                """
            }
        }

        stage('Push') {
            steps {
              sh """
                docker push ${env.DOCKER_PREFIX}/${env.PROJECT_NAME}:${releaseVersion}
              """
            }
        }

        stage('github comment') {
            when { changeRequest() }
            steps {
                script {
                    for (found_comment in pullRequest.comments) {
                        echo "Author: ${found_comment.user}, Comment: ${found_comment.body}"
                        if (found_comment.user == "faceitdev" && found_comment.body.startsWith("Version:")) {
                            pullRequest.deleteComment(found_comment.id)
                        }
                    }
                    pullRequest.comment("Version: `${releaseVersion}`")
                }
            }
        }

        stage('Custom Suite') {
            when {
                changeRequest()
            }

            steps {
                script {
                    pullRequest.labels.each{
                        echo "label: $it"
                        def environment = "$it".split(":")[1].trim()

                        build   job: "automatic_tests_cypress", 
                                parameters: [   string(name: 'SUITE', value: "custom"),
                                                string(name: 'ENV', value: "${environment}"),
                                                string(name: 'TEST_VERSION', value: "${releaseVersion}")
                                                ], 
                                propagate: false,
                                wait: false
                    }
                }
                
            }
        }

        // If it's the master branch, then we want to create a release
        stage('Semantic Release') {
            when {
                beforeAgent true
                branch 'master'
            }

            environment {
                SEMANTIC_RELEASE_PATH = tool name: 'semantic-release', type: 'com.cloudbees.jenkins.plugins.customtools.CustomTool'
            }

            steps {
                sshagent (credentials: ['git-ssh-key']) {
                    sh """
                        ${SEMANTIC_RELEASE_PATH}/semantic-release -slug ${env.ORG}/${PROJECT_NAME}
                        docker tag ${env.DOCKER_PREFIX}/${env.PROJECT_NAME}:${releaseVersion} ${env.DOCKER_PREFIX}/${env.PROJECT_NAME}:stable
                        docker push ${env.DOCKER_PREFIX}/${env.PROJECT_NAME}:stable
                    """
                }
            }
        }
    }

    post {
        cleanup {
            deleteDir()
            node('master') {
                script {
                    def workspace = pwd()
                    dir("${workspace}@script") {
                        deleteDir()
                    }
                    dir("${workspace}@script@tmp") {
                        deleteDir()
                    }
                }
            }
        }
    }
}
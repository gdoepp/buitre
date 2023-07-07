pipeline {
    agent { 
        docker {
            image 'ngbuild' 
            args '-v /mnt/storage/jenkins/dot-npm:/root/.npm --privileged --user 0'
            }
    }
    stages {
        stage('SCM') {
            steps {
                git (url: 'https://www.gdoeppert.de/mygitea/work/cryptool-fe.git', credentialsId: 'mygitea')
                sh 'rm -rf ./public && true'
            }
        }
        stage('update') {
            steps {
                sh 'npm install'
            }
        }
        stage('build') {
            steps {
                sh 'ng build --base-href /kryptutil/'
                sh 'tar zcf kryptutil.tgz ./public'
            }
        }
        stage('Sonar') {
            environment {
                PROJECT_NAME = "kryptutil_frontend"
              }
            steps {
                withSonarQubeEnv('mysonar') {
                  sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=$PROJECT_NAME'
                }
            }
        }
    }
}
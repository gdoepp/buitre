pipeline {
    agent { 
        docker {
            image 'ngbuild' 
            label 'agent'
            args '-v /mnt/storage/jenkins/dot-npm:/root/.npm -v/mnt/storage/jenkins-agent/dot-cache:/root/.cache -v/mnt/storage/jenkins-agent/dot-cache-ja:/home/jenkins-agent/.cache -v /home/jenkins-agent/.ssh:/root/.ssh --privileged --user 0'
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
                sh '''
                npm install
                npx playwright install
                '''
            }
        }
        stage('generate') {
            steps {
                sh 'openapi-generator-cli generate -i ./openapi.yaml  -g typescript-angular -o src/kryptutil-api-out'
            }
        }
        stage('test') {
            steps {
              wrap([$class: 'Xvfb']) {
                sh '''
                NO_COLOR=1 npm run test
                RC1=$?
                npx playwright test --quiet --reporter null
                RC2=$?
                exit $(( RC1+RC2 ))
                '''
              }
            }
        }
        stage('build') {
            steps {
                sh 'ng build --base-href /kryptutil/'
                sh 'tar zcf kryptutil.tgz ./public'
            }
        }
        stage('Publish') {
            steps {
            sh '''
            ssh -p 566 jenkins@gdlinux-cl-vpn 'mkdir results/kryptutil-fe || true'
            scp -P 566 kryptutil.tgz jenkins@gdlinux-cl-vpn:results/kryptutil-fe/kryptutil.tgz
            '''
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

pipeline {
    agent any

    environment {
        NODEJS_HOME = '/Users/mac/.nvm/versions/node/v22.11.0/bin'
        PATH = "${NODEJS_HOME}:${env.PATH}"

        DOCKER_HUB_CREDENTIALS = 'docker-hub-creds' // Jenkins me jo ID credentials ke liye hai
        DOCKER_IMAGE_NAME = 'jashank06/freelancing_project'
        DOCKER_TAG = "latest"

        REACT_APP_API_URL = "http://localhost:5003/api/auth"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Jashank06/Freelancing_Project.git'
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    // REACT_APP_API_URL inject karna
                    sh "REACT_APP_API_URL=${REACT_APP_API_URL} npm run build"
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    withCredentials([
                        string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET'),
                        string(credentialsId: 'mongo-uri', variable: 'MONGO_URI'),
                        usernamePassword(credentialsId: 'gmail-creds', usernameVariable: 'EMAIL_USER', passwordVariable: 'EMAIL_PASS')
                    ]) {
                        sh 'npm install'
                        // .env generate karna
                        sh '''
                            echo "PORT=5003" > .env
                            echo "MONGO_URI=$MONGO_URI" >> .env
                            echo "JWT_SECRET=$JWT_SECRET" >> .env
                            echo "EMAIL_USER=$EMAIL_USER" >> .env
                            echo "EMAIL_PASS=$EMAIL_PASS" >> .env
                        '''
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir('frontend') {
                    archiveArtifacts artifacts: 'build/**', allowEmptyArchive: false, fingerprint: true
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                dir('.') {
                    sh 'docker-compose down || true'
                    sh 'docker-compose build'
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Docker Build & Push to Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} ./backend
                        docker build -t ${DOCKER_IMAGE_NAME}-frontend:${DOCKER_TAG} ./frontend
                        docker push ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE_NAME}-frontend:${DOCKER_TAG}
                        docker logout
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build, Docker Deployment & Push Successful!'
        }
        failure {
            echo '❌ Build or Docker Deployment Failed!'
        }
    }
}

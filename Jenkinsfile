pipeline {
    agent any

    environment {
        NODEJS_HOME = '/Users/mac/.nvm/versions/node/v22.11.0/bin'
        DOCKER_BIN = '/usr/local/bin'
        PATH = "${NODEJS_HOME}:${DOCKER_BIN}:${env.PATH}"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-creds'   // Jenkins me jo credentials ID di hai
        DOCKER_IMAGE_NAME = 'your-dockerhub-username/freelancing_project'
        DOCKER_TAG = "latest"
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
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    // Agar backend me build script ho, uncomment karna:
                    // sh 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'frontend/build/**', allowEmptyArchive: true, fingerprint: true
            }
        }

        stage('Docker Compose Up') {
            steps {
                dir('.') {
                    sh 'docker-compose down || true'   // agar pehle se run ho rha hai to error na aaye
                    sh 'docker-compose build'
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        # Frontend image build & push
                        docker build -t ${DOCKER_IMAGE_NAME}-frontend:${DOCKER_TAG} ./frontend
                        docker push ${DOCKER_IMAGE_NAME}-frontend:${DOCKER_TAG}

                        # Backend image build & push
                        docker build -t ${DOCKER_IMAGE_NAME}-backend:${DOCKER_TAG} ./backend
                        docker push ${DOCKER_IMAGE_NAME}-backend:${DOCKER_TAG}

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

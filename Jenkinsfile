pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Getting source code from GitHub'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test --if-present'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"C:\\Users\\2006j\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t student-task-manager:1.0 .'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'minikube image load student-task-manager:1.0'
                bat 'kubectl apply -f deployment.yaml'
                bat 'kubectl apply -f service.yaml'
                bat 'kubectl rollout status deployment/student-task-manager --timeout=120s'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the Console Output.'
        }
    }
}
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
    environment {
        MINIKUBE_HOME = 'C:\\Users\\2006j\\.minikube'
        KUBECONFIG = 'C:\\Users\\2006j\\.kube\\config'
    }
    steps {
        bat '"C:\\Program Files\\Kubernetes\\Minikube\\minikube.exe" profile list'
        bat '"C:\\Users\\2006j\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\kubectl.exe" get nodes'
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
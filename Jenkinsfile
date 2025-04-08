pipeline {
  agent any

  stages {
    stage('Checkout Code') {
      steps {
        git url: 'https://github.com/nehap05/grocery-app.git', branch: 'main'
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('react-client') {
          sh 'npm install'
        }
      }
    }

    stage('Build React App') {
      steps {
        dir('react-client') {
          sh 'npm run build'
        }
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('express-server') {
          sh 'npm install'
        }
      }
    }

    stage('Deploy (Mock)') {
      steps {
        echo '🚀 Deploying to QA server (mock)...'
      }
    }
  }
}

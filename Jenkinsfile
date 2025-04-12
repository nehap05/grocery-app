pipeline {
  agent any

  tools {
    nodejs "node18"
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Install Compatible npm') {
      steps {
        bat 'npm install -g npm@9.8.1'
      }
    }

    stage('Checkout Code') {
      steps {
        git url: 'https://github.com/nehap05/grocery-app.git', branch: 'main'
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('react-client') {
          bat 'npm install'
        }
      }
    }

    stage('Build React App') {
      steps {
        dir('react-client') {
          bat 'npm run build'
        }
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('express-server') {
          bat 'npm install'
        }
      }
    }

    stage('Static Code Analysis (Mock SonarQube)') {
      steps {
        echo '🔍 Running static analysis... (mock)'
      }
    }

    stage('Run Tests (Mock with Coverage)') {
      steps {
        echo '✅ Running unit tests... (mock)'
      }
    }

    stage('Deliver Artifact') {
      steps {
        echo '📦 Delivering artifact... (mock)'
      }
    }

    stage('Deploy to Dev') {
      steps {
        echo '🚀 Deploying to Dev environment... (mock)'
      }
    }

    stage('Deploy to QA') {
      steps {
        echo '🚀 Deploying to QA environment... (mock)'
      }
    }

    stage('Deploy to Staging') {
      steps {
        echo '🚀 Deploying to Staging environment... (mock)'
      }
    }

    stage('Deploy to Production') {
      steps {
        echo '🚀 Deploying to Production environment... (mock)'
      }
    }
  }
}

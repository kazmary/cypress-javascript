pipeline {
  agent {
    docker {
      image 'cypress/included:15.1.0' // Use Cypress Docker image
      args '-v $HOME/.cache:/root/.cache' // Optional: cache node_modules
    }
  }
  environment {
    // CYPRESS_API_KEY = credentials('cypress_api_key') // Use Jenkins credentials if needed
    // Add other env vars as needed
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Run Cypress tests') {
      steps {
        sh 'npx cypress run'
      }
    }
    stage('Archive results') {
      steps {
        archiveArtifacts artifacts: 'cypress/reports/mochawesome.html', allowEmptyArchive: true
      }
    }
  }
  post {
    always {
      junit 'cypress/results/**/*.xml'
    }
  }
}

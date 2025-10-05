pipeline {
  agent {
    docker {
      image 'cypress/included:15.3.0' // Using Cypress Docker image
    }
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
      junit 'cypress/reports/**/*.xml'
    }
  }
}

pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        script {
          if (isUnix()) { sh 'npm ci' } else { bat 'npm ci' }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          if (isUnix()) { sh 'npm run build' } else { bat 'npm run build' }
        }
      }
    }

    stage('Test') {
      steps {
        script {
          if (isUnix()) { sh 'npm test' } else { bat 'npm test' }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
    }
  }
}

  
job('Docker build') {
    scm {
        git('https://github.com/dipt912/rest-api-typescript.git') {  node -> // is hudson.plugins.git.GitSCM
            node / gitConfigName('Diptesh')
            node / gitConfigEmail('dipt912@gmail.com')
        }
    }
    triggers {
        scm('H/5 * * * *')
    }
    wrappers {
        nodejs('nodejs') // this is the name of the NodeJS installation in 
                         // Manage Jenkins -> Configure Tools -> NodeJS Installations -> Name
    }
    steps {
        dockerBuildAndPublish {
            repositoryName('dipt912/rest-api-typescript')
            tag('${GIT_REVISION,length=9}')
            registryCredentials('dockerhub')
            forcePull(false)
            forceTag(false)
            createFingerprints(false)
            skipDecorate()
        }
    }
}
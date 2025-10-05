## Web application UI tests repo. Cypress test framework w/ Javascript and Docker+Jenkins CI/CD pipeline

Use node 22+

### TO START:

### Clone the Repository

```sh
git clone https://github.com/kazmary/cypress-javascript.git (OR gh repo clone kazmary/cypress-javascript)
cd cypress-javascript
```

### Install Dependencies

```sh
npm ci
```

### TO RUN TESTS:

- launch cypress tests

```sh
npm run test
```

- run eslint

```sh
npm run lint
```

### Viewing Jenkins Pipeline Results (for me only since Jenkins instance is local - sorry:)

- start docker

```sh
docker-compose up -d
```

After a pull request is open, Jenkins will automatically run the pipeline and execute Cypress tests.
It is configured the way to trigger a pipeline only if PR is created against `main` branch. PRs targeting other branches will not trigger the pipeline.

To view the status and results:

1. Go to the Jenkins web UI: [http://localhost:8080](http://localhost:8080) or ngrok-provided URL [https://mistrustfully-hemelytral-willow.ngrok-free.dev/] (https://mistrustfully-hemelytral-willow.ngrok-free.dev/) while ngrok is running.
2. Enter password for Jenkins obtained by running

```sh
docker exec <container_name_or_id> cat /var/jenkins_home/secrets/initialAdminPassword
```

(Use `docker ps` command to find your Jenkins container name - `cypress-javascript-jenkins-1`.)

3. Find the pipeline/job for this project.
4. Click on the latest build to see logs, test results, and any downloadable reports.

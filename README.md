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

To view the status and results:

1. Go to the Jenkins web UI: [http://localhost:8080](http://localhost:8080)
2. Find the pipeline/job for this project.
3. Click on the latest build to see logs, test results, and any reports.

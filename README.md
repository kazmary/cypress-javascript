# Web application UI tests repo. Cypress test framework w/ Javascript and Docker+Jenkins CI/CD pipeline

Use node 22+

## TO START:

### Clone the Repository

```sh
git clone https://github.com/kazmary/cypress-javascript.git (OR gh repo clone kazmary/cypress-javascript)
cd cypress-javascript
```

### Install Dependencies

```sh
npm ci
```

## TO RUN TESTS:

- launch cypress tests

```sh
npm run test
```

- run eslint

```sh
npm run lint
```

## LOCAL SETUP: Cypress & Jenkins CI with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed

### 1. Environment Variables

- Copy `.env.example` to `.env` and fill in your secrets (API keys, test user credentials etc.):
  ```sh
  cp .env.example .env
  ```
- Example `.env`:
  ```
  REQRES_API_KEY=your-api-key-here
  ```

### 2. Start Jenkins with Docker

```sh
docker-compose up -d
```

- Jenkins will be available at [http://localhost:8080](http://localhost:8080)
- For first-time setup, get the admin password:
  ```sh
  docker exec <jenkins-container-name> cat /var/jenkins_home/secrets/initialAdminPassword
  ```
  Replace `<jenkins-container-name>` with your actual container name (use `docker ps` to find it).

### 3. Run Cypress Tests Locally

```sh
npm run test
```

### 4. Updating Jenkins Configuration or Credentials

- Access Jenkins at [http://localhost:8080](http://localhost:8080)
- Use the web UI to update jobs, credentials, or pipeline settings

---

**Note:**

- All Jenkins configuration is managed in Docker and via the web UI—no global installation required.
- Each user manages their own `.env` file and Jenkins credentials.

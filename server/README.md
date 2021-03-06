# Anonymous Blocking Task Server
## Requirements
- Node version 14.16.0 ([install via NVM](https://github.com/nvm-sh/nvm))
- [NPM](https://www.npmjs.com/)
## Getting Started
### Setup
From the `anonymous-blocking-task/server/` directory:
- Install Node version 14.16.0 with `nvm install v14.16.0`
- Use Node version 14.16.0 with `nvm use v14.16.0`
- Duplicate the `.env.example` file into a new `.env` file
- Install dependencies with `npm install`
### Running
From the `anonymous-blocking-task/server/` directory, run:
- `npm start`
### Making Requests
To get started SUPER quickly 🚀, the codebase includes a [POSTMAN Collection with all the requests ready to rock 🤘](Anonymous-Blocking.postman_collection.json)

The documentation for the API can be found in the [DOCS.md file](DOCS.md).

The following JWT token can be used to make authorised requests (as long as the JWT_SECRET in `.env` is the same as `.env.example`):
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTYxNDUxMDkwNH0.iHJfC1k01HK9-DqGNyZReiGC6uHkmXghBivELtBxTgQ`
### Running tests
The codebase was built following TDD practices. All the API endpoints are fully tested.
From the `anonymous-blocking-task/server/` directory run `npm test`.

### Further improvements
- More testing around cron jobs
- More testing around the socket server
- Using real cron service over `node-cron`
- Storing data in `redis` (data is currently lost on server restart!)
- Better validation (you can create schedules that overlap!)
- And many more, this is just a POC!
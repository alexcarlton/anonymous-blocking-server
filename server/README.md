# Anonymous Blocking Task
## Requirements
- Node version >=14 ([install via NVM](https://github.com/nvm-sh/nvm))
- [NPM](https://www.npmjs.com/)
## Getting Started
### Setup
- Duplicate the `.env.example` file into a new `.env` file
### Running
From the `anonymous-blocking-task/server/` directory, run:
- `npm install`
- `npm run dev`
### Making Requests
The documentation for the API can be found in the [DOCS.md file](DOCS.md).

The following JWT token can be used to make authorised requests (as long as the JWT_SECRET in `.env` is the same as `.env.example`):
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTYxNDUxMDkwNH0.iHJfC1k01HK9-DqGNyZReiGC6uHkmXghBivELtBxTgQ`

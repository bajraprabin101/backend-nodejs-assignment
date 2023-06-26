<div align="center">

<a href="#ℹ️-about">ℹ️ About</a> •
<a href="#-features">📋 Features</a> •

</div>

---

## ℹ️ About

### 🚀 Quick start

- Install dependencies:

  ```bash
  npm install
  # or
  make install
  ```

- Start database container:

  ```bash
  make start/db
  ```

- Generate Prisma Client:

  ```bash
  npm run prisma:generate
  ```

- Start project in development mode:

  ```bash
  npm run dev
  ```

- Start project in production mode:

  ```bash
  npm run start
  ```

- Open the following URL to interact with the API using Swagger UI:

  ```bash
  http://localhost:5000/api/docs
  # Sample username and password: janedoe / 123456
  ```

## 📋 Features

- Built using [Typescript](https://github.com/microsoft/TypeScript)
- Built using [Express Framework](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework for node.
- Built using [Prisma](https://www.prisma.io/): Next-generation ORM for Node.js & TypeScript | PostgreSQL, MySQL, MariaDB, SQL Server, SQLite & MongoDB
- Built using [Ts.ED](https://tsed.io/): Ts.ED is a Node.js Framework on top of Express/Koa.js. Written in Typescript, it helps you build your server-side application easily and quickly. If you want to start a complete out-of-the-box project or fully customize it yourself, Ts.ED will guide you there!
- JWT authentication and role based authorization using custom middleware
- OpenAPI definition
- Fully configured logger with [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan)
- Unit, Integration and E2E tests using [Jest](https://github.com/facebook/jest) and [Supertest](https://github.com/visionmedia/supertest)
- Linting with [ESLint](https://github.com/eslint/eslint)
- Formatting with [Prettier](https://github.com/prettier/prettier)
- [Spell check](https://github.com/streetsidesoftware/cspell)
- Git hooks with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- Containerised using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- Path aliases support
- Commit messages must meet conventional commits format
- GitHub Actions
- Makefile as project entrypoint
- A lot of emojis 🛸

### 🐐 Makefile rules

The main actions on this project are managed using a [Makefile](Makefile) as an entrypoint.

```bash
Usage: make TARGET [ARGUMENTS]

Targets:
  build/prod                Build production environment
  clean/prod                Clean production environment
  deps                      Check if the dependencies are installed
  help                      Show this help
  install                   Install the project
  logs                      Show logs for all or c=<name> containers
  start                     Start application in development mode
  start/db                  Start database container
  start/prod                Start application in production mode
  stop/db                   Stop database container
  stop/prod                 Stop production environment
```

### ⚡ Scripts

[package.json](package.json) scripts:

- `dev`: Start project in development mode
- `build`: Build project and generate final build
- `start`: Start project in production mode
- `check:types`: Check if project types are correct
- `check:format`: Check if project is formatted correctly
- `check:lint`: Check if project is linted correctly
- `check:spelling`: Check if project is spelled correctly
- `fix:format`: Fix project format issues
- `fix:lint`: Fix project lint issues
- `fix:staged`: Check and fix staged files
- `test`: Run all tests
- `test:unit`: Run unit tests
- `test:int`: Run integration tests
- `test:e2e`: Run e2e tests
- `test:watch`: Run tests in watch mode
- `test:coverage`: Run tests with coverage
- `coverage:view`: Show coverage information
- `commit`: Help to commit changes using conventional commits
- `version`: Generate new project version
- `reset-hard`: Reset git repository to a clean state
- `prepare-release`: Prepare the project for a release and generates a new release
- `update-deps`: Update the project dependencies

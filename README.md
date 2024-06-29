# Express API Starter with TypeScript

A basic starter for an Express.js API with TypeScript.

## Installation without docker

Before you begin, ensure that you have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/MerinAPP/MERIN_BACKEND.git
```

2. Navigate to the project directory:

```bash
cd MERIN_BACKEND
```

3. Install the dependencies:

```bash
npm install
```

## Usage

The following npm scripts are available:

- `start`: Builds and runs the production version of the API.
- `dev`: Runs the API in development mode using `nodemon`, which automatically restarts the server when changes are detected.
- `build`: Lints the code and compiles TypeScript into JavaScript.
- `lint`: Lints the code using ESLint with the Airbnb TypeScript style guide.
- `test`: Runs the test suite using Jest.

To execute a script, run the following command:

```bash
npm run <script-name>
```



## Installation with docker

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)


1. Clone the repository:

```bash
git clone https://github.com/MerinAPP/MERIN_BACKEND.git
```

2. Navigate to the project directory:

```bash
cd MERIN_BACKEND
```

3 For development environment:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

 For production environment:

```bash
docker-compose -f docker-compose.prod.yml up --build

```

## Folder Structure

```
├── dist/               # Compiled JavaScript files
├── src/                # Source code
│   ├── api/            # Request handlers
│   ├── interfaces/     # Type Interface
│   ├── middlewares.ts  # Middleware functions
│   ├── app.ts          # Express application setup
│   └── index.ts        # Entry point
├── .eslintrc           # ESLint configuration
├── .gitignore          # Git ignore rules
├── package.json        # Project metadata and dependencies
└── tsconfig.json       # TypeScript configuration
```

## Dependencies
    @aws-sdk/client-s3: ^3.576.0,
    @google-cloud/translate: ^8.0.2,
    aws-sdk: ^2.1618.0,
    axios: ^1.6.3,
    bcryptjs: ^2.4.3,
    body-parser: ^1.20.2,
    cookie-parser: ^1.4.6,
    cors: ^2.8.5,
    detect-content-type: ^1.2.0,
    dotenv: ^16.3.1,
    ejs: ^3.1.9,
    express: ^4.18.2,
    express-async-errors: ^3.1.1,
    express-async-handler: ^1.2.0,
    express-mongo-sanitize: ^2.2.0,
    express-rate-limit: ^7.1.4,
    express-xss-sanitizer: ^1.2.0,
    firebase-admin: ^11.11.0,
    fs: ^0.0.1-security,
    helmet: ^6.2.0,
    jsonwebtoken: ^9.0.1,
    mongoose: ^7.4.0,
    morgan: ^1.10.0,
    multer: ^1.4.5-lts.1,
    multer-s3: ^3.0.1,
    nanoid: ^5.0.7,
    node-cron: ^3.0.3,
    nodemailer: ^6.9.7,
    path: ^0.12.7,
    rate-limiter-flexible: ^5.0.3,
    sharp: ^0.33.3,
    typescript: ^4.9.5,
    zod: ^3.22.4


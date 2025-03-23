
<h1 align="center">Case BairruDev Backend</h1>
<p align="center">
  <img src="repo-screenshots/backendGenericLogo.png?" alt="Backend-logo" width="120px" height="120px"/>
  <br>
  <i>
  This application is the typescript backend portion of the BairruDev entry test App, built with
  <br>Node.js (Fastify), integrated with a containerized PostgreSQL database and a React Native frontend.
  </i>
  <br>
</p>

## Introduction

This guide provides instructions for setting up and running the backend of the BairruDev entry test case. The typescript app was created with Node.js and the Fastify framework. This backend is meant to be used with the frontend seen in the 'caseBairruDevFront' repository.


## Technologies 
 
 Some of the Languages, Packages and Libraries employed on this backend:
 
 - Node
 - TypeScript
 - Fastify
 - Node Package Manager (for bootstrapping and managing the Node backend app)
 - PostgreSQL
 - `@fastify/cors` - Middleware to enable Cross-Origin Resource Sharing (CORS) for API security.
 - `tsx` - A modern TypeScript runtime that enables seamless development with TypeScript and ES Modules.
 - `ts-node` - Enables TypeScript execution in a Node.js environment for development purposes.
 - `@types/node` - Provides type definitions for Node.js, ensuring proper type safety in a TypeScript project.
 - `bcryptjs` (used for storing encrypted passwords inside of `user` documents on PostgreSQL database)
 - `jsonwebtoken` (for the generation of JSON Web Tokens, which are then checked for authentication)
 - `typeORM` - A modern ORM (Object-Relational Mapper) for TypeScript and JavaScript, providing database abstraction and migration capabilities.
 - `dotenv` - Used for the loading of environment variables from a `.env` file to configure the application dynamically.
 - `zod` - A TypeScript-first schema validation library used for input validation.
 - `zod-to-json-schema` - Converts Zod schemas to JSON Schema for better integration and documentation.


## Project Directory Structure

The REST API backend's directory structure:


```
|   .env
|   .env.example
|   .gitignore
|   comandos.txt
|   docker-compose.yaml
\---node_modules
|   package-lock.json
|   package.json
|   README.md
|   tree.txt
|   tsconfig.json
|
\---src
    |   server.ts
    |
    +---@types
    |       index.d.ts
    |
    +---controller
    |       auth.controller.ts
    |
    +---database
    |   \---typeorm
    |       |   data-source.ts
    |       |
    |       +---entity
    |       |       User.ts
    |       |
    |       \---migrations
    |               1742313654176-createUsersTable.ts
    |
    +---interfaces
    |       authAlterNameRequest.ts
    |       authDeleteRequest.ts
    |       authGetNameRequest.ts
    |       authLoginRequest.ts
    |       authResponse.ts
    |
    +---logic
    |       auth.logic.ts
    |
    +---middlewares
    |       check-authentication.ts
    |
    +---repositories
    |   |   auth.repository.ts
    |   |
    |   \---interfaces
    |           AuthRepository.interface.ts
    |
    \---routes
        |   auth.routes.ts
        |   index.ts
        |
        \---schemas
                auth.schema.ts
```

## Project Configuration Files (package.json)

The package.json file used in the project:


```


{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsx watch src/server.ts",
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:run": "yarn typeorm migration:run -- -d src/database/typeorm/data-source.ts",
    "migration:revert": "yarn typeorm migration:revert -- -d src/database/typeorm/data-source.ts"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@fastify/cors": "^11.0.0",
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.7",
    "fastify": "^5.2.1",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.4.0",
    "reflect-metadata": "^0.1.13",
    "typeorm": "0.3.21",
    "zod": "^3.24.2",
    "zod-to-json-schema": "^3.24.4"
  },
  "devDependencies": {
    "@types/node": "^16.11.10",
    "ts-node": "10.9.1",
    "tsx": "^4.19.3",
    "typescript": "4.5.2"
  }
}

```

## Setup 


To use this project, follow these steps:

1. Clone the Repository: Run `git clone` to clone the project into your local Git repository
2. Configure the Environment Variables: Create a `.env` file at the root of the project and add the following values:
   
   ```
   JWT_SECRET="dev_secret"
   DB_TYPE="postgres"
   DB_USERNAME="dev_db"
   DB_PASSWORD="dev_db"
   DB_DATABASE="dev_db"
   DB_HOST="localhost"
   DB_PORT=5432
3. Install `npm` Dependencies: Run `npm install`
4. Start the Containerized Database, using Docker: On the same folder level as docker-compose.yml, run `docker-compose up -d`
5. Install Yarn: Run `npm install -g yarn`
6. Run TypeORM Database Migrations (to create the users table): Run `npm run migration:run`
7. Spin up the development server: Run `npm start`

Optionally, if you want to test the project in mobile devices, locally:

8. Get your Device's IP address: Run `ipconfig` (windows), then write down the IPv4 address of your machine
9. Set device's local IP address as the host of the backend API: go to line 22 of `server.ts` and insert the IP of your machine in "host: XXX.XXX.XXX.XXX"


## Endpoints:

### **Authentication Endpoints**
| Method  | Endpoint              | Description                                  | Authentication Required |
|---------|-----------------------|----------------------------------------------|-------------------------|
| `POST`  | `/auth/register`      | Registers a new user                        | ❌ No                   |
| `POST`  | `/auth/login`         | Authenticates user and returns a JWT        | ❌ No                   |
| `DELETE`| `/auth/delete`        | Deletes the authenticated user              | ✅ Yes                  |
| `GET`   | `/auth/user/:userId`  | Retrieves the name of a specific user       | ✅ Yes                  |
| `PUT`   | `/auth/alterName`     | Updates the authenticated user's name       | ✅ Yes                  |
| `GET`   | `/auth/validate`      | Validates if a user is authenticated        | ✅ Yes                  |


## Features

- **Authentication using JWT** - Secure login and session management.
- **PostgreSQL Database Integration**
- **Fastify Web Server**
- **TypeORM for Database Migrations** - Easy database schema updates.
- **Zod Input Validation** - Ensuring correct and secure API request structures.
- **Docker-Based Database Management** - PostgreSQL in a containerized environment.
- **Environment Variable Configuration** - Secure secrets management using `.env` files.


## Additional Notes

- **Ensure Docker is installed and running** before attempting to start the database.
- **Environment variables must be configured correctly** for the application to function properly.

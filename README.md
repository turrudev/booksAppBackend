# BooksApp Backend

## Project structure

This repository contains the backend code for the BooksApp project. A very simple Node server implemented with TS, MongoDB, Jest for testing and Mongoose for operating the database. 

## Folders

- `controllers`: Contains the controller files responsible for handling HTTP requests and responses.
- `models`: Contains the Mongoose models for interacting with the MongoDB database.
- `utils`: Contains utility files or modules used across the application.

## Files

- `index.ts`: The entry point of the application where the server is initialized.
- `seed.ts`: A script for seeding the MongoDB database with sample data.
- `test.env`: Environment variables file for testing environment.
- `tsconfig.json`: TypeScript configuration file.
- `jest.config.ts`: Jest configuration file for unit testing.
- `package.json`: NPM package configuration file.
- `yarn.lock`: Yarn lock file for dependency management.

## Prerequisites

- Node.js
- npm
- MongoDB

## Getting Started

1. Clone this repository.
2. Create a MongoDB database.
3. Configure your `.env` files (See Configuration)
4. Install dependencies with `npm install`.
5. Seed your database with `npm seed`.
6. Start the application with `npm prod`
7. Access the application at `http://localhost:3000`.

## Development

- Run tests with `npm test`.
- Run dev with `npm start`.

## Configuration

- Set environment variables in a `(production|test).env` file with the address of the database.
- Example `.env` file:
    ```
    MONGODB_URI=mongodb://localhost:27017/booksApp
    ```
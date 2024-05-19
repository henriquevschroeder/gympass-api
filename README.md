# Gympass API

## ℹ About the Project

This project was built in a [Rocketseat](https://www.rocketseat.com.br) course.

This application is designed to emulate the functionality of Wellhub (formerly Gympass), providing users with the ability to discover and check into nearby gyms seamlessly. The main goal of this app is to enhance the fitness experience by offering a convenient, intuitive platform for gym enthusiasts to manage their gym activities. Users can register, authenticate, and gain access to their check-in history and profile information directly through the app.

## 💻 Tech Stack

- TypeScript
- Node.js
- Fastify
- Prisma ORM
- Docker
- PostgreSQL

## 🎯 Features

- User registration and authentication with JWT
- Profile and check-in management
- Search for nearby gyms and gym name search
- Gym check-ins and validation
- RBAC (Role-Based Access Control)
- Access to analytical metrics
- Paginated data lists
- Implementation of SOLID, Design Patterns and TDD
- Unit and E2E tests
- CI/CD configuration

## Functional Requirements

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain the profile of a logged-in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to obtain their check-in history;
- [x] It must be possible for the user to search for nearby gyms (within a 10km radius);
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check in at a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

## Business Rules

- [x] Users must not be able to register with a duplicate email;
- [x] A user cannot perform 2 check-ins on the same day;
- [x] A user cannot check in if they are not within 100 meters of the gym;
- [x] A check-in can only be validated up to 20 minutes after it is created;
- [x] A check-in can only be validated by administrators;
- [x] Only administrators can register a gym;

## Non-Functional Requirements

- [x] User passwords need to be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);

## ⚙ Setup
Follow these steps to set up the API on your local environment:

1. Clone the repository:

```bash
git clone https://github.com/henriquevschroeder/gympass-api.git
```

2. Navigate to the project directory:

```bash
cd gympass-api
```

3. Install dependencies:

```bash
npm install
```

4. Start Docker for the database:

```bash
docker-compose up -d
```

5. Set up the database using Prisma:

```bash
npx prisma generate
npx prisma migrate deploy
```

6. Start the application:

```bash
npm run start:dev
```

## 🧪 Tests

### Unit Tests

To run unit tests, use the following commands:

```bash
npm run test
npm run test:watch # Watch mode
```

### E2E Tests

To run E2E tests, use the following commands:

```bash
npm run test:e2e
npm run test:e2e:watch # Watch mode
```

### Extra (Unit and E2E)

```bash
npm run test:coverage # All tests coverage
npm run test:ui # UI mode for all tests
```

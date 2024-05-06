# GymPass API

## ℹ About the Project

This project was built in a [Rocketseat](https://www.rocketseat.com.br) course. 

This application is designed to emulate the functionality of GymPass, providing users with the ability to discover and check into nearby gyms seamlessly. The main goal of this app is to enhance the fitness experience by offering a convenient, intuitive platform for gym enthusiasts to manage their gym activities. Users can register, authenticate, and gain access to their check-in history and profile information directly through the app.

## Functional Requirements

- [x] It must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain the profile of a logged-in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [ ] It must be possible for the user to obtain their check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym;

## Business Rules

- [x] Users must not be able to register with a duplicate email;
- [ ] A user cannot perform 2 check-ins on the same day;
- [ ] A user cannot check in if they are not within 100 meters of the gym;
- [ ] A check-in can only be validated up to 20 minutes after it is created;
- [ ] A check-in can only be validated by administrators;
- [ ] Only administrators can register a gym;

## Non-Functional Requirements

- [x] User passwords need to be encrypted;
- [ ] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);
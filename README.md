## Description
-----
Employee Management System (EMS) using NestJS as the backend framework. It implements authentication using JWT tokens, PassportJS and role-based authorization using NestJS Casl library. The system supports three roles: Admin, Manager, and Employee.

## Setup
-----
Spin up Postgres Database with docker
```bash
$ docker-compose up -d --build
```
Install dependencies
```bash
$ npm install
```

## Run the app
-----
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
-----
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints
-----
Register a user: **POST** /api/v1/auth/register
```
{
    "email": "test@gmail.com",
    "password":"1234",
    "firstName":"123",
    "lastName": "1234",
    "role": "Admin"
}
```
-----
Login: **POST** /api/v1/auth/login
```
{
    "email": "test@gmail.com",
    "password":"1234",

}
```
-----
Get a user: **GET** /api/v1/user/:id

-----
Get all users: **GET** /api/v1/user/all

-----
Create a user: **POST** /api/v1/user
```
{
    "email": "test33333@gmail.com",
    "password":"1234",
    "firstName":"123",
    "lastName": "1234",
    "role": "Admin"
}
```
-----
Update a user: **PUT** /api/v1/user/:id
```
{
    "email": "test33333@gmail.com",
    "password":"1234",
    "firstName":"123",
    "lastName": "1234",
    "role": "Admin"
}
```
-----
Delete a user: **DELETE** /api/v1/user/:id
```
{
    "email": "test33333@gmail.com",
    "password":"1234",
    "firstName":"123",
    "lastName": "1234",
    "role": "Admin"
}
```
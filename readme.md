# Gamebacklog
> API that saves a user's games and their progress.
<!-- >> Live demo [_here_](https://www.example.com). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents
* [Technologies Used](#technologies-used)
* [REST API](#rest-api)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->

## Technologies Used
- node.js
- express.js
- passport.js
- mocha/chai
- prisma.io
- PostgreSQL
- Docker

## Install

    npm install

## Run the app

    node app.js

## Run the tests

    npx mocha -r ts-node/register test/app.test.ts

# REST API

The REST API to the example app is described below.

## Get a list of users

### Request


## Create a user

### Request

`POST /users/`

    curl -d '{"name":"foo","email":"foo@bar","password":"bar"}' -H "Content-Type: application/json" http://localhost:3000/users

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 57

    [{ id: 2, email: 'foo@bar', password: 'bar', name: 'foo' }]

## Get a list of users

`GET /users/`

    curl -H "Content-Type: application/json" http://localhost:3000/users

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 57

    [{ id: 2, email: 'foo@bar', password: 'bar', name: 'foo' }]

## Get an authentication token

`GET /token/`

    curl -H "Content-Type: application/json" http://localhost:3000/users

### Response

    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huIGRvZSIsImV4cCI6MTYzNDU1NzA5NSwiaWF0IjoxNjM0NTUzNDY1fQ==.7ce31f18e4a0f871fac40dc7e9a064899adfe1d05e14360187fb986c167e3d3e

## Use the Token to create a backlog

`POST /users/:id`

    curl -d '{"title":"bloodborne","progress":"first bonfire"}' -H "Accept: application/json"
    -H "Authorization: Bearer {token}" http://localhost:3000/users/:id

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 57

    [{ id: 1, title: 'bloodborne', progess: 'first bonfire' }]

## Acknowledgements
- Many thanks to Hahn!

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
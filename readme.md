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

The REST API to the app is described below.

## Create a user

### Request

`POST /users/`

    curl -H "Content-Type: application/json" -X POST http://localhost:3000/users
    -d '{"name":"foo","email":"foo@bar","password":"bar"}' 

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{ id: 2, email: 'foo@bar', password: 'bar', name: 'foo' }]

## Get a list of users

`GET /users/`

    curl -H "Content-Type: application/json" http://localhost:3000/users

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{ id: 1, email: 'jeff@jeff.com', password: 'hunter2', name: 'jeff' },
     { id: 2, email: 'foo@bar', password: 'bar', name: 'foo' }]

## Get a single user by id of users

`GET /users/:id`

    curl -H "Authorization: Basic {foo@bar:bar}" http://localhost:3000/users/2

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{ "id": 2, "email": "foo@bar", "password": "bar", "name": "foo"}]

## Get an authentication token

`GET /token/`

    curl -H "Authorization: Basic {foo@bar:bar}" http://localhost:3000/token

### Response

    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb29AYmFyIiwiZXhwIjoxNjM0NjAwODE2LCJpYXQiOjE2MzQ1OTcxODZ9.74e4fc3122044966bbf64b2bb859872087f014615d39a0ce55a8057575caf054
    
## Use the Token to create a backlog

`POST /users/:id/games`

    curl -H "Accept: application/json" -H "Authorization: Bearer {token}" 
    -d '{"title":"bloodborne","progress":"first bonfire"}' -X POST http://localhost:3000/users/2/games

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{
    "id": 1,
    "createdAt": "2021-10-20T07:06:10.198Z",
    "updatedAt": "2021-10-20T07:06:10.199Z",
    "title": "bloodborne",
    "progress": "first bonfire",
    "authorId": 2
    }]

## Get a list of a user's backlog games

`GET /users/:id/games`

    curl -H "Accept: application/json" -H "Authorization: Bearer {token}" http://localhost:3000/users/2/games

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{
    "id": 1,
    "createdAt": "2021-10-20T07:06:10.198Z",
    "updatedAt": "2021-10-20T07:06:10.199Z",
    "title": "bloodborne",
    "progress": "first bonfire",
    "authorId": 2
    }]

## Update a backlog

`PUT /users/:id/games/:id`

    curl -H "Accept: application/json" -H "Authorization: Bearer {token}" 
    -d {"title";"bloodborne","progress":"completed"} -X PUT http://localhost:3000/users/2/games/1

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{
    "id": 1,
    "createdAt": "2021-10-20T07:06:10.198Z",
    "updatedAt": "2021-10-20T07:06:10.199Z",
    "title": "bloodborne",
    "progress": "completed",
    "authorId": 2
    }]

## Delete a backlog

`PUT /users/:id/games/:id`

    curl -H "Accept: application/json" -H "Authorization: Bearer {token}" 
    -X DELETE http://localhost:3000/users/2/games/1

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{
    "id": 1,
    "createdAt": "2021-10-20T07:06:10.198Z",
    "updatedAt": "2021-10-20T07:06:10.199Z",
    "title": "bloodborne",
    "progress": "completed",
    "authorId": 2
    }]

## Acknowledgements
- Many thanks to Hahn!

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
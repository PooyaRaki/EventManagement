
# Auth Service

This is the Service that takes care of authentication and authorization

## Features
- User Registration
- Authorizes user
## Tech Stack

**Server:** Node, NestJs, RabbitMQ, Docker, PostgreSQL, Microservice


## Environment Variables

To run this project, you must add the following environment variables to your .env file.

`NODE_ENV`
The environment that we are running the application in e.g. `production`, `development`

`TZ`
The timezone of the application

`POSTGRES_HOST`
The host of PostgreSQL database

`POSTGRES_DATABASE`
The name of PostgreSQL database

`POSTGRES_SCHEMA`
The name of PostgreSQL database schema

`POSTGRES_PORT`
PostgreSQL database port

`POSTGRES_USER`
PostgreSQL username

`POSTGRES_PASSWORD`
PostgreSQL password

`TOKEN_EXPIRES_IN`
Expiration time of user Auth token e.g. 10h

`TOKEN_SECRET`
The secret key of the token

`MICROSERVICE_TIMEOUT`
The amount of seconds after which the request is timed out

`APP_SERVICE_URL`
RabbitMQ server url that the service connects to

`APP_SERVICE_QUEUE`
RabbitMQ queue name that the service consumes

## Installation

Install Requestor with npm

```bash
  npm install
  npm run build
```
Then run the project by:
```bash
  npm run start:prod
```
## License

[GPL-3.0](https://github.com/PooyaRaki/EventManagement/blob/master/LICENSE)


## Authors

- [@PooyaRaki](https://www.github.com/PooyaRaki)


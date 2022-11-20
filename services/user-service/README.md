# User Service

User profile management service

## Features
- Create a new profile
- Add an instrument to the profile
- Add an instrument to the system as an admin
## Tech Stack

**Server:** Node, NestJs, RabbitMQ, Docker, MongoDB, Microservice


## Environment Variables

To run this project, you must add the following environment variables to your .env file.

`NODE_ENV`
The environment that we are running the application in e.g. `production`, `development`

`TZ`
The timezone of the application

`MONGO_USERNAME`
The username of MongoDB database

`MONGO_PASSWORD`
The password of MongoDB database

`MONGO_URI`
The connection string of MongoDB database

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


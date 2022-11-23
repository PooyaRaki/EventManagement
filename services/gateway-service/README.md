# Gateway Service

Api gateway

## Tech Stack

**Server:** Node, NestJs, RabbitMQ, Microservice


## Environment Variables

To run this project, you must add the following environment variables to your .env file.

`NODE_ENV`
The environment that we are running the application in e.g. `production`, `development`

`TZ`
Timezone of the application

`ADDR`
This is the url that the web server responds to

`REDIS_HOST`
Host of Redis database

`REDIS_PASS`
Password of Redis database

`REDIS_PORT`
Port that Redis listens to

`REDIS_TTL`
Time to live - amount of time that a response is cached before it is deleted

`MICROSERVICE_TIMEOUT`
Amount of time after which the request is timed out

`AUTH_API_URI`
RabbitMQ server url that Auth service connects to

`AUTH_API_QUEUE`
RabbitMQ queue name that Auth service consumes

`AUTH_CACHE_TTL`
Amount of time that Auth response is cached before it is deleted

`USER_API_URI`
RabbitMQ server url that User service connects to

`USER_API_QUEUE`
RabbitMQ queue name that User service consumes

`USER_CACHE_TTL`
Amount of time that User response is cached before it is deleted

`PROFILE_API_URI`
RabbitMQ server url that Profile service connects to

`PROFILE_API_QUEUE`
RabbitMQ queue name that Profile service consumes

`PROFILE_CACHE_TTL`
Amount of time that Profile response is cached before it is deleted

`EVENT_API_URI`
RabbitMQ server url that Event service connects to

`EVENT_API_QUEUE`
RabbitMQ queue name that Event service consumes

`EVENT_CACHE_TTL`
Amount of time that Event response is cached before it is deleted


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


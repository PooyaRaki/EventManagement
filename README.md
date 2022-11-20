
# Event Management

This project is a microservice-based Event management application.
## Features
It consists of 4 main Microservice: 
- Auth: User authentication & authorization.
- User: User profile management.
- Notification: This is the service that sends notifications.
- Event: This is the main service that processes all the events.
- Gateway: This is the Api gateway.
## Tech Stack

**Server:** Node.Js, NestJs, Fastify, RabbitMQ, PostgreSQL, MongoDB, Redis, Docker, Microservice


## Installation
<br />

### **Docker**
<br />

To run this project with docker call the installer:
```bash
    sh install.sh
```
** **Environment** variables described in the related README files must be carefully set.

** **Environment** variables are committed for the sake of simplicity.

<br />

### **Node**
<br />

To install and run this project manually:
- Go through the readmes and Run each microservice separately.
- Run the requestor with the help of the Readme provided.

## Roadmap

- Adding more unit tests
- Adding data validation between microservices

## License

[GPL-3.0](https://github.com/PooyaRaki/EventManagement/blob/master/LICENSE)


## Authors

- [@PooyaRaki](https://www.github.com/PooyaRaki)
# sd-express-mongo-template

_This template includes a basic typescript CRUD API using mongoDB, NodeJs with Express and Docker_

**Includes:**

- Example setup and structure
- Per environment config using config and cross-env
- Typescript 
- NodeJs with express
- Docker compose file

_Docker is set up with volumes to persist data inside `exampleData`_

_`package.json` only contains one script that starts up the application using env `development`_

### To Run:

#### Build docker

`docker-compose up`

_This will build the mongoDB and make it available at `mongodb://localhost:27017/ExampleDB`_

#### Start app

`yarn start`

_This will start the app on port 9001 but can be configure from `/src/constants/config.ts`_

### Project Structure:
```$xslt
.
├── README.md
├── config
│   ├── default.json
│   ├── development.json
│   ├── production.json
│   └── test.json
├── docker-compose.yaml
├── nodemon.json
├── package.json
├── src
│   ├── app.ts
│   ├── constants
│   │   ├── config.ts
│   │   ├── messages.ts
│   │   └── paths.ts
│   ├── controllers
│   │   └── main.ts
│   ├── models
│   │   └── example.ts
│   ├── server.ts
│   └── services
│       └── example-service.ts
├── tsconfig.json
└── yarn.lock

```

### CRUD example endpoints

| Method        | route           | Description        |
| ------------- | --------------- | ------------------ |
| GET           | /all            | Get all items      |
| POST          | /item           | Create new item    |
| GET           | /item/{id}      | Get new item by id |
| PUT           | /item/{id}      | Update item by id  |
| DELETE        | /item/{id}      | Delete item by id  |

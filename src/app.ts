import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { BlogController, EmailController, AdminController } from "./controllers";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import session from 'express-session'
const redis = require("redis");
let RedisStore = require('connect-redis')(session)
import {MONGODB_CONNECTION_STRING} from "./constants/config";

let redisStore: any

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env' });
}

if(process.env.NODE_ENV === 'development') {
  redisStore = redis.createClient({
    host: "localhost"
  })
} else {
  redisStore = redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
    // tls: {
    //   rejectUnauthorized: false
    // }
  })
}

redisStore.on('connect', function() {
  console.log('Redis stored connected Connected!');
});

redisStore.on('error', (err: any) => {
  console.log(err)
})

class App {
  public app: Application;
  public blogController: BlogController;
  public emailController: EmailController;
  public adminController: AdminController;

  constructor() {
    this.app = express();
    this.setConfig();
    App.setMongoConfig();
    this.emailController = new EmailController(this.app);
    this.blogController = new BlogController(this.app);
    this.adminController = new AdminController(this.app);
    if(process.env.NODE_ENV === 'development') {
      console.log(process.env.NODE_ENV)
      console.log(process.env.NODE_ENV)
      console.log(process.env.NODE_ENV)
      console.log(process.env.NODE_ENV)
    }

    if(process.env.NODE_ENV === 'production') {
      console.log(process.env.NODE_ENV)
      console.log(process.env.NODE_ENV)
      console.log(process.env.NODE_ENV)
      console.log(process.env.NODE_ENV)
    }
  }

  //Connecting to our MongoDB database
  private static setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
        .catch(err => console.log(err));
  }

  private setConfig() {
    // @ts-ignore
    // this.app.use(session({
    //   store: new RedisStore({client: redisStore}),
    //   secret: 'supersecret',
    //   cookie: {
    //     secure: false,
    //     httpOnly: true,
    //     maxAge: 30000
    //   }
    // }))
    //Allows receiving requests with data in json format
    this.app.use(bodyParser.json({ limit: '10mb' }));


    //Allows receiving requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    //Enables cors
    this.app.use(cors());
  }
}
export { redisStore }

export default App;






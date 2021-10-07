import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import redis, {RedisClient} from 'redis';
import { BlogController, EmailController, AdminController } from "./controllers";
import mongoose from "mongoose";
import {MONGODB_CONNECTION_STRING, REDIS_PORT} from "./constants/config";
require('dotenv').config();



class App {
  public app: Application;
  public blogController: BlogController;
  public emailController: EmailController;
  public adminController: AdminController;
  public client: RedisClient

  constructor() {
    this.app = express();
    this.setConfig();
    App.setMongoConfig();
    this.emailController = new EmailController(this.app);
    this.blogController = new BlogController(this.app);
    this.adminController = new AdminController(this.app);
    if(process.env.NODE_ENV === 'development') {
      console.log('dev')
      this.client = redis.createClient({
        port: 6379,
        host: '127.0.0.1'
      });
    } else {
      this.client = redis.createClient({
        port: 6379,
        host: '127.0.0.1'
      });
    }

    this.client.on("error", (err) => {
      console.log(err);
    });



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
    //Allows receiving requests with data in json format
    this.app.use(bodyParser.json({ limit: '10mb' }));


    //Allows receiving requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    //Enables cors
    this.app.use(cors());
  }
}

export default App;






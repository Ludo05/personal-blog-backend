import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { BlogController, EmailController } from "./controllers";
import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "./constants/config";

class App {
  public app: Application;
  public blogController: BlogController;
  public emailController: EmailController;
  constructor() {
    this.app = express();
    this.setConfig();
    App.setMongoConfig();
    this.emailController = new EmailController(this.app);
    this.blogController = new BlogController(this.app);
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

export default new App().app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const controllers_1 = require("./controllers");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./constants/config");
class App {
    constructor() {
        this.app = express_1.default();
        this.setConfig();
        App.setMongoConfig();
        this.emailController = new controllers_1.EmailController(this.app);
        this.blogController = new controllers_1.BlogController(this.app);
    }
    //Connecting to our MongoDB database
    static setMongoConfig() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(config_1.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true
        });
    }
    setConfig() {
        //Allows receiving requests with data in json format
        this.app.use(body_parser_1.default.json({ limit: '10mb' }));
        //Allows receiving requests with data in x-www-form-urlencoded format
        this.app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
        //Enables cors
        this.app.use(cors_1.default());
    }
}
exports.default = new App().app;

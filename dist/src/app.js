"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStore = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const controllers_1 = require("./controllers");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const redis = require("async-redis");
let RedisStore = require('connect-redis')(express_session_1.default);
const config_1 = require("./constants/config");
const result = dotenv_1.default.config();
if (result.error) {
    dotenv_1.default.config({ path: '.env' });
}
exports.redisStore = redis.createClient({
    host: process.env.REDIS_URL || "redis",
    port: 6379
});
exports.redisStore.on('connect', function () {
    console.log('Redis stored connected Connected!');
});
class App {
    constructor() {
        this.app = express_1.default();
        this.setConfig();
        App.setMongoConfig();
        this.emailController = new controllers_1.EmailController(this.app);
        this.blogController = new controllers_1.BlogController(this.app);
        this.adminController = new controllers_1.AdminController(this.app);
        if (process.env.NODE_ENV === 'development') {
            console.log(process.env.NODE_ENV);
            console.log(process.env.NODE_ENV);
            console.log(process.env.NODE_ENV);
            console.log(process.env.NODE_ENV);
        }
    }
    //Connecting to our MongoDB database
    static setMongoConfig() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(config_1.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
            .catch(err => console.log(err));
    }
    setConfig() {
        // @ts-ignore
        this.app.use(express_session_1.default({
            store: new RedisStore({ client: exports.redisStore }),
            secret: 'supersecret',
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 30000
            }
        }));
        //Allows receiving requests with data in json format
        this.app.use(body_parser_1.default.json({ limit: '10mb' }));
        //Allows receiving requests with data in x-www-form-urlencoded format
        this.app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
        //Enables cors
        this.app.use(cors_1.default());
    }
}
exports.default = App;

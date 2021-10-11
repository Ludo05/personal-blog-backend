"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_URL = exports.MONGODB_CONNECTION_STRING = exports.REDIS_PORT = exports.PORT = void 0;
exports.PORT = process.env.PORT || 5000;
exports.REDIS_PORT = process.env.REDIS || 6379;
exports.MONGODB_CONNECTION_STRING = "mongodb+srv://admin:admin@cluster0.xpwrw.mongodb.net/blog?retryWrites=true&w=majority";
exports.REDIS_URL = 'redis://';

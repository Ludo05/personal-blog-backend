import {PORT_NUMBER} from "./types";

export const PORT: PORT_NUMBER = process.env.PORT || 5000;
export const REDIS_PORT: string | number = process.env.REDIS || 6379;
export const MONGODB_CONNECTION_STRING: string = "mongodb+srv://admin:admin@cluster0.xpwrw.mongodb.net/blog?retryWrites=true&w=majority";

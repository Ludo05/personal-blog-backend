import {PORT_NUMBER} from "./types";

export const PORT: PORT_NUMBER = process.env.PORT || 9001;
export const MONGODB_CONNECTION_STRING: string = "mongodb+srv://admin:admin@cluster0.xpwrw.mongodb.net/blog?retryWrites=true&w=majority";

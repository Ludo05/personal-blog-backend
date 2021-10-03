import mongoose, {Model, Schema} from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});


const LoginSchema = new Schema({
    username: String,
    password: String

})
export const SchemaModel: Model<any> = mongoose.model("Users", UserSchema);

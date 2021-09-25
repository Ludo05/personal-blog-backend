import mongoose, {Model, Schema} from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    repeat_password: String
});

export const SchemaModel: Model<any> = mongoose.model("Users", UserSchema);

import mongoose, {Model, Schema} from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

UserSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                // @ts-ignore
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    // @ts-ignore
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

const LoginSchema = new Schema({
    username: String,
    password: String

})
export const SchemaModel: Model<any> = mongoose.model("Users", UserSchema);

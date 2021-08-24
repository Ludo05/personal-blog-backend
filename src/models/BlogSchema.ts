import mongoose, {Model, Schema} from "mongoose";

const BlogSchema = new Schema({
    title: String,
    summary: String,
    img: {
        type: String,
        required: false
    }
});

export const BlogModel: Model<any> = mongoose.model("Blog", BlogSchema);

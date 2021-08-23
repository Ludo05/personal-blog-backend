import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: String,
    summary: String,
    img: {
        type: String,
        required: false
    }
});

export const BlogModel = mongoose.model("Blog", BlogSchema);

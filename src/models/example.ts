import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: {
    type: String,
    required: false
  },
  summary: String,
  img: String
});

export const BlogModel = mongoose.model("Blog", BlogSchema);

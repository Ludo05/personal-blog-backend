"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    title: String,
    desc: String,
    date: {
        type: String,
        required: false
    },
    summary: String,
    img: String
});
exports.BlogModel = mongoose_1.default.model("Blog", BlogSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const blogValidation = joi_1.default.object().keys({
    title: joi_1.default.string()
        .min(5)
        .max(20)
        .required(),
    img: joi_1.default.string(),
    summary: joi_1.default.string()
        .min(15)
        .max(30)
        .required()
});
exports.blogValidation = blogValidation;

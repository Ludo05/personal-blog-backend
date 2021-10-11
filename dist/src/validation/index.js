"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.userValidation = exports.blogValidation = void 0;
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
const userValidation = joi_1.default.object().keys({
    username: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: joi_1.default.ref('password'),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});
exports.userValidation = userValidation;
const loginValidation = joi_1.default.object().keys({
    username: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
exports.loginValidation = loginValidation;

"use strict";
exports.__esModule = true;
var joi_1 = require("joi");
var blogValidation = joi_1["default"].object().keys({
    title: joi_1["default"].string()
        .min(5)
        .max(20)
        .required(),
    img: joi_1["default"].string(),
    summary: joi_1["default"].string()
        .min(15)
        .max(30)
        .required()
});
exports.blogValidation = blogValidation;
//# sourceMappingURL=index.js.map
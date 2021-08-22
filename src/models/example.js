"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var BlogSchema = new mongoose_1["default"].Schema({
    title: String,
    summary: String,
    img: {
        type: String,
        required: false
    }
});
exports.BlogModel = mongoose_1["default"].model("Blog", BlogSchema);
//# sourceMappingURL=example.js.map
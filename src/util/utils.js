"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var chai_as_promised_1 = require("chai-as-promised");
var chai_string_1 = require("chai-string");
var sinon_1 = require("sinon");
exports.sinon = sinon_1["default"];
var sinon_chai_1 = require("sinon-chai");
chai_1["default"].should();
chai_1["default"].use(sinon_chai_1["default"]);
chai_1["default"].use(chai_as_promised_1["default"]);
chai_1["default"].use(chai_string_1["default"]);
var expect = chai_1["default"].expect;
exports.expect = expect;
//# sourceMappingURL=utils.js.map
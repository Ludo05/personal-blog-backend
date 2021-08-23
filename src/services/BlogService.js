"use strict";
exports.__esModule = true;
var messages_1 = require("../constants/messages");
var example_1 = require("../models/BlogSchema");
var validation_1 = require("../validation");
var BlogService = /** @class */ (function () {
    function BlogService() {
    }
    BlogService.prototype.welcomeMessage = function (req, res) {
        return res.status(200).send(messages_1.WELCOME_MESSAGE);
    };
    BlogService.prototype.getAllExampleItems = function (req, res) {
        example_1.BlogModel.find({}, function (error, exampleItem) {
            if (error) {
                return res.send(error);
            }
            return res.json(exampleItem);
        });
    };
    BlogService.prototype.addNewExampleItem = function (req, res) {
        var _a = validation_1.blogValidation.validate(req.body), error = _a.error, value = _a.value;
        if (error) {
            return res.status(400).send(error);
        }
        var newExampleItem = new example_1.BlogModel(value);
        newExampleItem.save(function (error, exampleItem) {
            if (error) {
                return res.send(error);
            }
            return res.status(201).json(exampleItem);
        });
    };
    BlogService.prototype.deleteExampleItem = function (req, res) {
        var exampleItemId = req.params.id;
        //findOneAndDelete({_id: exampleItemId}).
        example_1.BlogModel.findByIdAndDelete(exampleItemId, function (error, deleted) {
            if (error) {
                res.send(error);
            }
            return deleted
                ? res.status(204).send(messages_1.DELETE_SUCCESSFUL_MESSAGE)
                : res.status(404).send(messages_1.RESOURCE_NOT_FOUND_MESSAGE);
        });
    };
    BlogService.prototype.updateExampleItem = function (req, res) {
        var exampleItemId = req.params.id;
        example_1.BlogModel.findByIdAndUpdate(exampleItemId, req.body, { "new": true }, //Return the updated object
        function (error, exampleItem) {
            if (error) {
                res.send(error);
            }
            return exampleItem
                ? res.status(200).json(exampleItem)
                : res.status(404).send(messages_1.RESOURCE_NOT_FOUND_MESSAGE);
        });
    };
    return BlogService;
}());
exports.BlogService = BlogService;
//# sourceMappingURL=BlogService.js.map

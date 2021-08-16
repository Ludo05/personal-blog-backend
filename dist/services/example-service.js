"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
const example_1 = require("../models/example");
class BlogService {
    welcomeMessage(req, res) {
        return res.status(200).send(messages_1.WELCOME_MESSAGE);
    }
    getAllExampleItems(req, res) {
        example_1.BlogModel.find({}, (error, exampleItem) => {
            if (error) {
                return res.send(error);
            }
            return res.json(exampleItem);
        });
    }
    addNewExampleItem(req, res) {
        const newExampleItem = new example_1.BlogModel(req.body);
        newExampleItem.save((error, exampleItem) => {
            if (error) {
                return res.send(error);
            }
            return res.status(201).json(exampleItem);
        });
    }
    deleteExampleItem(req, res) {
        const exampleItemId = req.params.id;
        //findOneAndDelete({_id: exampleItemId}).
        example_1.BlogModel.findByIdAndDelete(exampleItemId, (error, deleted) => {
            if (error) {
                res.send(error);
            }
            return deleted
                ? res.status(204).send(messages_1.DELETE_SUCCESSFUL_MESSAGE)
                : res.status(404).send(messages_1.RESOURCE_NOT_FOUND_MESSAGE);
        });
    }
    updateExampleItem(req, res) {
        const exampleItemId = req.params.id;
        example_1.BlogModel.findByIdAndUpdate(exampleItemId, req.body, { new: true }, //Return the updated object
        (error, exampleItem) => {
            if (error) {
                res.send(error);
            }
            return exampleItem
                ? res.status(200).json(exampleItem)
                : res.status(404).send(messages_1.RESOURCE_NOT_FOUND_MESSAGE);
        });
    }
}
exports.BlogService = BlogService;

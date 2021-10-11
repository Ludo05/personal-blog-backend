"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const messages_1 = require("../constants/messages");
const BlogSchema_1 = require("../models/BlogSchema");
const validation_1 = require("../validation");
const app_1 = require("../app");
class BlogService {
    getBlogById(req, res) {
        const exampleItemId = req.params.id;
        BlogSchema_1.BlogModel.findById(exampleItemId, (error, ItemById) => {
            if (error) {
                return res.send(error);
            }
            return res.status(200).json(ItemById);
        });
    }
    testAuth(req, res) {
        // @ts-ignore
        return res.json(`Welcome to auth ${req.user.username}!`);
    }
    getAllExampleItems(req, res) {
        BlogSchema_1.BlogModel.find({}, (error, exampleItem) => {
            if (error) {
                return res.send(error);
            }
            return res.json(exampleItem);
        });
    }
    addNewExampleItem(req, res) {
        const { error, value } = validation_1.blogValidation.validate(req.body);
        if (error) {
            return res.status(400).send(error);
        }
        const newExampleItem = new BlogSchema_1.BlogModel(value);
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
        BlogSchema_1.BlogModel.findByIdAndDelete(exampleItemId, null, (error, deleted) => {
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
        BlogSchema_1.BlogModel.findByIdAndUpdate(exampleItemId, req.body, { new: true }, //Return the updated object
        (error, exampleItem) => {
            if (error) {
                res.send(error);
            }
            else {
            }
            return exampleItem
                ? res.status(200).json(exampleItem)
                : res.status(404).send(messages_1.RESOURCE_NOT_FOUND_MESSAGE);
        });
    }
    async welcomeMessage(req, res) {
        await app_1.redisStore.set('one', 'tester to see if value was saved');
        // redisStore.get('one', (err, reply) => {
        //     console.log(reply)
        // })
        let l = await app_1.redisStore.get('one');
        console.log('versioning');
        console.log(l);
        return res.json(messages_1.WELCOME_MESSAGE);
    }
}
exports.BlogService = BlogService;

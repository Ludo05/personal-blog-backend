"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlogService_1 = require("../services/BlogService");
const paths_1 = require("../constants/paths");
class BlogController {
    constructor(app) {
        this.app = app;
        this.blogService = new BlogService_1.BlogService();
        this.routes();
    }
    routes() {
        this.app.route(paths_1.PATHS.INDEX)
            .get(this.blogService.welcomeMessage);
        this.app.route(paths_1.PATHS.ALL)
            .get(this.blogService.getAllExampleItems);
        this.app.route(paths_1.PATHS.ITEM)
            .post(this.blogService.addNewExampleItem);
        this.app.route(paths_1.PATHS.ITEM_BY_ID)
            .delete(this.blogService.deleteExampleItem)
            .put(this.blogService.updateExampleItem);
    }
}
exports.BlogController = BlogController;

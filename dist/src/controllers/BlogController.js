"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const BlogService_1 = require("../services/BlogService");
const paths_1 = require("../constants/paths");
const middleware_1 = require("../middleware");
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
            .get(this.blogService.getBlogById)
            .delete(this.blogService.deleteExampleItem)
            .put(this.blogService.updateExampleItem);
        this.app.route(paths_1.PATHS.AUTH)
            .get(middleware_1.AuthService.checkAuthorization, this.blogService.testAuth);
    }
}
exports.BlogController = BlogController;

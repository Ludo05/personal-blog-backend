"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_service_1 = require("../services/example-service");
const paths_1 = require("../constants/paths");
class BlogController {
    constructor(app) {
        this.app = app;
        this.exampleService = new example_service_1.BlogService();
        this.routes();
    }
    routes() {
        this.app.route(paths_1.PATHS.INDEX)
            .get(this.exampleService.welcomeMessage);
        this.app.route(paths_1.PATHS.ALL)
            .get(this.exampleService.getAllExampleItems);
        this.app.route(paths_1.PATHS.ITEM)
            .post(this.exampleService.addNewExampleItem);
        this.app.route(paths_1.PATHS.ITEM_BY_ID)
            .delete(this.exampleService.deleteExampleItem)
            .put(this.exampleService.updateExampleItem);
    }
}
exports.BlogController = BlogController;

import { Application } from 'express';
import { BlogService } from "../services/example-service";
import { PATHS } from "../constants/paths";

export class BlogController {
  private exampleService: BlogService;

  constructor(private app: Application) {
    this.exampleService = new BlogService();
    this.routes();
  }

  public routes() {
    this.app.route(PATHS.INDEX)
      .get(this.exampleService.welcomeMessage);

    this.app.route(PATHS.ALL)
      .get(this.exampleService.getAllExampleItems);

    this.app.route(PATHS.ITEM)
      .post(this.exampleService.addNewExampleItem);

    this.app.route(PATHS.ITEM_BY_ID)
      .delete(this.exampleService.deleteExampleItem)
      .put(this.exampleService.updateExampleItem);

  }
}

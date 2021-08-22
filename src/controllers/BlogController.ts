import { Application } from 'express';
import { BlogService } from "../services/BlogService";
import { PATHS } from "../constants/paths";

export class BlogController {
  private blogService: BlogService;

  constructor(private app: Application) {
    this.blogService = new BlogService();
    this.routes();
  }

  public routes() {
    this.app.route(PATHS.INDEX)
      .get(this.blogService.welcomeMessage);

    this.app.route(PATHS.ALL)
      .get(this.blogService.getAllExampleItems);

    this.app.route(PATHS.ITEM)
      .post(this.blogService.addNewExampleItem);

    this.app.route(PATHS.ITEM_BY_ID)
      .delete(this.blogService.deleteExampleItem)
      .put(this.blogService.updateExampleItem);

  }
}

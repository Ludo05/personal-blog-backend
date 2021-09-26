import {Application} from "express";
import {AdminService} from "../services/AdminService";
import {PATHS} from "../constants/paths";

export class AdminController {
    private adminService: AdminService

    constructor(private app: Application) {
        this.adminService = new AdminService();
        this.routes()
    }


    private routes() {
        this.app.route(PATHS.SIGNUP)
            .post(this.adminService.SignIn)
    }
}

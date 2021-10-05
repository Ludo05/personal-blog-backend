import {Application} from "express";
import {AdminService} from "../services/AdminService";
import {PATHS} from "../constants/paths";
import {AuthService} from "../middleware";

export class AdminController {
    private adminService: AdminService

    constructor(private app: Application) {
        this.adminService = new AdminService();
        this.routes()
    }


    private routes() {
        this.app.route(PATHS.SIGNUP)
            .post(this.adminService.register)
        this.app.route(PATHS.LOGIN)
            .post(this.adminService.login)
        this.app.route(PATHS.LOGOUT)
            .post(AuthService.checkAuthorization, this.adminService.logout)
        this.app.route(PATHS.VERIFY)
            .post(this.adminService.refreshToken)
    }
}

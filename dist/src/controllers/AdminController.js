"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const AdminService_1 = require("../services/AdminService");
const paths_1 = require("../constants/paths");
const middleware_1 = require("../middleware");
class AdminController {
    constructor(app) {
        this.app = app;
        this.adminService = new AdminService_1.AdminService();
        this.routes();
    }
    routes() {
        this.app.route(paths_1.PATHS.SIGNUP)
            .post(this.adminService.register);
        this.app.route(paths_1.PATHS.LOGIN)
            .post(this.adminService.login);
        this.app.route(paths_1.PATHS.LOGOUT)
            .post(middleware_1.AuthService.checkAuthorization, this.adminService.logout);
        this.app.route(paths_1.PATHS.VERIFY)
            .post(this.adminService.refreshToken);
    }
}
exports.AdminController = AdminController;

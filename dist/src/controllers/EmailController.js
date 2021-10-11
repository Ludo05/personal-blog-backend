"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const EmailService_1 = require("../services/EmailService");
const paths_1 = require("../constants/paths");
class EmailController {
    constructor(app) {
        this.app = app;
        this.emailService = new EmailService_1.EmailService();
        this.routes();
    }
    routes() {
        this.app.route(paths_1.PATHS.EMAIL)
            .post(this.emailService.sendEmail);
        this.app.route(paths_1.PATHS.EMAIL_WITH_ATTACHMENT)
            .post(this.emailService.emailWithAttachment);
    }
}
exports.EmailController = EmailController;

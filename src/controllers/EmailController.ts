import { Application } from 'express';
import { EmailService } from "../services/EmailService";
import { PATHS } from "../constants/paths";

export class EmailController {
    private emailService: EmailService;

    constructor(private app: Application) {
        this.emailService = new EmailService();
        this.routes();
    }

    public routes() {
        this.app.route(PATHS.EMAIL)
            .post(this.emailService.sendEmail);

        this.app.route(PATHS.EMAIL_WITH_ATTACHMENT)
            .post(this.emailService.emailWithAttachment);

    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = require("nodemailer");
const EmailTemplateCreator_1 = require("../util/EmailTemplateCreator");
class EmailService {
    static transport() {
        return nodemailer_1.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'USER',
                pass: 'PASSWORD'
            },
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    async sendEmail(req, res) {
        const mailOptions = {
            from: 'EMAIL',
            to: req.body.to,
            subject: 'Thanks for reaching out',
            text: req.body.name + req.body.text
        };
        EmailService.transport().sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ msg: err.message });
            }
            else {
                return res.status(200).send({ msg: 'email sent.' });
            }
        });
    }
    async emailWithAttachment(req, res) {
        const { htmlToSend, email } = EmailTemplateCreator_1.EmailTemplateCreator.createTemplate(req);
        const mailOptions = {
            from: 'EMAIL',
            to: req.body.customerEmail,
            subject: 'Diet Plan',
            text: 'Here',
            html: htmlToSend,
            attachments: [{
                    filename: `attachment.pdf`,
                    content: EmailTemplateCreator_1.EmailTemplateCreator.createPDF(email),
                    contentType: 'application/pdf; charset=ISO-8859-1'
                }]
        };
        EmailService.transport().sendMail(mailOptions, (err) => {
            if (err) {
                return res.status(500).send({ message: err.stack });
            }
            else {
                return res.status(204).send();
            }
        });
    }
}
exports.EmailService = EmailService;

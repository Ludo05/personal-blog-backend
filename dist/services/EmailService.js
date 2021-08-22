"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const EmailTemplateCreator_1 = require("../util/EmailTemplateCreator");
class EmailService {
    static transport() {
        return nodemailer_1.createTransport({
            // @ts-ignore
            host: 'lewiswilliams1501@gmail.com',
            port: 465,
            secure: true,
            auth: false,
            from: 'kontakt@dietaszczescia.pl',
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: 'nkontakt@dietaszczescia.pl',
                to: req.body.email,
                subject: 'Account Verification Token',
                text: 'Hello,\n\n' + 'Thanks for reaching out to me'
            };
            EmailService.transport().sendMail(mailOptions, (err) => {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }
                else {
                    return res.status(200).send('A verification email has been sent to');
                }
            });
        });
    }
    emailWithAttachment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { htmlToSend, email } = EmailTemplateCreator_1.EmailTemplateCreator.createTemplate(req);
            const mailOptions = {
                from: 'kontakt@dietaszczescia.pl',
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
            // transporter.sendMail(mailOptions, function(error, cb) {
            // });
        });
    }
}
exports.EmailService = EmailService;

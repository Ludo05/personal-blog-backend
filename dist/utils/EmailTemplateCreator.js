"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const debug_1 = require("../helpers/debug/debug");
const emailDebug = debug_1.myDebug('Email:Creator');
class EmailTemplateCreator {
    static pageRenderer(pathToTemplate) {
        emailDebug('creating page renderer');
        const filePath = path_1.default.join(__dirname, pathToTemplate);
        const source = fs_1.default.readFileSync(filePath, 'utf-8').toString();
        return handlebars_1.default.compile(source);
    }
    static createTemplate(req) {
        emailDebug('creating template');
        const dietaryEmail = this.pageRenderer('../templates/emails/dietary.html');
        const emailPdf = this.pageRenderer('../templates/emails/email.ejs');
        const replacements = {
            username: req.body.customerEmail
        };
        const emailReplacements = {
            username: req.body.customerEmail
        };
        const htmlToSend = dietaryEmail(replacements);
        const email = emailPdf(emailReplacements);
        emailDebug(htmlToSend);
        emailDebug(email);
        return { htmlToSend, email };
    }
    // WILL ADD MORE TO THIS WHEN CREATING THE TEMPLATES
    static createPDF(text) {
        emailDebug('creating PDF');
        const doc = new pdfkit_1.default({ margin: 50 });
        doc.text(text.toString());
        doc.end();
        return doc;
    }
}
exports.EmailTemplateCreator = EmailTemplateCreator;

import { Request } from 'express';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import PDFDocument from 'pdfkit';
import { myDebug } from '../helpers/debug';

const emailDebug = myDebug('Email:Creator');
class EmailTemplateCreator {

  private static pageRenderer(pathToTemplate: string): HandlebarsTemplateDelegate {
    emailDebug('creating page renderer');
    const filePath = path.join(__dirname, pathToTemplate);
    const source: string = fs.readFileSync(filePath, 'utf-8').toString();
    return handlebars.compile(source);
  }

  public static createTemplate(req: Request): any {
    emailDebug('creating template');

    const dietaryEmail = this.pageRenderer('../templates/emails/email-response.ejs');
    // const emailPdf = this.pageRenderer('../templates/emails/email.ejs');

    const replacements = {
      username: req.body.name
    };

    // const emailReplacements = {
    //   username: req.body.name
    // };
    const htmlToSend = dietaryEmail(replacements);
    // const email = emailPdf(emailReplacements);

    emailDebug(htmlToSend);
    // emailDebug(email);
    return { htmlToSend };
  }

  // WILL ADD MORE TO THIS WHEN CREATING THE TEMPLATES
  public static createPDF(text: HandlebarsTemplateDelegate): any {
    emailDebug('creating PDF');

    const doc: PDFKit.PDFDocument = new PDFDocument({ margin: 50 });
    doc.text(text.toString());
    doc.end();

    return doc;
  }
}

export { EmailTemplateCreator };

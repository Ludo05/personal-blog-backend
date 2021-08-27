import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EmailTemplateCreator } from '../util/EmailTemplateCreator';

export class EmailService {
  private static transport(): Mail {
    return createTransport({
      service: 'gmail',
      auth: {
        user: 'lewisawilliams1501@gmail.com',
        pass: 'Dragonballz!23'
      }
    });
  }

  public async sendEmail(req: Request, res: Response) {
    const mailOptions = {
      from: 'lewiswilliams1501@gmail.com',
      to: req.body.to,
      subject: 'Thanks for reaching out',
      text: req.body.text
    };
    EmailService.transport().sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: err.message });
      } else {
        return res.status(200).redirect('/');
      }
    });
  }

  public async emailWithAttachment(req: Request, res: Response) {
    const { htmlToSend, email } = EmailTemplateCreator.createTemplate(req);
    const mailOptions = {
      from: 'kontakt@dietaszczescia.pl',
      to: req.body.customerEmail,
      subject: 'Diet Plan',
      text: 'Here',
      html: htmlToSend,
      attachments: [{
        filename: `attachment.pdf`,
        content: EmailTemplateCreator.createPDF(email),
        contentType: 'application/pdf; charset=ISO-8859-1'

      }]
    };
    EmailService.transport().sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send({ message: err.stack });
      } else {
        return res.status(204).send();
      }
    });
  }
}

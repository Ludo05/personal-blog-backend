import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EmailTemplateCreator } from '../util/EmailTemplateCreator';

export class EmailService {
  private static transport(): Mail {
    return createTransport({
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

  public async sendEmail(req: Request, res: Response) {
    const mailOptions = {
      from: 'nkontakt@dietaszczescia.pl',
      to: req.body.email,
      subject: 'Account Verification Token',
      text: 'Hello,\n\n' + 'Thanks for reaching out to me'
    };
    EmailService.transport().sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send({ msg: err.message });
      } else {
        return res.status(200).send('A verification email has been sent to');
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

    // transporter.sendMail(mailOptions, function(error, cb) {
    // });
  }

}

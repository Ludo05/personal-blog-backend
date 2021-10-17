import {Request, Response} from 'express';
import {createTransport} from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {EmailTemplateCreator} from '../util/EmailTemplateCreator';

interface MailObject {
    from: string,
    to: string,
    subject: string,
    text: string
}

export class EmailService {
    private static transport(): Mail {
        return createTransport({
            host: 'mail.lucodes.co.uk',
            port: 465,
            secure: true,
            auth: {
                user: 'contact@lucodes.co.uk',
                pass: process.env.EMAIL_PASSWORD
            },
        });
    }

    private static async sendMailAction(mailOptions: MailObject, res: Response): Promise<number> {
        const response = await EmailService.transport().sendMail(mailOptions)
        if (response.response.includes("OK")) {
            return 1;
        }
        return 0;
    }

    public async sendEmail(req: Request, res: Response) {
      const { from, name, text } = req.body
      const {htmlToSend} = EmailTemplateCreator.createTemplate(req);

      const sendToMe: MailObject = {
            from: from,
            to: 'contact@lucodes.co.uk',
            subject: `Lucode: message from - ${name}`,
            text: text
        } as MailObject
      const sendBackToUser: MailObject = {
          from: 'contact@lucodes.co.uk',
          to: from,
          subject: `${name} - Contact from Lucodes`,
          text: htmlToSend
        } as MailObject

      if(from === ''){
          return res.status(400).json({msg: 'provide email'})

        }
        const sendingToMe = await EmailService.sendMailAction(sendToMe, res)
        if(sendingToMe === 1){
          const sendToUser = await EmailService.sendMailAction(sendBackToUser, res)
          if(sendToUser === 1){
            return res.status(200).json({msg : 'message sent'})
          }
        }
    }


    public async emailWithAttachment(req: Request, res: Response) {
        const {htmlToSend, email} = EmailTemplateCreator.createTemplate(req);
        const mailOptions = {
            from: 'EMAIL',
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
        EmailService.transport().sendMail(mailOptions, (err): Response => {
            if (err) {
                return res.status(500).send({message: err.stack});
            } else {
                return res.status(204).send();
            }
        });
    }


}

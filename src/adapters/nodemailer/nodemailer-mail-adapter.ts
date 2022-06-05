import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../email-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5745e7230d80da",
      pass: "139abe41444074"
    }
  });

export class NodeMailerAdapter implements MailAdapter{
    async sendMail({ subject, body }:SendMailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'João Pedro <jjoao.monteiro15@gmail.com>',
            subject,
            html: body
        })
    }
}
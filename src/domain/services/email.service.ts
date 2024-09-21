import nodemailer from "nodemailer";
import { envs as env } from "../../config/env.plugin";

interface MailOptions {
    to: string;
    subject: string;
    body: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: env.MAIL_SERVICE,
        auth: {
            user: env.MAIL_USER,
            pass: env.MAIL_SECRET_KEY
        }
    });
    
    async sendMail({ to, subject, body }: MailOptions) {
        try {
            await this.transporter.sendMail({
                from: env.MAIL_USER,
                to,
                subject,
                html: body
            });
        } catch (error) {
            console.error(error);
        }
    }
}
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { local_config } from "../config/config";

interface MailOptions {
  email: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export const sendMail = async (options: MailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: local_config.SMTP_HOST as string,
    port: Number(local_config.SMTP_PORT),
    service: local_config.SMTP_SERVICE as string,
    auth: {
      user: local_config.SMTP_MAIL as string,
      pass: local_config.SMTP_PASSWORD as string,
    },
  });

  const { email, subject, template, data } = options;
  // const temPath = path.join( __dirname,"../mails", template);
  const paths=`./src/mails/${template}`

  const html = await ejs.renderFile(paths, data);

  const mailOption = {
    from: local_config.SMTP_MAIL as string,
    to: email,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOption);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error(error);
  }
};

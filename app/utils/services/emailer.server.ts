import nodemailer from "nodemailer/lib/nodemailer.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

type SendData = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export class EmailerService {
  public async send(data: SendData) {
    await transporter.sendMail({
      from: data.from,
      to: data.to,
      replyTo: data.from,
      subject: data.subject,
      text: data.text,
    });
  }
}

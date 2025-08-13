import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

type SendData = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export class EmailerService {
  public async send(data: SendData) {
    await sendgrid.send(data);
  }
}

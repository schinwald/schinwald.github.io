import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

type Config = {
  request: Request;
};

type SendOptions = {
  recaptchaResponse: string;
  email: string;
  message: string;
};

export class EmailerService {
  private request: Request;

  constructor(config: Config) {
    this.request = config.request;
  }

  public async send(options: SendOptions) {
    const errors: Record<string, any>[] = [];

    // Make sure the recaptcha is valid
    const queryString = new URLSearchParams({
      secret: import.meta.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: options.recaptchaResponse,
    }).toString();

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?${queryString}`,
      {
        method: "POST",
      },
    ).then((response) => response.json());

    if (!response.success) {
      errors.push(response);
      return {
        meta: {
          status: 400,
        },
        errors,
      } as const;
    }

    try {
      await sendgrid.send({
        from: "website@schinwald.dev",
        to: "hi@schinwald.dev",
        subject: `New message! ${options.email}`,
        text: options.message,
      });
    } catch (error) {
      console.error(error);
      errors.push({});
      return {
        meta: {
          status: 500,
        },
        errors,
      } as const;
    }

    return {
      meta: {
        status: 200,
      },
      data: null,
    } as const;
  }
}

import { z } from "zod";

type Config = {
  accessToken?: string;
};

export class GoogleService {
  private accessToken?: string;
  private headers: HeadersInit;

  constructor(config?: Config) {
    this.accessToken = config?.accessToken;
    this.headers = {};

    if (this.accessToken) {
      Object.assign(this.headers, {
        authorization: `Bearer ${this.accessToken}`,
      });
    }
  }

  async getUser() {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: this.headers },
    ).then((response) => response.json());

    return z
      .object({
        sub: z.string(),
        name: z.string(),
        given_name: z.string(),
        family_name: z.string(),
        picture: z.string(),
        email: z.string(),
        email_verified: z.boolean(),
      })
      .parse(response);
  }

  async verifyReCAPTCHA(recatpchaResponse: string) {
    const queryString = new URLSearchParams({
      key: process.env.GOOGLE_API_KEY,
    }).toString();

    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.GOOGLE_RECAPTCHA_PROJECT_ID}/assessments?${queryString}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          event: {
            token: recatpchaResponse,
            siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
          },
        }),
      },
    ).then((response) => response.json());

    return z
      .object({
        tokenProperties: z.object({
          valid: z.boolean(),
        }),
      })
      .parse(response);
  }
}

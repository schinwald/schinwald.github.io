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
      secret: import.meta.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: recatpchaResponse,
    }).toString();

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?${queryString}`,
      { method: "POST" },
    ).then((response) => response.json());

    return z
      .object({
        success: z.boolean(),
      })
      .parse(response);
  }
}

import { z } from "zod";

type Config = {
  accessToken: string;
};

export class Google {
  accessToken: string;
  headers: HeadersInit;

  constructor(config: Config) {
    this.accessToken = config.accessToken;
    this.headers = {
      authorization: `Bearer ${this.accessToken}`,
    };
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
}

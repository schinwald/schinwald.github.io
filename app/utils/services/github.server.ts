import { z } from "zod";

type Config = {
  accessToken: string;
};

export class Github {
  accessToken: string;
  headers: HeadersInit;

  constructor(config: Config) {
    this.accessToken = config.accessToken;
    this.headers = {
      authorization: `Bearer ${this.accessToken}`,
      accept: "application/vnd.github.v3+json",
    };
  }

  async getUser() {
    const response = await fetch("https://api.github.com/user", {
      headers: this.headers,
    }).then((response) => response.json());

    return z
      .object({
        id: z.number(),
        name: z.string(),
        avatar_url: z.string(),
      })
      .parse(response);
  }

  async getEmails() {
    const response = await fetch("https://api.github.com/user/emails", {
      headers: this.headers,
    }).then((response) => response.json());

    return z
      .array(
        z.object({
          email: z.string(),
          primary: z.boolean(),
        }),
      )
      .parse(response);
  }
}

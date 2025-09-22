import type { Simplify } from "drizzle-orm";
import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { GithubService } from "~/utils/services/github.server";
import { GoogleService } from "~/utils/services/google.server";

export type User = Simplify<{
  id: string;
  email: string;
  fullName: string;
  avatarURL: string;
}>;

export const authenticator = new Authenticator<User>();

authenticator.use(
  new OAuth2Strategy(
    {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scopes: ["openid", "profile", "email"],
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
      redirectURI: `${process.env.ORIGIN}/auth/callback/google`,
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async ({ tokens }) => {
      const google = new GoogleService({
        accessToken: tokens.accessToken(),
      });

      const user = await google.getUser();

      return {
        id: user.sub,
        email: user.email,
        fullName: user.name,
        avatarURL: user.picture,
      };
    },
  ),
  "google",
);

authenticator.use(
  new OAuth2Strategy(
    {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scopes: ["user:email", "read:user"],
      authorizationEndpoint: "https://github.com/login/oauth/authorize",
      tokenEndpoint: "https://github.com/login/oauth/access_token",
      redirectURI: `${process.env.ORIGIN}/auth/callback/github`,
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async (data) => {
      const github = new GithubService({
        accessToken: data.tokens.accessToken(),
      });

      const user = await Promise.all([
        github.getUser(),
        github.getEmails(),
      ]).then(([user, emails]) => {
        return {
          id: user.id.toString(),
          email: emails.find((email) => email.primary)?.email ?? "",
          fullName: user.name,
          avatarURL: user.avatar_url,
        };
      });

      return user;
    },
  ),
  "github",
);

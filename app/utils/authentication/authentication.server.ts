import { createCookieSessionStorage } from "react-router";
import type { Simplify } from "drizzle-orm";
import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { addCommitSession, redirect } from "~/utils/remix/utils.server";
import { Github } from "~/utils/services/github.server";
import { Google } from "~/utils/services/google.server";

type User = {
  id: string;
  email: string;
  fullName: string;
  avatarURL: string;
};

export const redirectSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__redirect",
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secrets: [process.env.COOKIE_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__auth",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secrets: [process.env.COOKIE_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator<User>();

export const setRedirectURL = async (request: Request, redirectTo: string) => {
  const cookies = request.headers.get("cookie");
  const session = await redirectSessionStorage.getSession(cookies);
  session.set("redirectTo", redirectTo);
  addCommitSession(await redirectSessionStorage.commitSession(session));
};

export const getRedirectURL = async (request: Request) => {
  const cookies = request.headers.get("cookie");
  const session = await redirectSessionStorage.getSession(cookies);
  return session.get("redirectTo") as string;
};

export const setUser = async (request: Request, user: User) => {
  const cookies = request.headers.get("cookie");
  const session = await authSessionStorage.getSession(cookies);
  session.set("user", user);
  addCommitSession(await authSessionStorage.commitSession(session));
};

export const getUser = async (request: Request) => {
  const cookies = request.headers.get("cookie");
  const session = await authSessionStorage.getSession(cookies);
  return session.get("user") as Simplify<User>;
};

export const requireAuthentication = async (request: Request) => {
  const user = await getUser(request);

  if (!user) {
    const query = new URLSearchParams({ redirectTo: request.url });
    const queryString = query.toString();
    redirect(`/auth/login?${queryString}`);
  }

  return user;
};

authenticator.use(
  new OAuth2Strategy(
    {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scopes: ["openid", "profile", "email"],
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
      redirectURI: "http://localhost:5173/auth/callback/google",
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async ({ tokens }) => {
      const google = new Google({
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
      redirectURI: "http://localhost:5173/auth/callback/github",
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async (data) => {
      const github = new Github({
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

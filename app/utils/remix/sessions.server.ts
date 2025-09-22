import { createCookieSessionStorage } from "react-router";
import type { User } from "~/utils/authentication/authentication.server";
import { addCommitSession, redirect } from "./utils.server";

/**
 * Session storage for the newsletter subscriber
 */
export const newsletterSubscriberSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__newsletterSubscriber",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secrets: [process.env.COOKIE_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const setNewsletterSubscriber = async (
  request: Request,
  email: string,
) => {
  const cookies = request.headers.get("cookie");
  const session = await authSessionStorage.getSession(cookies);
  session.set("newsletterSubscriber", email);
  addCommitSession(await authSessionStorage.commitSession(session));
};

export const getNewsletterSubscriber = async (request: Request) => {
  const cookies = request.headers.get("cookie");
  const session = await authSessionStorage.getSession(cookies);
  return session.get("newsletterSubscriber") as string;
};

/**
 * Session storage for the redirect URL
 */
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

/**
 * Session storage for the authentication
 */
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

export const setUser = async (request: Request, user: User) => {
  const cookies = request.headers.get("cookie");
  const session = await authSessionStorage.getSession(cookies);
  session.set("user", user);
  addCommitSession(await authSessionStorage.commitSession(session));
};

export const getUser = async (request: Request) => {
  const cookies = request.headers.get("cookie");
  const session = await authSessionStorage.getSession(cookies);
  return session.get("user") as User;
};

export const requireAuthentication = async (request: Request) => {
  const user = await getUser(request);

  if (!user) {
    const url = new URL(request.url);
    const navigating = url.searchParams.get("navigating");
    url.searchParams.delete("navigating");
    const query = new URLSearchParams({
      redirectTo: url.toString(),
      ...(navigating ? { navigating } : {}),
    });
    const queryString = query.toString();
    redirect(`/auth/login?${queryString}`);
  }

  return user;
};

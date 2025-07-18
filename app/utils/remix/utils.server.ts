import { AsyncLocalStorage } from "node:async_hooks";
import { json } from "@remix-run/node";

export const success = <Data>(data: Data) => {
  const headers = new Headers();

  for (const committedSession of getCommittedSessions()) {
    headers.append("set-cookie", committedSession);
  }

  return json(data, { headers });
};

export const redirect = (url: string) => {
  const headers = new Headers();

  for (const committedSession of getCommittedSessions()) {
    headers.append("set-cookie", committedSession);
  }

  headers.append("location", url);

  throw new Response(null, {
    status: 302,
    headers,
  });
};

type LocalStorage = {
  sessionsToCommit: string[];
};

const asyncLocalStorage = new AsyncLocalStorage<LocalStorage>();

export const createContext = <Result>(callback: () => Promise<Result>) => {
  return asyncLocalStorage.run({ sessionsToCommit: [] }, callback);
};

export const addCommitSession = (commit: string) => {
  const store = asyncLocalStorage.getStore();
  if (!store) throw new Error("No store found");
  store.sessionsToCommit.push(commit);
};

export const getCommittedSessions = () => {
  const store = asyncLocalStorage.getStore();
  if (!store) throw new Error("No store found");
  return store.sessionsToCommit;
};

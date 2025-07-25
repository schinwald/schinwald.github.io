import { serverOnly$ } from "vite-env-only/macros";

const importLoader = serverOnly$(async () => {
  const { loader } = await import("./loader");
  return loader;
});

const importAction = serverOnly$(async () => {
  const { action } = await import("./actions");
  return action;
});

export const loader = await importLoader?.();
export const action = await importAction?.();

export * from "./meta";
export { default } from "./page";

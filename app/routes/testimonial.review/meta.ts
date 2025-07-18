import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Review Me" }, { name: "description", content: "" }];
};

import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Page Not Found" },
    { name: "description", content: "" },
  ];
};

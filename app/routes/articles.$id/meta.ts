import type { MetaFunction } from "react-router";
import type { Loader } from "./loader";

export const meta: MetaFunction<Loader> = ({ data }) => {
  return [
    { title: data?.frontmatter.title },
    { name: "description", content: data?.frontmatter.description },
  ];
};

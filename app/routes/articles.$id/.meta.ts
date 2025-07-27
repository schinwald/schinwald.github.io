import type { MetaArgs } from "react-router";

export const meta = ({ data }: MetaArgs) => {
  return [
    { title: data?.frontmatter.title },
    { name: "description", content: data?.frontmatter.description },
  ];
};

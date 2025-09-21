import { getPublicationStatus, getVisibiliy } from "~/utils/date";
import { getMDXBundle } from "~/utils/mdx/mdx.server";
import { loaderHandler } from "~/utils/remix/loader.server";
import { success } from "~/utils/remix/utils.server";

export type TableOfContents = {
  id: string;
  level: number;
  text: string;
};

export const loader = loaderHandler(async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const toc: TableOfContents[] = [];

  const { code, frontmatter, errors } = await getMDXBundle(
    `app/routes/articles.$id/server/mdx/${id}/index.mdx`,
    (tree) => {
      // Generate the table of contents
      for (let node of tree.children) {
        if (node.type === "element" && node.tagName === "section") {
          node = node.children[0];
        }

        if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
          const id = node.properties?.id;
          if (typeof id === "string") {
            toc.push({
              id,
              level: Number.parseInt(node.tagName[1], 10),
              text: node.children
                .filter((child) => child.type === "text")
                .map((child) => child.value)
                .join(""),
            });
          }
        }
      }
    },
  );

  if (!code || !frontmatter || errors.length > 0) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const visibility = getVisibiliy({
    isHidden: Boolean(frontmatter.meta.isHidden),
    publicationStatus: getPublicationStatus(frontmatter.meta.publishedAt),
  });

  if (import.meta.env.PROD && visibility !== "live") {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return success({ code, frontmatter, toc, id });
});

export type Loader = Awaited<typeof loader>;

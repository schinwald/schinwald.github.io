import { eq } from "drizzle-orm";
import { db } from "~/utils/database";
import { articles } from "~/utils/database/schema";
import { increment } from "~/utils/database/utils";
import { getPublicationStatus, getVisibiliy } from "~/utils/date";
import { getMDXBundle } from "~/utils/mdx/mdx.server";
import { loaderHandler } from "~/utils/remix/loader.server";
import { getNewsletterSubscriber } from "~/utils/remix/sessions.server";
import { success } from "~/utils/remix/utils.server";

export type TableOfContents = {
  id: string;
  level: number;
  text: string;
};

export const loader = loaderHandler(async ({ params, request }) => {
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

  const { views, likes } = (
    await db
      .update(articles)
      .set({ views: increment(articles.views) })
      .where(eq(articles.articleId, frontmatter.id))
      .returning({ views: articles.views, likes: articles.likes })
      .catch(() => {
        throw new Response(null, {
          status: 404,
          statusText: "Not Found",
        });
      })
  )[0];

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

  const newsletterSubscriber = await getNewsletterSubscriber(request);

  return success({
    code,
    frontmatter,
    toc,
    newsletterSubscriber,
    id: frontmatter.id,
    views,
    likes,
  });
});

export type Loader = Awaited<typeof loader>;

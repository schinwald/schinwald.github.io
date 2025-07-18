import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  getPublicationStatus,
  getVisibiliy,
  sortByRecentAscending,
} from "~/utils/date";
import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ json }) => {
  const files = await fs
    .readdir(path.join(process.cwd(), "/app/routes/articles.$id/mdx"))
    .then((files) => files.filter((file) => !file.startsWith(".")));

  let articles: Record<string, any>[] = [];
  for (const file of files) {
    const filePath = path.join(
      process.cwd(),
      `/app/routes/articles.$id/mdx/${file}/index.mdx`,
    );
    const fileContents = await fs.readFile(filePath);
    const { data } = matter(fileContents);
    articles.push({ id: file, ...data });
  }

  articles = articles
    .filter((article) => {
      const visibility = getVisibiliy({
        isHidden: Boolean(article.meta.isHidden),
        publicationStatus: getPublicationStatus(article.meta.publishedAt),
      });

      if (import.meta.env.PROD && visibility !== "published") {
        return false;
      }

      return true;
    })
    .sort((a, b) =>
      sortByRecentAscending(a.meta.publishedAt, b.meta.publishedAt),
    );

  return json({ articles });
});

export type Loader = Awaited<typeof loader>;

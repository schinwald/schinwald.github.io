import {
  getPublicationStatus,
  getVisibiliy,
  sortByRecentAscending,
} from "~/utils/date";
import { getArticles } from "~/utils/mdx/mdx.server";
import { loaderHandler } from "~/utils/remix/loader.server";
import { getNewsletterSubscriber } from "~/utils/remix/sessions.server";
import { success } from "~/utils/remix/utils.server";

export const loader = loaderHandler(async ({ request }) => {
  const articles = (await getArticles())
    .filter((article) => {
      const visibility = getVisibiliy({
        isHidden: Boolean(article.meta.isHidden),
        publicationStatus: getPublicationStatus(article.meta.publishedAt),
      });

      if (import.meta.env.PROD && visibility !== "live") {
        return false;
      }

      return true;
    })
    .sort((a, b) =>
      sortByRecentAscending(a.meta.publishedAt, b.meta.publishedAt),
    );

  const newsletterSubscriber = await getNewsletterSubscriber(request);

  return success({ articles, newsletterSubscriber });
});

export type Loader = Awaited<typeof loader>;

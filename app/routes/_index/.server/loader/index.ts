import { testimonials as testimonialModel } from "database/schema";
import { db } from "~/utils/database/index";
import { sortByRecentAscending } from "~/utils/date";
import { fillData, randomlyFillData } from "~/utils/helpers";
import { getArticles } from "~/utils/mdx/mdx.server";
import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ json }) => {
  const testimonials = await db
    .select({
      fullName: testimonialModel.fullName,
      company: testimonialModel.company,
      occupation: testimonialModel.occupation,
      review: testimonialModel.review,
      rating: testimonialModel.rating,
      avatar: testimonialModel.avatar,
    })
    .from(testimonialModel);

  const articles = (await getArticles())
    .filter((article) => article.meta.isFeatured)
    .sort((a, b) =>
      sortByRecentAscending(a.meta.publishedAt, b.meta.publishedAt),
    );

  const response = {
    meta: {
      status: 200,
    },
    data: {
      articles: fillData(articles, 4),
      testimonials: randomlyFillData(testimonials, 30),
      googleReCAPTCHASiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    },
  };

  return json(response);
});

export type Loader = Awaited<typeof loader>;

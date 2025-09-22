import { eq } from "drizzle-orm";
import { db } from "~/utils/database";
import { articles } from "~/utils/database/schema";
import { increment } from "~/utils/database/utils";
import { actionHandler } from "~/utils/remix/action.server";
import { success } from "~/utils/remix/utils.server";
import { validators } from "../../schemas/actions/like-article";

export const action = actionHandler({ validators }, async ({ formData }) => {
  await db
    .update(articles)
    .set({
      likes: increment(articles.likes),
    })
    .where(eq(articles.articleId, formData.id))
    .catch(() => {
      throw new Response(null, {
        status: 500,
        statusText: "Unable to like the article",
      });
    });

  return success({ data: [] });
});

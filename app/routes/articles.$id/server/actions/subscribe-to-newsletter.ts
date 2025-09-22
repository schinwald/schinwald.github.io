import { db } from "~/utils/database";
import { newsletterSubscribers } from "~/utils/database/schema";
import { actionHandler } from "~/utils/remix/action.server";
import { setNewsletterSubscriber } from "~/utils/remix/sessions.server";
import { success } from "~/utils/remix/utils.server";
import { validators } from "../../schemas/actions/subscribe-to-newsletter";

export const action = actionHandler(
  { validators },
  async ({ formData, request }) => {
    await db
      .insert(newsletterSubscribers)
      .values({
        email: formData.email,
      })
      .onConflictDoNothing();

    await setNewsletterSubscriber(request, formData.email);

    return success({ data: [] });
  },
);

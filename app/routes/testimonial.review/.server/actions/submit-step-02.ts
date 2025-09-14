import { z } from "zod";
import { getUser } from "~/utils/authentication/authentication.server";
import { db } from "~/utils/database";
import { testimonials } from "~/utils/database/schema";
import { actionHandler } from "~/utils/remix/action.server";

export const action = actionHandler(
  {
    validators: {
      formData: z.object({
        rating: z.coerce.number().min(0).max(5),
        review: z.string(),
      }),
    },
  },
  async ({ formData, request }) => {
    const user = await getUser(request);

    const data = {
      email: user.email,
      rating: formData.rating,
      review: formData.review,
    };

    await db.insert(testimonials).values(data).onConflictDoUpdate({
      target: testimonials.email,
      set: data,
    });

    return {
      data: [],
    };
  },
);

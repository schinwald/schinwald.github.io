import { eq } from "drizzle-orm";
import { requireAuthentication } from "~/utils/authentication/authentication.server";
import { db } from "~/utils/database";
import { testimonials } from "~/utils/database/schema";
import { loaderHandler } from "~/utils/remix/loader.server";
import { success } from "~/utils/remix/utils.server";

export const loader = loaderHandler(async ({ request }) => {
  const user = await requireAuthentication(request);

  const [testimonial] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.email, user.email));

  return success({
    user: user,
    testimonial: testimonial ?? {},
  });
});

export type Loader = Awaited<typeof loader>;

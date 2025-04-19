import { redirect } from "@remix-run/node";
import { DatabaseManagementSystem } from "~/utils/database";
import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ request, json }) => {
	// async function extractSession() {
	//   if (['development'].includes(import.meta.env.APP_ENVIRONMENT)) {
	//     return {} as Record<string, any>
	//   } else {
	//     return await getSession(Astro.request);
	//   }
	// }

	// const session = await extractSession()

	// if (!session) {
	//   return Astro.redirect('/sign-in?redirect=/testimonial/review')
	// }

	// const user = {
	//   full_name: session.user?.name ?? undefined,
	//   avatar: session.user?.image?.replace?.('=s96-c', '') ?? undefined
	// }

	const dbms = new DatabaseManagementSystem({ request });
	dbms.initialize();

	// Grab session
	let session;
	{
		const response = await dbms.getSession();

		if (response.errors) {
			const url = new URL(request.url);
			url.pathname = "/auth/login";
			url.searchParams.set("redirect", url.pathname);
			return redirect(url.pathname + url.search);
		}

		session = response.data.session;
	}

	return json({
		user: session.user,
	});
});

export type Loader = Awaited<typeof loader>;

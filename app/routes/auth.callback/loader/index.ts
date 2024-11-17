import { redirect } from "@remix-run/react";
import { DatabaseManagementSystem } from "~/utils/database";
import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ request }) => {
	const errors: Record<string, any> = [];

	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code") ?? "";
	const next = requestUrl.searchParams.get("next") ?? "/";

	const dbms = new DatabaseManagementSystem({ request });

	const { headers, dbClient } = dbms.initialize();

	const { error } = await dbClient.auth.exchangeCodeForSession(code);
	if (error) throw Error("Failed to exchange code for session");

	return redirect(next, { headers });
});

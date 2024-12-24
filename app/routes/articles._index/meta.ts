import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [{ title: "Articles" }, { name: "description", content: "" }];
};

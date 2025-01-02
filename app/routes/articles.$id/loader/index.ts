import { loaderHandler } from "~/utils/remix/loader.server";
import { getMDXBundle } from "~/utils/mdx/mdx.server";
import * as _ from "radashi";

type TableOfContents = {
	id: string;
	level: number;
	text: string;
};

export const loader = loaderHandler(async ({ params, json }) => {
	const { id } = params;
	if (!id) {
		throw new Response("Article id is required", { status: 404 });
	}

	const toc: TableOfContents[] = [];

	const bundle = await getMDXBundle(
		`app/routes/articles.$id/mdx/${id}/index.mdx`,
		(tree) => {
			// Generate the table of contents
			tree.children.forEach((node) => {
				if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
					const id = node.properties?.id;
					if (typeof id === "string") {
						toc.push({
							id,
							level: parseInt(node.tagName[1], 10),
							text: _.title(
								node.children
									.filter((child) => child.type === "text")
									.map((child) => child.value)
									.join(""),
							),
						});
					}
				}
			});
		},
	);

	return json({ ...bundle, toc, id });
});

export type Loader = Awaited<typeof loader>;

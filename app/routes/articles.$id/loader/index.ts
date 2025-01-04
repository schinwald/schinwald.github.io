import { loaderHandler } from "~/utils/remix/loader.server";
import { getMDXBundle } from "~/utils/mdx/mdx.server";
import * as _ from "radashi";
import { getPublicationStatus, getVisibiliy, safeParseISO } from "~/utils/date";
import { redirect } from "@remix-run/react";

type TableOfContents = {
	id: string;
	level: number;
	text: string;
};

export const loader = loaderHandler(async ({ params, json }) => {
	const { id } = params;
	if (!id) {
		throw new Response(null, {
			status: 404,
			statusText: "Not Found",
		});
	}

	const toc: TableOfContents[] = [];

	const { code, frontmatter, errors } = await getMDXBundle(
		`app/routes/articles.$id/mdx/${id}/index.mdx`,
		(tree) => {
			// TODO: remove foreach since it's slow
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

	if (!code || !frontmatter || errors.length > 0) {
		throw new Response(null, {
			status: 404,
			statusText: "Not Found",
		});
	}

	const visibility = getVisibiliy({
		isHidden: Boolean(frontmatter.meta.isHidden),
		publicationStatus: getPublicationStatus(frontmatter.meta.publishedAt),
	});

	if (import.meta.env.PROD && visibility !== "published") {
		throw new Response(null, {
			status: 404,
			statusText: "Not Found",
		});
	}

	return json({ code, frontmatter, toc, id });
});

export type Loader = Awaited<typeof loader>;

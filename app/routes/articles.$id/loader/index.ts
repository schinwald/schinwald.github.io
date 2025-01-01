import { loaderHandler } from "~/utils/remix/loader.server";
import { bundleMDX } from "mdx-bundler";
import path from "node:path";
import { fileURLToPath } from "node:url";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import type { Root, ElementContent } from "hast";
import { match, P } from "ts-pattern";

const isEONET = (error: unknown): error is NodeJS.ErrnoException => {
	if (typeof error !== "object") return false;
	if (error === null) return false;
	if (!("code" in error)) return false;
	if (error.code !== "ENOENT") return false;
	return true;
};

const globals = {
	"@mdx-js/react": {
		varName: "MdxJsReact",
		namedExports: ["useMDXComponents"],
		defaultExport: false,
	},
};

// Rehype Plugin to Transform Callouts
function rehypeCode() {
	return (tree: Root) => {
		visit(tree, (node) => {
			if (node.type === "element" && node.tagName === "code") {
				const child = node.children[0];
				if (child.type !== "text") return;
				child.value = child.value.replace(/\n$/, "");
				const language = match(node.properties)
					.with({ className: P.array(P.string) }, ({ className }) =>
						className[0].replace("language-", ""),
					)
					.otherwise(() => null);

				node.properties = {
					language,
				};
			}
		});
	};
}

// Rehype Plugin to Transform Callouts
function rehypeCallouts() {
	return (tree: Root) => {
		visit(tree, (node, index, parent) => {
			if (parent === undefined) return;
			if (index === undefined) return;

			if (node.type === "element" && node.tagName === "blockquote") {
				const callout = match(node.children[1])
					.with({ type: "element", tagName: "p" }, (child) => {
						return match(child.children[0])
							.with(
								{
									type: "text",
									value: P.when((value) => value.startsWith("[!")),
								},
								({ value }) => {
									const matching = value.match(/^\[!(\w+)\](-?) (.+)/);
									if (!matching) return null;

									const [, type, collapsableCharacter, title] = matching;
									const description = value.split("\n").slice(1).join("\n");

									return {
										type: "element",
										tagName: "callout",
										properties: {
											type,
											title,
											isCollapsable: collapsableCharacter === "-",
										},
										children: [
											{
												type: "text",
												value: description,
											},
										],
									} satisfies ElementContent;
								},
							)
							.otherwise(() => null);
					})
					.otherwise(() => null);

				if (!callout) return;

				// Replace the blockquote with a "callout" element
				parent.children[index] = callout;
			}
		});
	};
}

export const loader = loaderHandler(async ({ params, json }) => {
	if (!params.id) {
		throw new Response("Article id is required", { status: 404 });
	}

	const toc: {
		id: string | number | boolean | (string | number)[];
		level: number;
		text: React.ReactNode;
	}[] = [];

	// Custom plugin to extract headers with `id` for the TOC
	const extractHeaders = () => {
		return (tree: Root) => {
			tree.children.forEach((node) => {
				if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
					const id = node.properties?.id;
					if (id) {
						toc.push({
							id,
							level: parseInt(node.tagName[1], 10),
							text: node.children
								.filter((child) => child.type === "text")
								.map((child) => child.value)
								.join(""),
						});
					}
				}
			});
		};
	};

	let result;
	try {
		result = await bundleMDX({
			globals,
			mdxOptions(options) {
				options.providerImportSource = "@mdx-js/react";
				options.rehypePlugins = [
					...(options.rehypePlugins || []),
					rehypeSlug, // Generates `id` attributes for headers
					rehypeCode,
					rehypeCallouts,
					extractHeaders, // Extract headers into the `toc` array
				];
				return options;
			},
			file: path.join(
				process.cwd(),
				`app/routes/articles.$id/mdx/${params.id}/index.mdx`,
			),
			cwd: path.dirname(fileURLToPath(import.meta.url)),
		});
	} catch (error) {
		if (isEONET(error)) {
			throw new Response("Unable to find article", { status: 404 });
		}

		throw error;
	}

	return json({ ...result, toc });
});

export type Loader = Awaited<typeof loader>;

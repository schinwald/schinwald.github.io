import { loaderHandler } from "~/utils/remix/loader.server";
import { bundleMDX } from "mdx-bundler";
import path from "node:path";
import { fileURLToPath } from "node:url";
import rehypeSlug from "rehype-slug";
import { Root } from "node_modules/rehype-slug/lib";

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

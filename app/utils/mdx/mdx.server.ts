import rehypeSlug from "rehype-slug";
import { rehypeListItem } from "./rehype-listitems.server";
import { rehypeCallouts } from "./rehype-callouts.server";
import { rehypeCode } from "./rehype-code.server";
import { bundleMDX } from "mdx-bundler";
import { Root } from "hast";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Message } from "esbuild";

// Check if the error is from an "error no entity"
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

type BundlerCallback = (tree: Root) => void;

// Generates the bundle from an MDX file and uses a bunch of plugins to configure it
export const getMDXBundle = async (file: string, callback: BundlerCallback) => {
	try {
		return await bundleMDX({
			globals,
			mdxOptions(options) {
				options.providerImportSource = "@mdx-js/react";
				options.rehypePlugins = [
					...(options.rehypePlugins || []),
					rehypeSlug,
					rehypeListItem,
					rehypeCode,
					rehypeCallouts,
					() => callback,
				];
				return options;
			},
			file: path.join(process.cwd(), file),
			cwd: path.dirname(fileURLToPath(import.meta.url)),
		});
	} catch (error) {
		return {
			code: null,
			frontmatter: null,
			errors: [
				{
					id: "none",
					pluginName: "custom",
					text: "something went wrong",
					location: null,
					notes: [],
					detail: "something went wrong",
				},
			] satisfies Message[],
		};
	}
};

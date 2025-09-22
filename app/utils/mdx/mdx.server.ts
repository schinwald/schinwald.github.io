import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import rehypeSectionize from "@hbsnow/rehype-sectionize";
import type { Message } from "esbuild";
import matter from "gray-matter";
import type { Root } from "hast";
import { bundleMDX } from "mdx-bundler";
import rehypeSlug from "rehype-slug";
import z from "zod";
import { rehypeCallouts } from "./rehype-callouts.server";
import { rehypeCode } from "./rehype-code.server";
import { rehypeListItem } from "./rehype-listitems.server";

const globals = {
  "@mdx-js/react": {
    varName: "MdxJsReact",
    namedExports: ["useMDXComponents"],
    defaultExport: false,
  },
};

type BundledMDX<F> = {
  code: string | null;
  frontmatter: F | null;
  errors: Message[];
};

type BundlerCallback = (tree: Root) => void;

// Generates the bundle from an MDX file and uses a bunch of plugins to configure it
export const getMDXBundle = async (file: string, callback: BundlerCallback) => {
  try {
    return (await bundleMDX({
      globals,
      mdxOptions(options) {
        options.providerImportSource = "@mdx-js/react";
        options.rehypePlugins = [
          ...(options.rehypePlugins || []),
          rehypeSlug,
          rehypeSectionize,
          rehypeListItem,
          rehypeCode,
          rehypeCallouts,
          () => callback,
        ];
        return options;
      },
      file: path.join(process.cwd(), file),
      cwd: path.dirname(fileURLToPath(import.meta.url)),
    })) as BundledMDX<unknown> as BundledMDX<Frontmatter>;
  } catch (_error) {
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
      ],
    } satisfies BundledMDX<Frontmatter>;
  }
};

// TODO: use this for validating in ci
export const schema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  meta: z.object({
    tags: z.array(z.string()),
    publishedAt: z.string(),
    isHidden: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    readingTime: z.string().optional(),
  }),
});

export type Frontmatter = z.infer<typeof schema>;

export const valiateArticles = async () => {
  const articles = await getArticles();

  const validations = [];
  for (const article of articles) {
    validations.push(schema.parseAsync(article));
  }

  await Promise.all(validations);
};

export const getArticles = async () => {
  const files = await fs
    .readdir(path.join(process.cwd(), "/app/routes/articles.$id/server/mdx"))
    .then((files) => files.filter((file) => !file.startsWith(".")));

  const articles: Frontmatter[] = [];
  for (const file of files) {
    const filePath = path.join(
      process.cwd(),
      `/app/routes/articles.$id/server/mdx/${file}/index.mdx`,
    );
    const fileContents = await fs.readFile(filePath);
    const { data } = matter(fileContents);
    articles.push(data as Frontmatter);
  }

  return articles;
};

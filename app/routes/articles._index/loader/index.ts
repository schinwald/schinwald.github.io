import { loaderHandler } from "~/utils/remix/loader.server";
import matter from "gray-matter";
import path from "node:path";
import fs from "node:fs/promises";

export const loader = loaderHandler(async ({ request, json }) => {
	const files = await fs
		.readdir(path.join(process.cwd(), "/app/routes/articles.$id/mdx"))
		.then((files) => files.filter((file) => !file.startsWith(".")));

	const articles: Record<string, any>[] = [];
	for (const file of files) {
		const filePath = path.join(
			process.cwd(),
			`/app/routes/articles.$id/mdx/${file}/index.mdx`,
		);
		const fileContents = await fs.readFile(filePath);
		const { data } = matter(fileContents);
		articles.push({ id: file, ...data });
	}

	return json({ articles });
});

export type Loader = Awaited<typeof loader>;

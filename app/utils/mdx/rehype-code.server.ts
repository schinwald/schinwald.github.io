import type { Root } from "hast";
import { P, match } from "ts-pattern";
import { visit } from "unist-util-visit";

// Rehype plugin to transform code blocks
export function rehypeCode() {
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

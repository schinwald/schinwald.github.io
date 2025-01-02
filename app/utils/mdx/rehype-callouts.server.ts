import type { Root, ElementContent } from "hast";
import { match, P } from "ts-pattern";
import { visit } from "unist-util-visit";

// Rehype Plugin to Transform Callouts
export function rehypeCallouts() {
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

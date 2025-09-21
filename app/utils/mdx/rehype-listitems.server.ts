import type { ElementContent, Root } from "hast";
import { visit } from "unist-util-visit";

// Rehype plugin to transform list items
export function rehypeListItem() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (parent === undefined) return;
      if (index === undefined) return;

      if (node.type === "element" && node.tagName === "li") {
        const newChildren = [];
        for (const child of node.children) {
          // Add raw text nodes
          // This is used when there is no nested lists
          if (child.type === "text") {
            if (child.value === "\n") {
              continue;
            }

            // This is checking for the "[x] task" patterns
            const matching = child.value.match(/^\[(x| )\] (.+)/);

            // Matches the checklist item
            if (matching) {
              const [, checkedCharacter, text] = matching;
              newChildren.push({
                type: "element",
                tagName: "p",
                properties: {},
                children: [
                  {
                    type: "text",
                    value: text,
                  },
                ],
              } satisfies ElementContent);
              node.tagName = "checklist-item";
              node.properties = {
                isChecked: checkedCharacter === "x",
              };
              continue;
            }

            // No match means it's a regular list item
            newChildren.push({
              type: "element",
              tagName: "p",
              properties: {},
              children: [child],
            } satisfies ElementContent);
            continue;
          }

          // Add blockquote elements
          // This is used for arrow items
          if (child.type === "element" && child.tagName === "blockquote") {
            // Replace blockquote parent with its children
            newChildren.push({
              type: "element",
              tagName: "p",
              properties: {},
              children: child.children,
            } satisfies ElementContent);
            node.tagName = "arrow-item";
            continue;
          }

          // Add paragraph elements
          // This is used when there is a nested list inside the list item
          if (child.type === "element" && child.tagName === "p") {
            const newGrandChildren = [];
            for (const grandChild of child.children) {
              if (grandChild.type === "text") {
                if (grandChild.value === "\n") {
                  continue;
                }

                // This is checking for the "[x] task" patterns
                const matching = grandChild.value.match(/^\[(x| )\] (.+)/);

                // Matches the checklist item
                if (matching) {
                  const [, checkedCharacter, text] = matching;
                  newGrandChildren.push({
                    type: "text",
                    value: text,
                  } satisfies ElementContent);
                  node.tagName = "checklist-item";
                  node.properties = {
                    isChecked: checkedCharacter === "x",
                  };
                  continue;
                }

                newGrandChildren.push(grandChild);
                continue;
              }

              // We can leave everything else untouched
              newGrandChildren.push(grandChild);
            }

            // Add the processed grand children back to the child
            child.children = newGrandChildren;
          }

          // We can leave everything else untouched
          newChildren.push(child);
        }

        // Add the processed children back to the node
        node.children = newChildren;
        parent.children[index] = node;
      }
    });
  };
}

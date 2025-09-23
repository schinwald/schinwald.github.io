import { Highlight, type PrismTheme } from "prism-react-renderer";
import type React from "react";
import type { PropsWithChildren } from "react";
import { Copy } from "~/components/copy";
import { cn } from "~/utils/classname";

type CodeProps = {
  className?: string;
  filename?: string;
  language?: string;
};

const eldritchTheme: PrismTheme = {
  plain: {
    backgroundColor: "#212337", // Sunken Depths
    color: "#ebfafa", // Lighthouse White
    // fontSize: 14,
    // lineHeight: 1.4,
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#7081d0" },
    }, // Old One Purple
    {
      types: ["punctuation", "operator", "selector"],
      style: { color: "#ebfafa" },
    }, // Lighthouse White
    { types: ["tag", "boolean"], style: { color: "#f7c67f" } }, // Dreaming Orange
    { types: ["string", "attr-value", "hex"], style: { color: "#04d1f9" } }, // Watery Tomb Blue
    {
      types: ["property", "keyword", "entity", "attr-name", "url"],
      style: { color: "#37f499" },
    }, // Great Old One Green
    { types: ["regex"], style: { color: "#f265b5" } }, // Pustule Pink
    { types: ["function", "constant"], style: { color: "#f7c67f" } }, // Dreaming Orange
    { types: ["variable"], style: { color: "#ebfafa" } }, // Lighthouse White
    { types: ["number"], style: { color: "#37f499" } }, // Great Old One Green
    {
      types: ["important", "maybe-class-name"],
      style: { color: "#f265b5", fontWeight: "bold" },
    },
  ],
};

const Code: React.FC<PropsWithChildren<CodeProps>> = ({
  className,
  children,
  filename,
  language,
}) => {
  const code = children?.toString() ?? "";

  return (
    <Highlight theme={eldritchTheme} code={code} language={language ?? ""}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div className="grid">
          <div className="col-span-full row-span-full flex items-start justify-end px-5 py-4">
            <div className="sticky top-4">
              <Copy clipboard={code} />
            </div>
          </div>
          <pre
            className={cn(
              "col-span-full row-span-full rounded-md border-white px-5 py-4 text-md shadow-black/20 shadow-lg",
              className,
            )}
            style={style}
          >
            {filename ? (
              <div className="mb-4">
                <span className="border-b">{filename}</span>
              </div>
            ) : null}
            {tokens.map((line, i) => {
              const lineKey = `line-${i}`;
              return (
                <div key={lineKey} {...getLineProps({ line })}>
                  {line.map((token, key) => {
                    const tokenKey = `token-${key}`;
                    return (
                      <span key={tokenKey} {...getTokenProps({ token })} />
                    );
                  })}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export { Code };

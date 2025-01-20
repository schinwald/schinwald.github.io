import { Highlight, themes } from "prism-react-renderer";
import type React from "react";
import type { PropsWithChildren } from "react";
import { MdCopyAll as CopyIcon } from "react-icons/md";
import { Button } from "./primitives/ui/button";

type CodeProps = {
	filename?: string;
	language?: string;
};

const Code: React.FC<PropsWithChildren<CodeProps>> = ({
	children,
	filename,
	language,
}) => {
	const code = children?.toString() ?? "";

	return (
		<Highlight
			theme={themes.shadesOfPurple}
			code={code}
			language={language ?? ""}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<div className="grid">
					<div className="col-span-full row-span-full px-5 py-4 flex items-start justify-end">
						<div className="sticky top-4">
							<Button
								variant="ghost"
								size="minimal"
								className="size-5"
								onClick={() => {
									navigator.clipboard.writeText(code);
								}}
							>
								<CopyIcon className="size-5" />
							</Button>
						</div>
					</div>
					<pre
						className="col-span-full row-span-full border-white rounded-md px-5 py-4 text-md"
						style={style}
					>
						{filename ? (
							<div className="mb-4">
								<span className="border-b">{filename}</span>
							</div>
						) : null}
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				</div>
			)}
		</Highlight>
	);
};

export { Code };

import { type PropsWithChildren, createElement } from "react";

type HeaderProps = PropsWithChildren<
	React.HTMLAttributes<HTMLHeadingElement>
> & {
	type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Header: React.FC<HeaderProps> = ({ children, type, ...props }) => {
	return createElement(
		type,
		{
			className: "group inline-flex items-center",
			...props,
		},
		<>
			{children}
			<a
				href={`#${props.id}`}
				className="ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
			>
				#
			</a>
		</>,
	);
};

import type React from "react";

type UnderConstructionProps = {
	className?: string;
};

const UnderConstruction: React.FC<UnderConstructionProps> = ({ className }) => {
	return (
		<div className="text-foreground flex flex-col w-full h-full justify-center items-center gap-2">
			<h2>Under Construction</h2>
			<p>Please come back at another time.</p>
		</div>
	);
};

export { UnderConstruction };

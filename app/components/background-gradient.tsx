import type React from "react";

const BackgroundGradient: React.FC = () => {
	return (
		<div className="pointer-events-none">
			<div className="fixed -z-40 top-0 left-0 right-0 bottom-0 opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,1)0%,rgba(0,212,255,0)100%)]" />
			<div className="fixed -z-50 top-0 left-0 right-0 bottom-0 bg-background" />
		</div>
	);
};

export { BackgroundGradient };

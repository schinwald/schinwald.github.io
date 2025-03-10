import type React from "react";

const BackgroundGradient: React.FC = () => {
	return (
		<div className="pointer-events-none">
			<div className="fixed -z-40 top-0 left-0 right-0 bottom-0 opacity-40 bg-[radial-gradient(circle,rgba(255,255,255,0.1)0%,rgba(0,0,0,1)100%),url('/assets/images/noise.svg')]" />
			<div className="fixed -z-50 top-0 left-0 right-0 bottom-0 bg-background" />
		</div>
	);
};

export { BackgroundGradient };

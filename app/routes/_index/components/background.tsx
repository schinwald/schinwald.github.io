import backgroundSoftSVG from "~/assets/images/background-soft.svg";

export const Background = () => (
	<div
		className="absolute top-0 left-0 bottom-0 right-0 -z-30 bg-background-soft flex flex-row justify-center pointer-events-none"
		style={{
			backgroundImage: `url(${backgroundSoftSVG})`,
			backgroundSize: "30%",
			backgroundRepeat: "repeat",
		}}
	>
		<div className="bg-gradient-to-r from-transparent to-background-soft w-[100px] h-full" />
		<div className="bg-background-soft w-full max-w-screen-md h-full" />
		<div className="bg-gradient-to-r from-background-soft to-transparent w-[100px] h-full" />
	</div>
);

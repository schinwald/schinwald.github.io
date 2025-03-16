import backgroundSoftSVG from "~/assets/images/background-soft.svg";

export const Background = () => (
	<div
		className="absolute top-0 left-0 bottom-0 right-0 -z-30 bg-background-soft flex flex-row justify-center pointer-events-none bg-[url('assets/images/noise.svg')] bg-no-repeat bg-cover overflow-clip"
		style={{
			backgroundImage: `url(${backgroundSoftSVG})`,
			backgroundSize: "30%",
			backgroundRepeat: "repeat",
		}}
	>
		<div className="bg-gradient-to-r from-transparent to-background-soft w-[500px] h-full" />
		<div className="bg-background-soft w-full max-w-screen-md h-full" />
		<div className="bg-gradient-to-l from-transparent to-background-soft w-[500px] h-full" />
	</div>
);

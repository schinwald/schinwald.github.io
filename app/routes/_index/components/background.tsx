import backgroundSoftSVG from "~/assets/images/background-soft.svg";

export const Background = () => (
  <div
    className="-z-30 pointer-events-none absolute top-0 right-0 bottom-0 left-0 flex flex-row justify-center overflow-clip bg-[url('assets/images/noise.svg')] bg-background-soft bg-cover bg-no-repeat"
    style={{
      backgroundImage: `url(${backgroundSoftSVG})`,
      backgroundSize: "30%",
      backgroundRepeat: "repeat",
    }}
  >
    <div className="h-full w-[500px] bg-linear-to-r from-transparent to-background-soft" />
    <div className="h-full w-full max-w-(--breakpoint-md) bg-background-soft" />
    <div className="h-full w-[500px] bg-linear-to-l from-transparent to-background-soft" />
  </div>
);

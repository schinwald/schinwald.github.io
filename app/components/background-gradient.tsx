import type React from "react";

const BackgroundGradient: React.FC = () => {
  return (
    <div className="pointer-events-none">
      <div className="-z-40 fixed top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)0%,rgba(20,20,20,1)100%),url('/assets/images/noise.svg')] opacity-30" />
      <div className="-z-50 fixed top-0 right-0 bottom-0 left-0 bg-black" />
    </div>
  );
};

export { BackgroundGradient };

import { useState } from "react";
import { Button } from "~/components/primitives/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/primitives/ui/carousel";

type EducationProps = {
  logo: {
    url: string;
    alt: string;
  };
  provider: string;
  certificate: string;
  dates: [string, string];
  location: string;
};

export const Education: React.FC<EducationProps> = ({
  logo,
  provider,
  certificate,
  dates,
  location,
}) => {
  const [api, setApi] = useState<CarouselApi>();

  // TODO: make this like the experience component
  return (
    <Carousel setApi={setApi} opts={{ loop: true }} orientation="horizontal">
      <Button
        className="transition-all duration-200 outline-1 outline-[#fff2] hover:outline-[#fff7] p-3 rounded-sm flex flex-row items-start gap-2 max-h-[58px] whitespace-normal h-full"
        variant="ghost"
        onClick={() => api?.scrollNext()}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            api?.scrollNext();
          }
        }}
      >
        <img className="w-8" src={logo.url} alt={logo.alt} />
        <div className="flex flex-col gap-6">
          <CarouselContent>
            <CarouselItem>
              <div className="flex flex-col justify-between h-8 py-[2px]">
                <h6 className="text-left text-md font-bold opacity-75">
                  {provider}
                </h6>
                <p className="text-left text-sm font-thin">{certificate}</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col justify-between h-8 py-[2px]">
                <h6 className="text-left text-md font-bold opacity-75">
                  {location}
                </h6>
                <p className="text-left text-sm font-thin">
                  {dates[0]} - {dates[1]}
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
        </div>
      </Button>
    </Carousel>
  );
};

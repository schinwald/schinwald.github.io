import { type PropsWithChildren, useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/primitives/ui/carousel";

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api) {
      console.log(api.scrollSnapList());
    }
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} orientation="horizontal">
      <CarouselContent onClick={() => api?.scrollNext()}>
        {children}
      </CarouselContent>
    </Carousel>
  );
};

const Item: React.FC<PropsWithChildren> = ({ children }) => {
  return <CarouselItem>{children}</CarouselItem>;
};

export const Cycler = { Root, Item };

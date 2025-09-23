import { Cycler } from "./cycler";

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
  return (
    <div className="flex cursor-pointer flex-row items-start gap-2 rounded-sm p-3 outline-1 outline-[#fff2] transition-all duration-200 hover:outline-[#fff7]">
      <img className="size-9" src={logo.url} alt={logo.alt} />
      <div className="flex flex-col gap-6">
        <Cycler.Root>
          <Cycler.Item>
            <div className="flex h-9 flex-col justify-between py-[2px]">
              <h6 className="text-left font-bold text-md opacity-75">
                {provider}
              </h6>
              <p className="text-left font-thin text-sm">{certificate}</p>
            </div>
          </Cycler.Item>
          <Cycler.Item>
            <div className="flex h-9 flex-col justify-between py-[2px]">
              <h6 className="text-left font-bold text-md opacity-75">
                {location}
              </h6>
              <p className="text-left font-thin text-sm">
                {dates[0]} - {dates[1]}
              </p>
            </div>
          </Cycler.Item>
        </Cycler.Root>
      </div>
    </div>
  );
};

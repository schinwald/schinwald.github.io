import { Cycler } from "./cycler";

type ExperienceProps = {
  logo: {
    url: string;
    alt: string;
  };
  company: string;
  occupation: string;
  dates: [string, string];
  location: string;
};

export const Experience: React.FC<ExperienceProps> = ({
  logo,
  company,
  occupation,
  dates,
  location,
}) => {
  return (
    <div className="flex cursor-pointer flex-row items-start gap-2 rounded-sm p-3 outline-1 outline-[#fff2] transition-all duration-200 hover:outline-[#fff6] hover:shadow-md">
      <img
        className="size-9 rounded-sm shadow-lg"
        src={logo.url}
        alt={logo.alt}
      />
      <div className="flex flex-col gap-6">
        <Cycler.Root>
          <Cycler.Item>
            <div className="flex h-9 flex-col justify-around gap-1 py-[2px]">
              <h6 className="text-left font-bold text-md text-shadow-lg">
                {company}
              </h6>
              <p className="text-left font-thin text-sm">{occupation}</p>
            </div>
          </Cycler.Item>
          <Cycler.Item>
            <div className="flex h-9 flex-col justify-around gap-1 py-[2px]">
              <h6 className="text-left font-bold text-md text-shadow-lg">
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

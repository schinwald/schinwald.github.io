import * as Cycler from "./cycler";

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
    <div className="transition-all duration-200 outline-1 outline-[#fff2] hover:outline-[#fff7] p-3 rounded-sm flex flex-row items-start gap-2 cursor-pointer">
      <img className="size-9" src={logo.url} alt={logo.alt} />
      <div className="flex flex-col gap-6">
        <Cycler.Root>
          <Cycler.Item>
            <div className="flex flex-col justify-between h-9 py-[2px]">
              <h6 className="text-left text-md font-bold opacity-75">
                {company}
              </h6>
              <p className="text-left text-sm font-thin">{occupation}</p>
            </div>
          </Cycler.Item>
          <Cycler.Item>
            <div className="flex flex-col justify-between h-9 py-[2px]">
              <h6 className="text-left text-md font-bold opacity-75">
                {location}
              </h6>
              <p className="text-left text-sm font-thin">
                {dates[0]} - {dates[1]}
              </p>
            </div>
          </Cycler.Item>
        </Cycler.Root>
      </div>
    </div>
  );
};

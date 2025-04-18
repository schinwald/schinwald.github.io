import * as Cycler from "./cycler";

type ExperienceProps = {
	logo: {
		url: string;
		alt: string;
	};
	company: string;
	role: string;
	dates: [string, string];
	location: string;
};

export const Experience: React.FC<ExperienceProps> = ({
	logo,
	company,
	role,
	dates,
	location,
}) => {
	return (
		<div className="transition-all duration-200 outline outline-1 outline-[#fff2] hover:outline-[#fff7] p-3 rounded-sm flex flex-row items-start gap-2 max-h-[58px] overflow-hidden cursor-pointer">
			<img className="w-8" src={logo.url} alt={logo.alt} />
			<div className="flex flex-col gap-6">
				<Cycler.Root>
					<Cycler.Item>
						<div className="flex flex-col justify-between h-8 py-[2px]">
							<h6 className="text-md font-bold">{company}</h6>
							<p className="text-sm font-thin">{role}</p>
						</div>
					</Cycler.Item>
					<Cycler.Item>
						<div className="flex flex-col justify-between h-8 py-[2px]">
							<h6 className="text-md font-bold">
								{dates[0]} - {dates[1]}
							</h6>
							<p className="text-sm font-thin">{location}</p>
						</div>
					</Cycler.Item>
				</Cycler.Root>
			</div>
		</div>
	);
};

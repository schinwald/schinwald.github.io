import type React from "react";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";

type TimelineNodeProps = {
	className?: string;
	title: string;
	date: Date;
	description: string;
};

const TimelineNode: React.FC<TimelineNodeProps> = ({
	className,
	title,
	date,
	description,
}) => {
	return (
		<div className={cn("border border-background-soft", className)}>
			<h4>{title}</h4>
			<p>{date.toString()}</p>
			<p>{description}</p>
		</div>
	);
};

type TimelineProps = {
	className?: string;
};

const Timeline: React.FC<TimelineProps> = ({ className }) => {
	return (
		<div
			className={cn(
				"w-screen h-screen bg-background text-foreground",
				className,
			)}
		>
			<Container className="flex flex-col items-center" variant="narrow">
				<h1>My Timeline</h1>
				<TimelineNode
					title="Born"
					date={new Date("1995-07-12T00:00:00")}
					description={`
            blah blah blah
          `}
				/>
				<TimelineNode
					title="Started University"
					date={new Date("2018-09-01T00:00:00")}
					description={`
            blah blah blah
          `}
				/>
				<TimelineNode
					title="Gradudated University"
					date={new Date("2021-12-01T00:00:00")}
					description={`
            blah blah blah
          `}
				/>
				<TimelineNode
					title="First Job"
					date={new Date("2022-06-27T00:00:00")}
					description={`
            blah blah blah
          `}
				/>
			</Container>
		</div>
	);
};

export { Timeline };

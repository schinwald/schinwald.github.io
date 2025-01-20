import type React from "react";
import { Header } from "~/components/header";
import { Project } from "~/components/project";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";

type ProjectsProps = {
	className?: string;
};

const Projects: React.FC<ProjectsProps> = ({ className }) => {
	return (
		<div
			id="projects"
			className={cn(
				"relative w-screen flex flex-row justify-center py-20 -my-20",
				className,
			)}
		>
			<Container variant="narrow">
				<div className="relative w-full max-w-screen-md flex flex-row justify-start">
					<Header
						className="text-left"
						title="Projects"
						align="left"
						variant="cascade"
					/>
				</div>
				<Project
					title="Express Otter"
					justify="left"
					repository="https://github.com/schinwald/express-otter"
					image={{
						url: "https://github.com/schinwald/express-otter/blob/development/logo.png?raw=true",
					}}
				/>
				<Project
					title="Cartera"
					justify="right"
					repository="https://github.com/schinwald/cartera"
					image={{
						url: "https://github.com/schinwald/cartera/blob/main/preview.jpg?raw=true",
					}}
				/>
				<Project
					title="Pets"
					justify="left"
					repository="https://github.com/schinwald/pets"
					image={{
						url: "https://github.com/schinwald/pets/blob/main/preview.webp?raw=true",
					}}
				/>
				<Project
					title="Weather or Not"
					justify="right"
					repository="https://github.com/schinwald/weather-or-not"
					image={{
						url: "https://github.com/schinwald/weather-or-not/blob/main/preview.jpg?raw=true",
					}}
				/>
				<Project
					title="Calculato"
					justify="left"
					repository="https://github.com/schinwald/calculato"
					image={{
						url: "https://github.com/schinwald/calculato/blob/main/preview.png?raw=true",
					}}
				/>
			</Container>
		</div>
	);
};

export { Projects };

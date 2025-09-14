import { useLoaderData } from "@remix-run/react";
import { BackgroundGradient } from "~/components/background-gradient";
import { NavigationProvider } from "~/components/navigation";
import {
	About,
	Background,
	Contact,
	Footer,
	Jumbotron,
	Projects,
	Testimonials,
} from "./components";
import type { Loader } from "./loader";

export default function () {
	const {
		data: { testimonials },
	} = useLoaderData<Loader>();

	return (
		<NavigationProvider>
			<div>
				<section className="h-screen text-foreground">
					<Jumbotron />
				</section>
				<main className="relative flex flex-col justify-center items-center overflow-x-clip pt-32 md:pt-28">
					<section className="flex flex-col justify-center items-center gap-32 md:gap-20 w-full h-full">
						<About />
						<Projects />
						<Testimonials data={testimonials as any} />
						<Contact />
					</section>
					<Footer />
					<Background />
				</main>
				<BackgroundGradient />
			</div>
		</NavigationProvider>
	);
}

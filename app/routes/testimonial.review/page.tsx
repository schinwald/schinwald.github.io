import { useLoaderData } from "@remix-run/react";
import { BackgroundGradient } from "~/components/background-gradient";
import { Navigation } from "~/components/navigation";
import { TestimonialEditor } from "./components/testimonial-editor";
import type { Loader } from "./loader";

export default function () {
	const { user } = useLoaderData<Loader>();

	return (
		<div>
			<Navigation />
			<section className="bg-background w-screen h-screen overflow-y-scroll overflow-x-hidden">
				<TestimonialEditor fullName={user.full_name} avatar={user.avatar} />
				<BackgroundGradient />
			</section>
		</div>
	);
}

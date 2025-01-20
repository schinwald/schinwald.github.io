import { BackgroundGradient } from "~/components/background-gradient";
import { Navigation } from "~/components/navigation";
import { Authentication } from "./components";

export default function () {
	return (
		<div>
			<Navigation />
			<section className="w-screen h-screen">
				<Authentication />
				<BackgroundGradient />
			</section>
		</div>
	);
}

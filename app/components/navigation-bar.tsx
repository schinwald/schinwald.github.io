import svg from "~/assets/images/logo.svg";
import { Container } from "~/layouts/container";
import { Link } from "./primitives/ui/link";

export const NavigationBar = () => (
	<Container variant="wide">
		<div className="h-20 px-10 py-4 overflow-visible">
			<Link to="/" variant="ghost" size="minimal">
				<img src={svg} className="h-14 mb-5 object-cover" />
			</Link>
		</div>
	</Container>
);

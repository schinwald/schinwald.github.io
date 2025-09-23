import svg from "~/assets/images/logo.svg";
import { Container } from "~/layouts/container";
import { Link } from "./primitives/ui/link";

export const NavigationBar = () => (
  <Container variant="wide">
    <div className="h-20 overflow-visible px-10 py-4">
      <Link to="/" variant="ghost" size="minimal">
        <img
          src={svg}
          alt="Portfolio logo"
          className="mb-5 h-14 object-cover"
        />
      </Link>
    </div>
  </Container>
);

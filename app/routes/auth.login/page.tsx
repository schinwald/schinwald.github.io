import { BackgroundGradient } from "~/components/background-gradient";
import { Authentication } from "./components";

export default function () {
  return (
    <div>
      <section className="w-screen h-screen">
        <Authentication />
        <BackgroundGradient />
      </section>
    </div>
  );
}

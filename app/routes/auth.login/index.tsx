import { BackgroundGradient } from "~/components/background-gradient";
import { Authentication } from "./components";
import { meta as actualMeta } from "./meta";
import { action as actualAction } from "./server/actions";
import { loader as actualLoader } from "./server/loader";

export const loader = await actualLoader;
export const action = await actualAction;
export const meta = actualMeta;

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

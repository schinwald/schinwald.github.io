import { useLoaderData } from "react-router";
import { BackgroundGradient } from "~/components/background-gradient";
import { TestimonialEditor } from "./components/testimonial-editor";
import type { Loader } from "./loader";

export default function () {
  const { user } = useLoaderData<Loader>();

  return (
    <div>
      <section className="w-screen h-screen overflow-y-scroll overflow-x-hidden">
        <TestimonialEditor
          fullName={user.fullName}
          avatarURL={user.avatarURL}
        />
        <BackgroundGradient />
      </section>
    </div>
  );
}

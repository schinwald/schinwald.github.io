import { useLoaderData } from "react-router";
import { BackgroundGradient } from "~/components/background-gradient";
import { TestimonialEditor } from "./.components/testimonial-editor";
import { action as actualAction } from "./.server/actions";
import type { Loader } from "./.server/loader";
import { loader as actualLoader } from "./.server/loader";

export const loader = await actualLoader;
export const action = actualAction;

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

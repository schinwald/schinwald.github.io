import { useId } from "react";
import { useLoaderData } from "react-router";
import { BackgroundGradient } from "~/components/background-gradient";
import { ProgressProvider } from "~/hooks/progress";
import {
  About,
  Articles,
  Background,
  Contact,
  Footer,
  Jumbotron,
  Navbar,
  Projects,
  Testimonials,
} from "./components";
import { meta as actualMeta } from "./meta";
import { action as actualAction } from "./server/actions";
import type { Loader } from "./server/loader";
import { loader as actualLoader } from "./server/loader";

export const loader = await actualLoader;
export const action = await actualAction;
export const meta = actualMeta;

export default function () {
  const {
    data: { articles, testimonials },
  } = useLoaderData<Loader>();

  const homeId = useId();
  const aboutId = useId();
  const projectsId = useId();
  const articlesId = useId();
  const testimonialsId = useId();
  const contactId = useId();

  const steps = [
    homeId,
    aboutId,
    projectsId,
    articlesId,
    testimonialsId,
    contactId,
  ];

  return (
    <div className="relative">
      <ProgressProvider steps={steps}>
        <section className="h-screen text-foreground">
          <Jumbotron />
        </section>
        <main className="relative flex flex-col justify-center items-center overflow-x-clip pt-24 md:pt-20 border-t border-[#fff2]">
          <section className="flex flex-col justify-center items-center gap-56 md:gap-48 w-full h-full">
            <Navbar />
            <About id={aboutId} />
            <Projects id={projectsId} />
            <Articles id={articlesId} data={articles} />
            <Testimonials id={testimonialsId} data={testimonials} />
            <Contact id={contactId} />
          </section>
          <Footer />
          <Background />
        </main>
        <BackgroundGradient />
      </ProgressProvider>
    </div>
  );
}

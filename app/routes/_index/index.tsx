import { useLoaderData } from "react-router";
import { BackgroundGradient } from "~/components/background-gradient";
import * as Tab from "~/components/tab";
import {
  About,
  Articles,
  Background,
  Contact,
  Footer,
  Jumbotron,
  Projects,
  Testimonials,
} from "./.components";
import { meta as actualMeta } from "./.meta";
import type { Loader } from "./.server/loader";
import { loader as actualLoader } from "./.server/loader";

export const loader = await actualLoader;
export const meta = actualMeta;

export default function () {
  const {
    data: { articles, testimonials },
  } = useLoaderData<Loader>();

  return (
    <div className="relative">
      <section className="h-screen text-foreground">
        <Jumbotron />
      </section>
      <main className="relative flex flex-col justify-center items-center overflow-x-clip pt-24 md:pt-20 border-t border-[#fff2]">
        <section className="flex flex-col justify-center items-center gap-56 md:gap-48 w-full h-full">
          <div className="sticky -mt-48 mb-32 top-10 z-40 flex flex-row justify-center">
            <Tab.Root />
          </div>
          <About />
          <Projects />
          <Articles data={articles} />
          <Testimonials data={testimonials} />
          <Contact />
        </section>
        <Footer />
        <Background />
      </main>
      <BackgroundGradient />
    </div>
  );
}

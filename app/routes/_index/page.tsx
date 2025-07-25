import { useLoaderData } from "@remix-run/react";
import { BackgroundGradient } from "~/components/background-gradient";
import * as Tab from "~/components/tab";
import {
  About,
  Background,
  Contact,
  Footer,
  Jumbotron,
  Projects,
  Testimonials,
} from "./components";
import { Articles } from "./components/articles";
import type { Loader } from "./loader";

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

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
import type { Loader } from "./loader";

export default function () {
  const {
    data: { testimonials },
  } = useLoaderData<Loader>();

  return (
    <div className="relative">
      <section className="h-screen text-foreground">
        <Jumbotron />
      </section>
      <main className="relative flex flex-col justify-center items-center overflow-x-clip pt-32 md:pt-28 border-t border-[#fff2]">
        <section className="flex flex-col justify-center items-center gap-32 md:gap-20 w-full h-full">
          <div className="sticky -mt-48 mb-32 top-10 z-50 flex flex-row justify-center">
            <Tab.Root />
          </div>
          <About />
          <Projects />
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

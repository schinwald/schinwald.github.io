import { Navigation } from '~/components/navigation';
import { useLoaderData } from "@remix-run/react";
import type { Loader } from "./loader";
import {
  Jumbotron,
  About,
  Projects,
  Testimonials,
  Contact,
  Background,
  Footer,
} from './components';

export default function() {
  const {
    data: { testimonials }
  } = useLoaderData<Loader>()

  return (
    <div>
      <Navigation />
      <div className='flex flex-col gap-12 sm:gap-32'>
        <section className='z-20 h-screen bg-background text-foreground'>
          <Jumbotron />
        </section>
        <main className='flex flex-col justify-center items-center overflow-x-clip'>
          <section className='relative flex flex-col justify-center items-center gap-12 sm:gap-20 w-full h-full'>
            <About />
            <Projects />
            <Testimonials data={testimonials as any} />
            <Contact />
          </section>
        </main>
        <Footer />
        <Background />
      </div>
    </div>
  );
}

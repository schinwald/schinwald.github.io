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
import { BackgroundGradient } from '~/components/background-gradient';

export default function() {
  const {
    data: { testimonials }
  } = useLoaderData<Loader>()

  return (
    <div>
      <Navigation />
      <section className='h-screen text-foreground'>
        <Jumbotron />
      </section>
      <main className='relative flex flex-col justify-center items-center overflow-x-clip pt-32 md:pt-28'>
        <section className='flex flex-col justify-center items-center gap-32 md:gap-20 w-full h-full'>
          <About />
          <Projects />
          <Testimonials data={testimonials as any} />
          <Contact />
        </section>
        <Footer />
        <Background />
      </main>
      <BackgroundGradient />
    </div>
  );
}

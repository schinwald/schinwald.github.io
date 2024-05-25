import { json, type MetaFunction } from "@remix-run/node";
import { Navigation } from '~/components/navigation';
import backgroundSoftSVG from '~/assets/images/background-soft.svg';
import { useLoaderData } from "@remix-run/react";
import { randomlyFillData } from "~/utils/helpers";
import { supabase } from "~/utils/services/supabase"
import { Jumbotron } from "~/components/jumbotron";
import { About } from "~/components/about";
import { Projects } from "~/components/projects";
import { Contact } from "~/components/contact";
import { Testimonials } from "~/components/testimonials";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio | James Schinwald" },
    { name: "description", content: "Welcome to Remix!" },
  ]
};

export async function loader() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('avatar, full_name, company, occupation, review, rating')
    .eq('approved', true)

  if (error) {
    throw new Error('Something went wrong!')
  }

  return json({
    testimonials: randomlyFillData(data, 30)
  })
}

export default function Page() {
  const { testimonials } = useLoaderData<typeof loader>()

  return (
    <div>
      <Navigation />
      <div className='flex flex-col gap-12 sm:gap-32'>
        <section className='z-20 h-screen bg-background text-foreground'>
          <Jumbotron />
        </section>
        <main className='flex flex-col justify-center items-center overflow-x-clip'>
          <section className='relative flex flex-col justify-center items-center gap-12 sm:gap-20 w-full h-full'>
            <About/>
            <Projects/>
            <Testimonials data={testimonials as any}/>
            <Contact/>
          </section>
        </main>
        <footer className='flex flex-row justify-center py-10 text-foreground'>
          <p>
            Thanks for stopping by :)
          </p>
        </footer>
        <div
          className='fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-background-soft flex flex-row justify-center'
          style={{ backgroundImage: `url(${backgroundSoftSVG})`, backgroundSize: '30%', backgroundRepeat: 'repeat' }}
        >
          <div className='bg-gradient-to-r from-transparent to-background-soft w-[100px] h-full z-[-1]'></div>
          <div className='bg-background-soft w-full max-w-screen-md h-full z-[-1]'></div>
          <div className='bg-gradient-to-r from-background-soft to-transparent w-[100px] h-full z-[-1]'></div>
        </div>
      </div>

    </div>
  );
}

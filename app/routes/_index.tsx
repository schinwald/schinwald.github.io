import { LoaderFunction, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Navigation } from '~/components/navigation';
import backgroundSoftSVG from '~/assets/images/background-soft.svg';
import { useLoaderData } from "@remix-run/react";
import { randomlyFillData } from "~/utils/helpers";
import { Jumbotron } from "~/components/jumbotron";
import { About } from "~/components/about";
import { Projects } from "~/components/projects";
import { Contact } from "~/components/contact";
import { Testimonials } from "~/components/testimonials";
import { TestimonialService } from "~/utils/services/testimonial";
import { DatabaseManagementSystem } from "~/utils/database";

export const meta: MetaFunction = () => {
  return [
    { title: "Home" },
    { name: "description", content: "" },
  ]
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const databaseManagementSystem = new DatabaseManagementSystem({ request })

  const {
    headers,
    supabaseClient
  } = databaseManagementSystem.initialize()

  const testimonialService = new TestimonialService({ request, supabaseClient })

  // Grab testimonials
  let testimonials
  {
    const response = await testimonialService.read()

    if (response.errors) {
      throw new Response(JSON.stringify(response), {
        status: response.meta.status,
        headers
      })
    }

    testimonials = response.data.testimonials
  }

  const response = {
    meta: {
      status: 200
    },
    data: {
      testimonials: randomlyFillData(testimonials, 30)
    }
  }

  return json(response)
}

export default function Page() {
  const {
    data: { testimonials }
  } = useLoaderData<typeof loader>()

  const generateFooter = () => {
    return (
      <footer className='flex flex-row justify-center py-10 text-foreground'>
        <p>
          Thanks for stopping by :)
        </p>
      </footer>
    )
  }

  const generateBackground = () => {
    return (
      <div
        className='fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-background-soft flex flex-row justify-center'
        style={{ backgroundImage: `url(${backgroundSoftSVG})`, backgroundSize: '30%', backgroundRepeat: 'repeat' }}
      >
        <div className='bg-gradient-to-r from-transparent to-background-soft w-[100px] h-full z-[-1]'></div>
        <div className='bg-background-soft w-full max-w-screen-md h-full z-[-1]'></div>
        <div className='bg-gradient-to-r from-background-soft to-transparent w-[100px] h-full z-[-1]'></div>
      </div>
    )
  }

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
        {generateFooter()}
        {generateBackground()}
      </div>
    </div>
  );
}

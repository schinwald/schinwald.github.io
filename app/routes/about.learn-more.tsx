import type { MetaFunction } from "@remix-run/node";
import { Navigation } from '~/components/navigation';
import { UnderConstruction } from '~/components/under-construction';
import { BackgroundGradient } from '~/components/background-gradient';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Navigation />
      <section className='bg-background w-screen h-screen'>
        <UnderConstruction />
        {/* <!-- <Timeline /> --> */}
        <BackgroundGradient />
      </section>
    </div>
  )
}

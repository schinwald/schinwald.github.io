import { Navigation } from '~/components/navigation';
import { UnderConstruction } from '~/components/under-construction';
import { BackgroundGradient } from '~/components/background-gradient';

export default function() {
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

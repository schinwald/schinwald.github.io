import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { Authentication } from './components';

export default function() {
  return (
    <div>
      <Navigation />
      <section className='bg-background w-screen h-screen'>
        <Authentication />
        <BackgroundGradient />
      </section>
    </div>
  )
}

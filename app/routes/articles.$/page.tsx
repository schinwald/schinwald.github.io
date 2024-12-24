import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { Container } from '~/layouts/container';
import { Button } from '~/components/primitives/ui/button';
import { Link } from '~/components/primitives/ui/link';
import { Input } from '~/components/primitives/ui/input';
import svg from '~/assets/images/logo.svg';
import { IoIosArrowRoundBack as ArrowLeftIcon } from "react-icons/io";
import {
  IoMdHeart as FullHeartIcon,
  IoMdHeartEmpty as EmptyHeartIcon,
} from "react-icons/io";
import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";

export default function() {
  return (
    <div className='relative'>
      <Navigation />
      <section className='w-screen h-screen'>
        <div className='relative w-screen flex flex-col justify-center items-center text-foreground gap-28 py-32'>
          <Container variant='wide'>
            <img src={svg} className='absolute top-[-380px] left-[-220px] scale-[0.2] object-cover' />
          </Container>
          <Container variant='narrow'>
            <div className='grid grid-cols-12 auto-rows-min gap-10'>
              <div className='grid grid-cols-subgrid grid-rows-subgrid col-span-9 row-span-3 text-foreground-overlay'>
                <div className='flex flex-col gap-14 col-span-9 row-start-1 row-end-2'>
                  <div className='flex flex-col items-center gap-3'>
                    <p className='font-light'>🗓️ Dec 12, 2024</p>
                    <h2 className='text-center'>Understanding the Node Event Loop</h2>
                  </div>
                </div>
                <div className='flex flex-col gap-14 col-span-9 row-start-2 row-end-2'>
                  <div className='aspect-[8/5] bg-[#fff8] rounded-sm mx-10'>
                  </div>
                </div>
                <div className='flex flex-col gap-14 col-span-9 row-start-3 row-end-3'>
                  <article className='flex flex-col gap-10'>
                    <p>
                      Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                    </p>
                    <div className='flex flex-col gap-6'>
                      <div className='flex flex-row gap-2 group'>
                        <h3>Header</h3>
                        <h3 className='group-hover:opacity-100 opacity-0 transition-all text-muted-foreground'>#</h3>
                      </div>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                    </div>
                    <div className='flex flex-col gap-6'>
                      <div className='flex flex-row gap-2 group'>
                        <h3>Header</h3>
                        <h3 className='group-hover:opacity-100 opacity-0 transition-all text-muted-foreground'>#</h3>
                      </div>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                    </div>
                    <div className='flex flex-col gap-6'>
                      <div className='flex flex-row gap-2 group'>
                        <h3>Header</h3>
                        <h3 className='group-hover:opacity-100 opacity-0 transition-all text-muted-foreground'>#</h3>
                      </div>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                    </div>
                    <div className='flex flex-col gap-6'>
                      <div className='flex flex-row gap-2 group'>
                        <h3>Header</h3>
                        <h3 className='group-hover:opacity-100 opacity-0 transition-all text-muted-foreground'>#</h3>
                      </div>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                      <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.
                      </p>
                    </div>
                  </article>
                </div >
              </div>
              <div className='col-span-3 col-start-10 self-end row-start-2 row-end-2 flex flex-col gap-4'>
              </div>
              <div className='col-span-3 flex flex-col gap-6 col-start-10 row-start-2 row-span-2'>
                <div className='sticky top-10 flex flex-col gap-8'>
                  <div className='flex flex-col gap-4'>
                    <h6>Table of Contents</h6>
                    <ol className='list-none'>
                      <li className='ml-3 flex flex-row items-center gap-2'><span>Header</span><span className='flex flex-row items-center text-[#fff6]'><ArrowLeftIcon /> You're here</span></li>
                      <li className='ml-3'>Header</li>
                    </ol>
                  </div>
                  <div className='flex flex-col items-start gap-1'>
                    <Link href='https://buymeacoffee.com/schinwald' variant='ghost' size='minimal' className='flex flex-row gap-2'>
                      <BuyMeACoffeeIcon className='size-4' />
                      Buy me a coffee
                    </Link>
                    <Button variant='ghost' size='minimal' className='flex flex-row gap-2'>
                      <FullHeartIcon className='size-4 text-muted-foreground' />
                      Like
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container variant='narrow'>
            <div className='flex flex-row justify-between items-end'>
              <div className='flex flex-col gap-4 max-w-[600px]'>
                <h3>Newsletter</h3>
                <p>Subscribe to this newsletter to receive notifications when new articles are published</p>
                <div className='flex flex-row gap-4'>
                  <Input placeholder="Enter your email" />
                  <Button>Subscribe</Button>
                </div>
              </div>
              <span className='text-[5rem]'>
                🚀
              </span>
            </div>
          </Container>
        </div>
        <BackgroundGradient />
      </section >
    </div >
  )
}


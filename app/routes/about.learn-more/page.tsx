import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { LuVolume2 as Volume2 } from "react-icons/lu";
import { Button } from '~/components/primitives/ui/button';

export default function() {
  return (
    <div>
      <Navigation />
      <section className='bg-background w-screen h-screen'>
        <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
          <div className='bg-background-overlay text-foreground-overlay p-6 rounded-md max-w-[300px]'>
            <div className='flex flex-col gap-2'>
              <h4>Keyboard</h4>
              <p>I'm currently rocking the <a className='text-primary' href="https://josefadamcik.github.io/SofleKeyboard/build_guide_rgb.html">Sofle v2.1</a>; a custom split keyboard with 58 keys. It's a great keyboard for typing, but I'm also a big fan of the split layout, as it allows me to have a more ergonomic typing experience. Here's a blog on the <a className='text-primary'>build process</a>.</p>
            </div>
          </div>
          <div className='bg-background-overlay text-foreground-overlay p-6 rounded-md max-w-[300px]'>
            <div className='flex flex-col gap-2'>
              <h4>Neovim</h4>
              <p>My editor of choice is Neovim. I've been using it for a while now, and I'm really loving it. It's fast, it's extensible, and it's just the best editor I've ever used.</p>
            </div>
          </div>
          <div className='bg-background-overlay text-foreground-overlay p-6 rounded-md max-w-[300px]'>
            <div className='flex flex-col gap-2'>
              <h4>Jobs</h4>
              <p>Devopie Inc.</p>
              <p>Nautical Commerce</p>
            </div>
          </div>
          <div className='bg-background-overlay text-foreground-overlay p-6 rounded-md'>
            <div className='flex flex-col gap-2'>
              <div>
                <h4 className='font-math text-xl'>
                  /ˈʃɪnˌwɔːld/
                </h4>
              </div>
              <hr />
              <div className='flex flex-row justify-start items-center gap-2'>
                <p className='italic'>sh•in•wo•ld</p>
                <Button variant='ghost' size='minimal'>
                  <Volume2 />
                </Button>
              </div>
              <p className='font-thin'>
                Try to say it with your heaviest Austrian accent.
                <br />
                It makes it funnier :)
              </p>
            </div>
          </div>
        </div >
        <BackgroundGradient />
      </section >
    </div >
  )
}

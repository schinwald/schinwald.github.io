import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { Container } from '~/layouts/container';
import { Button } from '~/components/primitives/ui/button';
import { Link } from '~/components/primitives/ui/link';
import { Input } from '~/components/primitives/ui/input';

export const Article: React.FC = () => (
  <div className=' text-foreground-overlay flex flex-col gap-6'>
    <div className='aspect-[8/5] bg-[#fff8] rounded-sm'>
    </div>
    <div className='flex flex-col gap-3'>
      <p className='font-light'>Dec 12, 2024</p>
      <h3>Coming Soon</h3>
    </div>
    <div>
      <article className='line-clamp-3'>
        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.

          Viverra convallis nibh tristique, quam ligula curae. Porttitor odio dictumst proin magna litora quisque scelerisque est pulvinar. Tempus faucibus lectus urna sapien arcu proin. Enim netus ornare iaculis dui vehicula per. Donec ornare magna molestie fusce diam proin. Phasellus ligula ipsum rutrum; nulla senectus rutrum. Accumsan tempus hendrerit natoque, enim senectus turpis litora condimentum mauris. Nam mattis sociosqu lacinia parturient fringilla posuere; finibus porttitor? Ante ultrices nisi sociosqu ullamcorper cras facilisis. Adipiscing fusce eget vestibulum etiam luctus aliquam praesent risus donec.

          Taciti nisl eros fringilla phasellus semper. Malesuada eu fames aliquam sem cras. Nostra posuere hac; hendrerit hendrerit mattis ultrices blandit mattis. Donec integer porta nascetur ut platea netus. Nascetur gravida molestie duis tempor ante integer felis. Ut nec egestas vulputate sit quam non. Tempor nibh vel aliquam nam ultricies odio eros. Sit consequat augue natoque primis purus adipiscing cursus lacinia felis.

          Tempor leo natoque rhoncus nam fermentum lorem tortor donec. Risus mattis conubia tincidunt cursus consectetur in nam leo. Quam lacinia posuere nascetur, fames maecenas orci. Iaculis venenatis fusce mus varius sagittis mus cursus cras. Ultricies justo etiam euismod dapibus rutrum vehicula. Scelerisque diam gravida lacus pulvinar suscipit varius a. Ligula elementum congue himenaeos etiam dictumst tincidunt metus id. Mattis libero feugiat mauris enim cursus; ultricies nec scelerisque. Auctor ex vestibulum hendrerit auctor morbi turpis.

          Sagittis ante senectus lacinia finibus auctor condimentum. Enim ornare eget turpis molestie; sit odio pharetra penatibus. Senectus pharetra turpis non rhoncus lacus dolor ridiculus. Phasellus at vivamus varius porta efficitur est. Dictum aptent posuere blandit massa non natoque dapibus vivamus. Libero duis quisque eu, consequat duis sed.</p>
      </article>
      <div>
        <Link href='' variant='link' size="minimal">Read More</Link>
      </div>
    </div>
  </div>
)

export const ArticleSide: React.FC = () => (
  <div className=' text-foreground-overlay flex flex-row gap-6'>
    <div className='aspect-[8/5] bg-[#fff8] rounded-sm h-full w-full'>
    </div>
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <p className='font-light'>Dec 12, 2024</p>
        <h3>Coming Soon</h3>
      </div>
      <div>
        <article className='line-clamp-2'>
          <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Justo conubia cubilia porta eget efficitur nibh mus? Malesuada himenaeos commodo ullamcorper vel litora consectetur. Morbi morbi bibendum aenean fames, ipsum torquent. Lobortis velit aptent interdum lectus arcu ornare nostra. Tortor tristique magnis facilisi cras duis.

            Viverra convallis nibh tristique, quam ligula curae. Porttitor odio dictumst proin magna litora quisque scelerisque est pulvinar. Tempus faucibus lectus urna sapien arcu proin. Enim netus ornare iaculis dui vehicula per. Donec ornare magna molestie fusce diam proin. Phasellus ligula ipsum rutrum; nulla senectus rutrum. Accumsan tempus hendrerit natoque, enim senectus turpis litora condimentum mauris. Nam mattis sociosqu lacinia parturient fringilla posuere; finibus porttitor? Ante ultrices nisi sociosqu ullamcorper cras facilisis. Adipiscing fusce eget vestibulum etiam luctus aliquam praesent risus donec.

            Taciti nisl eros fringilla phasellus semper. Malesuada eu fames aliquam sem cras. Nostra posuere hac; hendrerit hendrerit mattis ultrices blandit mattis. Donec integer porta nascetur ut platea netus. Nascetur gravida molestie duis tempor ante integer felis. Ut nec egestas vulputate sit quam non. Tempor nibh vel aliquam nam ultricies odio eros. Sit consequat augue natoque primis purus adipiscing cursus lacinia felis.

            Tempor leo natoque rhoncus nam fermentum lorem tortor donec. Risus mattis conubia tincidunt cursus consectetur in nam leo. Quam lacinia posuere nascetur, fames maecenas orci. Iaculis venenatis fusce mus varius sagittis mus cursus cras. Ultricies justo etiam euismod dapibus rutrum vehicula. Scelerisque diam gravida lacus pulvinar suscipit varius a. Ligula elementum congue himenaeos etiam dictumst tincidunt metus id. Mattis libero feugiat mauris enim cursus; ultricies nec scelerisque. Auctor ex vestibulum hendrerit auctor morbi turpis.

            Sagittis ante senectus lacinia finibus auctor condimentum. Enim ornare eget turpis molestie; sit odio pharetra penatibus. Senectus pharetra turpis non rhoncus lacus dolor ridiculus. Phasellus at vivamus varius porta efficitur est. Dictum aptent posuere blandit massa non natoque dapibus vivamus. Libero duis quisque eu, consequat duis sed.</p>
        </article>
        <div>
          <Link href='' variant='link' size="minimal">Read More</Link>
        </div>
      </div>
    </div>
  </div>
)

export default function() {
  return (
    <div>
      <Navigation />
      <section className='w-screen h-screen'>
        <div className='relative overflow-hidden w-screen flex flex-col justify-center items-center mt-40 text-foreground'>
          <Container variant='narrow'>
            <h2>Featured</h2>
            <div className='flex flex-row gap-6'>
              <Article />
              <div className='flex flex-col gap-6'>
                <ArticleSide />
                <ArticleSide />
                <ArticleSide />
              </div>
            </div>
            <hr />
            <h2>Recent Articles</h2>
            <div className='flex flex-row gap-6'>
              <Article />
              <Article />
              <Article />
            </div>
            <div className='flex flex-row gap-6'>
              <Article />
              <Article />
              <Article />
            </div>
            <div className='flex flex-row gap-6'>
              <Article />
              <Article />
              <Article />
            </div>
            <hr />
            <div className='flex flex-col gap-4 max-w-[600px]'>
              <h3>Newsletter</h3>
              <p>Subscribe to this newsletter to receive notifications when new blog posts are published</p>
              <div className='flex flex-row gap-4'>
                <Input placeholder="Enter your email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </Container>
        </div>
        <BackgroundGradient />
      </section >
    </div >
  )
}


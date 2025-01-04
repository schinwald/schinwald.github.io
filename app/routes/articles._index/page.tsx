import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { Container } from '~/layouts/container';
import { Button } from '~/components/primitives/ui/button';
import { Link } from '~/components/primitives/ui/link';
import { Input } from '~/components/primitives/ui/input';
import svg from '~/assets/images/logo.svg';
import { useEffect } from 'react';
import { animate, motion, stagger, useAnimate, useInView } from 'framer-motion';

export const Article: React.FC = () => (
  <li className=' text-foreground-overlay flex flex-col gap-6 opacity-0'>
    <div className='aspect-[8/5] bg-[#fff8] rounded-sm'>
    </div>
    <div className='flex flex-col gap-3'>
      <p className='font-light'>🗓️ TBD</p>
      <h3>Coming Soon</h3>
      <div className='inline-flex gap-1 overflow-hidden'>
        <span className='bg-tertiary text-tertiary-foreground rounded-full text-sm px-2 py-0'>Tutorial</span>
      </div>
    </div>
    <div className='flex flex-col gap-1'>
      <p className='line-clamp-4'>
        Viverra convallis nibh tristique, quam ligula curae. Porttitor odio dictumst proin magna litora quisque scelerisque est pulvinar. Tempus faucibus lectus urna sapien arcu proin. Enim netus ornare iaculis dui vehicula per. Donec ornare magna molestie fusce diam proin. Phasellus ligula ipsum rutrum; nulla senectus rutrum. Accumsan tempus hendrerit natoque, enim senectus turpis litora condimentum mauris. Nam mattis sociosqu lacinia parturient fringilla posuere; finibus porttitor? Ante ultrices nisi sociosqu ullamcorper cras facilisis. Adipiscing fusce eget vestibulum etiam luctus aliquam praesent risus donec.

        Taciti nisl eros fringilla phasellus semper. Malesuada eu fames aliquam sem cras. Nostra posuere hac; hendrerit hendrerit mattis ultrices blandit mattis. Donec integer porta nascetur ut platea netus. Nascetur gravida molestie duis tempor ante integer felis. Ut nec egestas vulputate sit quam non. Tempor nibh vel aliquam nam ultricies odio eros. Sit consequat augue natoque primis purus adipiscing cursus lacinia felis.

        Tempor leo natoque rhoncus nam fermentum lorem tortor donec. Risus mattis conubia tincidunt cursus consectetur in nam leo. Quam lacinia posuere nascetur, fames maecenas orci. Iaculis venenatis fusce mus varius sagittis mus cursus cras. Ultricies justo etiam euismod dapibus rutrum vehicula. Scelerisque diam gravida lacus pulvinar suscipit varius a. Ligula elementum congue himenaeos etiam dictumst tincidunt metus id. Mattis libero feugiat mauris enim cursus; ultricies nec scelerisque. Auctor ex vestibulum hendrerit auctor morbi turpis.

        Sagittis ante senectus lacinia finibus auctor condimentum. Enim ornare eget turpis molestie; sit odio pharetra penatibus. Senectus pharetra turpis non rhoncus lacus dolor ridiculus. Phasellus at vivamus varius porta efficitur est. Dictum aptent posuere blandit massa non natoque dapibus vivamus. Libero duis quisque eu, consequat duis sed.
      </p>
      <div>
        <Link to='' variant='link' size="minimal">Read More</Link>
      </div>
    </div>
  </li>
)

export const ArticleSide: React.FC = () => (
  <li className=' text-foreground-overlay flex flex-row gap-4 opacity-0'>
    <div className='aspect-[8/5] bg-[#fff8] h-36 rounded-sm'>
    </div>
    <div className='flex flex-col justify-center gap-6'>
      <div className='flex flex-col gap-3'>
        <p className='font-light'>🗓️ TBD</p>
        <h3>Coming Soon</h3>
        <p>
          <span className='bg-tertiary text-tertiary-foreground rounded-full text-sm px-2'>Reactjs</span>
        </p>
      </div>
      <div className='flex flex-col gap-1'>
        <p className='line-clamp-2'>
          Tempor leo natoque rhoncus nam fermentum lorem tortor donec. Risus mattis conubia tincidunt cursus consectetur in nam leo. Quam lacinia posuere nascetur, fames maecenas orci. Iaculis venenatis fusce mus varius sagittis mus cursus cras. Ultricies justo etiam euismod dapibus rutrum vehicula. Scelerisque diam gravida lacus pulvinar suscipit varius a. Ligula elementum congue himenaeos etiam dictumst tincidunt metus id. Mattis libero feugiat mauris enim cursus; ultricies nec scelerisque. Auctor ex vestibulum hendrerit auctor morbi turpis.
        </p>
        <div>
          <Link to='' variant='link' size="minimal">Read More</Link>
        </div>
      </div>
    </div>
  </li>
)

export const FeaturedArticles: React.FC = () => {
  const [featuredArticlesRef, animateFeaturedArticle] = useAnimate()
  const isInView = useInView(featuredArticlesRef, { margin: "-200px 0px", once: true })

  useEffect(() => {
    if (isInView) {
      animateFeaturedArticle("li", {
        opacity: [0, 1],
        transform: ['translateY(20px)', 'translateY(0px)']
      }, {
        duration: 0.5,
        delay: stagger(0.1)
      })
    }
  }, [isInView])

  return (
    <Container variant='narrow'>
      <h2>Featured</h2>
      <motion.ol ref={featuredArticlesRef} className='grid grid-cols-12 grid-rows-3 gap-6'>
        <li className='col-span-6 row-span-3'>
          <Article />
        </li>
        <li className='col-span-6 row-span-1'>
          <ArticleSide />
        </li>
        <li className='col-span-6 row-span-1'>
          <ArticleSide />
        </li>
        <li className='col-span-6 row-span-1'>
          <ArticleSide />
        </li>
      </motion.ol>
    </Container>
  )
}

export const AllArticles: React.FC = () => {
  const [allArticlesRef, animateAllArticles] = useAnimate()
  const isInView = useInView(allArticlesRef, { margin: "-200px 0px", once: true })

  useEffect(() => {
    if (isInView) {
      animateAllArticles("li", {
        opacity: [0, 1],
        transform: ['translateY(20px)', 'translateY(0px)']
      }, {
        duration: 0.5,
        delay: stagger(0.1)
      })
    }
  }, [isInView])

  return (
    <Container variant='narrow'>
      <div className='flex flex-row items-end gap-6'>
        <h2>All My Articles</h2>
        <Input placeholder="Search articles" />
      </div>
      <motion.ol ref={allArticlesRef} className='grid grid-cols-3 grid-rows-3 gap-6'>
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </motion.ol>
    </Container>
  )
}

export default function() {
  return (
    <div>
      <Navigation />
      <section className='w-screen h-screen'>
        <div className='relative overflow-hidden w-screen flex flex-col justify-center items-center text-foreground gap-28 py-32'>
          <Container variant='wide'>
            <img src={svg} className='absolute top-[-360px] left-[-200px] scale-[0.2] object-cover' />
          </Container>
          <FeaturedArticles />
          <AllArticles />
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


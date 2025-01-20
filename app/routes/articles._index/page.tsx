import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { Container } from '~/layouts/container';
import { Button } from '~/components/primitives/ui/button';
import { Link } from '~/components/primitives/ui/link';
import { Input } from '~/components/primitives/ui/input';
import { useEffect } from 'react';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { Loader } from './loader';
import { useLoaderData } from '@remix-run/react';
import { safeFormat, safeParseISO } from '~/utils/date';
import { NavigationBar } from '~/components/navigation-bar';
import { MdKeyboardCommandKey as CommandIcon } from "react-icons/md";
import { FaSearch as SearchIcon } from "react-icons/fa";


type ArticleProps = {
  id: string
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  }
  meta?: {
    tags?: string[];
    publishedAt: string | null
  }
}

export const Article: React.FC<ArticleProps> = ({ id, title, description, image, meta }) => {
  const publishedAt = safeParseISO(meta?.publishedAt)

  return (
    <li className=' text-foreground-overlay flex flex-col gap-6 opacity-0'>
      <Link to={`/articles/${id}`} variant='ghost' size='minimal' className='aspect-[8/5] bg-[#fff8] rounded-sm overflow-hidden'>
        <img src={image?.src} alt={image?.alt} />
      </Link>
      <div className='flex flex-col gap-3'>
        <p className='font-light'>🗓️ {safeFormat(publishedAt) ?? 'TBD'}</p>
        <h3>{title}</h3>
        <div className='inline-flex gap-1 overflow-hidden'>
          {meta?.tags?.map((tag) =>
            <span key={tag} className='bg-tertiary text-tertiary-foreground rounded-full text-sm px-2 py-0'>{tag}</span>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <p className='line-clamp-4'>
          {description}
        </p>
        <div>
          <Link to={`/articles/${id}`} variant='link' size="minimal">Read More</Link>
        </div>
      </div>
    </li>
  )
}

type ArticleSideProps = {
  id: string
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  }
  meta?: {
    tags?: string[];
    publishedAt: string | null
  }
}

export const ArticleSide: React.FC<ArticleSideProps> = ({ id, title, description, image, meta }) => {
  const publishedAt = safeParseISO(meta?.publishedAt)

  return (
    <li className=' text-foreground-overlay flex flex-row gap-4 opacity-0'>
      <Link to={`/articles/${id}`} variant='ghost' size='minimal' className='aspect-[8/5] bg-[#fff8] rounded-sm overflow-hidden'>
        <img src={image?.src} alt={image?.alt} />
      </Link>
      <div className='flex flex-col justify-center gap-6'>
        <div className='flex flex-col gap-3'>
          <p className='font-light'>🗓️ {safeFormat(publishedAt) ?? 'TBD'}</p>
          <h3>{title}</h3>
          <div className='inline-flex gap-1 overflow-hidden'>
            {meta?.tags?.map((tag) =>
              <span key={tag} className='bg-tertiary text-tertiary-foreground rounded-full text-sm px-2'>{tag}</span>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='line-clamp-2'>
            {description}
          </p>
          <div>
            <Link to={`/articles/${id}`} variant='link' size="minimal">Read More</Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export const FeaturedArticles: React.FC = () => {
  const { articles } = useLoaderData<Loader>();
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


  const featuredArticles = articles.filter(article => article.meta?.isFeatured)

  return (
    <Container variant='narrow'>
      <h2>Featured</h2>
      <motion.ol ref={featuredArticlesRef} className='grid grid-cols-12 grid-rows-3 gap-6'>
        <li className='col-span-6 row-span-3'>
          {featuredArticles[0] ?
            <Article {...featuredArticles[0]} />
            : null}
        </li>
        <li className='col-span-6 row-span-1'>
          {featuredArticles[1] ?
            <ArticleSide {...featuredArticles[1]} />
            : null}
        </li>
        <li className='col-span-6 row-span-1'>
          {featuredArticles[2] ?
            <ArticleSide {...featuredArticles[2]} />
            : null}
        </li>
        <li className='col-span-6 row-span-1'>
          {featuredArticles[3] ?
            <ArticleSide {...featuredArticles[3]} />
            : null}
        </li>
      </motion.ol>
    </Container>
  )
}

export const AllArticles: React.FC = () => {
  const { articles } = useLoaderData<Loader>();
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
      <div className='flex flex-row items-end justify-between text-foreground'>
        <h2>
          All
          <br />
          Articles
        </h2>
        <div className='flex flex-row items-center text-black bg-white px-3 rounded-md w-[400px]'>
          <SearchIcon />
          <Input placeholder="Search..." className='bg-none border-none w-full' />
          <p className='flex flex-row items-center gap-1'>
            <CommandIcon />
            +
            <div className='ml-[0.2rem] rounded size-6 flex justify-center bg-black text-white text-[0.5rem]'>
              K
            </div>
          </p>
        </div>
      </div>
      <motion.ol ref={allArticlesRef} className='grid grid-cols-3 grid-rows-3 gap-6'>
        {articles.map((article, index) =>
          <Article key={index} {...article} />
        )}
      </motion.ol>
    </Container>
  )
}

export default function() {
  return (
    <div>
      <Navigation />
      <section className='w-screen h-screen'>
        <div className='relative overflow-hidden w-screen flex flex-col justify-center items-center text-foreground gap-28 pb-32'>
          <NavigationBar />
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


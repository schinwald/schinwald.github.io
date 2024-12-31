import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { Container } from '~/layouts/container';
import { Button } from '~/components/primitives/ui/button';
import { Link } from '~/components/primitives/ui/link';
import { Input } from '~/components/primitives/ui/input';
import svg from '~/assets/images/logo.svg';
import {
  IoMdHeart as FullHeartIcon,
} from "react-icons/io";
import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react';
import { Loader } from './loader';
import { useLoaderData } from '@remix-run/react';
import { MDXProvider, useMDXComponents } from '@mdx-js/react';

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

export default function() {
  const { code, frontmatter, toc } = useLoaderData<Loader>();
  const Component = useMemo(() => getMDXComponent(code, MDX_GLOBAL_CONFIG), [code])
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
                    <p className='font-light'>🗓️ {frontmatter.publishedAt ?? "TBD"}</p>
                    <h2 className='text-center'>{frontmatter.title}</h2>
                  </div>
                </div>
                <div className='flex flex-col gap-14 col-span-9 row-start-2 row-end-2'>
                  <div className='aspect-[8/5] bg-[#fff8] rounded-sm'>
                  </div>
                </div>
                <article className='flex flex-col gap-14 col-span-9 row-start-3 row-end-3'>
                  <MDXProvider components={{
                    h1: ({ children }) => <h1>{children}</h1>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    h3: ({ children }) => <h3>{children}</h3>,
                    h4: ({ children }) => <h4>{children}</h4>,
                    h5: ({ children }) => <h5>{children}</h5>,
                    h6: ({ children }) => <h6>{children}</h6>,
                    code: ({ children }) => (
                      <div>
                        <div className='bg-background-overlay p-4 rounded-t-md'></div>
                        <div className='bg-background p-4 rounded-b-md'>
                          <code>
                            {children}
                          </code>
                        </div>
                      </div>
                    ),
                  }}>
                    <Component />
                  </MDXProvider>
                </article >
              </div>
              <div className='col-span-3 col-start-10 self-end row-start-2 row-end-2 flex flex-col gap-4'>
              </div>
              <div className='col-span-3 flex flex-col gap-6 col-start-10 row-start-2 row-span-2'>
                <div className='sticky top-10 flex flex-col gap-8'>
                  <div className='flex flex-col gap-4'>
                    <h6>Table of Contents</h6>
                    <ol className='list-none'>
                      {toc.map(({ id, level, text }) => (
                        <li className='ml-3'>
                          <a href={`#${id}`}>{text}</a></li>
                      ))}
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
          </Container >
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
        </div >
        <BackgroundGradient />
      </section >
    </div >
  )
}

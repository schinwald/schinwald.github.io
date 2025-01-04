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
import { Callout } from '~/components/callout';
import { Code } from '~/components/code';
import { cn } from '~/utils/classname';
import { Children } from 'react';
import { format, isPast, parseISO } from 'date-fns';
import { BiSolidCircle as CircleIcon } from "react-icons/bi";
import { IoEyeOffOutline as EyeOffIcon } from "react-icons/io5";


const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const safeParseISO = (date: string) => {
  try {
    return parseISO(date)
  } catch {
    return null
  }
}

const safeFormat = (date?: Date | null) => {
  if (!date) return null

  try {
    return format(date, "MMM dd, yyyy");
  } catch {
    return null
  }
}

export default function() {
  const { code, frontmatter, toc, id } = useLoaderData<Loader>();
  const publishedAt = safeParseISO(frontmatter.meta.publishedAt)
  const isWaitingForPublication = !publishedAt || isPast(publishedAt)
  const isLive = frontmatter.meta.isHidden || isWaitingForPublication ? false : true

  const Component = useMemo(() => getMDXComponent(code, MDX_GLOBAL_CONFIG), [code])

  return (
    <div className='relative'>
      <Navigation />
      <section className='w-screen h-screen'>
        <div className='relative w-screen flex flex-col justify-center items-center text-foreground gap-28'>
          <Container variant='wide'>
            <div>
              <Link to="/" variant='ghost' className='relative'>
                <img src={svg} className='absolute top-[-380px] left-[-220px] scale-[0.2] object-cover' />
              </Link>
            </div>
          </Container>
          <Container variant='narrow'>
            <div className='grid grid-cols-12 auto-rows-min gap-10'>
              <div className='grid grid-cols-subgrid grid-rows-subgrid col-span-9 row-span-3 text-foreground-overlay'>
                <div className='flex flex-col gap-14 col-span-9 row-start-1 row-end-2'>
                  <div className='flex flex-col items-center gap-3'>
                    <p className='font-light'>🗓️ {safeFormat(publishedAt) ?? 'TBD'}</p>
                    <h2 className='text-center'>{frontmatter.title}</h2>
                  </div>
                </div>
                <div className='flex flex-col gap-4 col-span-9 row-start-2 row-end-2'>
                  <div className='aspect-[8/5] bg-[#fff8] rounded-sm overflow-clip'>
                    <img src={frontmatter.image.src} alt={frontmatter.image.alt} />
                  </div>
                  <div className='flex gap-2'>
                    {frontmatter.meta.tags.map((tag) => (
                      <span className='bg-tertiary text-tertiary-foreground rounded-full text-sm px-2 py-0'>{tag}</span>
                    ))}
                  </div>
                </div>
                <article className='flex flex-col gap-10 col-span-9 row-start-3 row-end-3'>
                  <MDXProvider components={{
                    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
                    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
                    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
                    h4: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
                    h5: ({ children, ...props }) => <h5 {...props}>{children}</h5>,
                    h6: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
                    ol: ({ children }) => <ol className='list-decimal flex flex-col gap-4 ml-4 marker:text-tertiary'>{children}</ol>,
                    ul: ({ children }) => <ul className='list-disc flex flex-col gap-4 ml-4 marker:text-tertiary'>{children}</ul>,
                    li: ({ children }) => <li className='space-y-4'>{children}</li>,
                    img: ({ src, alt }) => (
                      <div className='rounded-sm overflow-clip'>
                        <img src={src} alt={alt} className='w-full' />
                      </div>
                    ),
                    'checklist-item': ({ isChecked, children }) => (
                      <li className='list-none space-y-4'>
                        {Children.map(children, (child, index) => {
                          if (index === 0) {
                            return (
                              <div className='flex flex-row items-center gap-2'>
                                <input type='checkbox' defaultChecked={isChecked} className="-ml-5" />
                                {child}
                              </div>
                            )
                          }

                          return child;
                        })}
                      </li>
                    ),
                    callout: Callout,
                    code: Code,
                  }}>
                    <Component />
                  </MDXProvider>
                </article >
              </div>
              {import.meta.env.DEV ?
                <div className='col-span-3 col-start-10 row-start-1 flex flex-col justify-end'>
                  {isLive ? (
                    <p className='text-success flex flex-row items-center gap-2'><CircleIcon className='animate-pulse size-2' />Live</p>
                  ) : (
                    <p className='text-destructive flex flex-row items-center gap-2'><EyeOffIcon />Hidden</p>
                  )}
                </div>
                : null}
              <div className='col-span-3 flex flex-col gap-6 col-start-10 row-start-2 row-span-2'>
                <div className='sticky top-10 flex flex-col gap-8'>
                  <div className='flex flex-col gap-4'>
                    <h6>Table of Contents</h6>
                    <ol className='list-none'>
                      {toc.map(({ id, level, text }) => (
                        <li key={id} className={cn({ 'ml-3': level === 3, 'ml-4': level === 4, 'ml-5': level === 5 })}>
                          <a href={`#${id}`}>{text}</a></li>
                      ))}
                    </ol>
                  </div>
                  <div className='flex flex-col items-start gap-3'>
                    <Link to='https://buymeacoffee.com/schinwald' variant='ghost' size='minimal' className='flex flex-row gap-2'>
                      <BuyMeACoffeeIcon className='text-yellow-200 size-4' />
                      <span>
                        Buy me a coffee
                      </span>
                    </Link>
                    <Button variant='ghost' size='minimal' className='flex flex-row gap-2'>
                      <FullHeartIcon className='text-red-500 size-4' />
                      <span>
                        Like
                      </span>
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

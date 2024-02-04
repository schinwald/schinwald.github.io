import React from 'react'
import { Header } from '@/components/header'
import { Socials } from '@/components/socials'
import profileImage from '@/assets/images/profile.webp'
import { Container } from '@/layouts/container'
import { Link } from './primitives/ui/link'

type Props = {
  className?: string
}

const About: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className='relative w-screen flex flex-col justify-center items-center'>
      <Container variant='narrow'>
        <div className='flex flex-col sm:flex-row gap-10 z-30'>
          <div className='flex flex-row'>
            <div className='w-full px-16 sm:p-0'>
              <div className='relative w-full sm:w-[200px] md:w-[300px] aspect-square bg-tertiary rounded-[1000px] shadow-lg'>
                <div className='absolute w-full aspect-[3/4] rounded-b-[1000px] overflow-clip bottom-[-1px]'>
                  <img
                    className='absolute bottom-0 w-full aspect-[300/360] object-cover scale-x-[-100%] -rotate-6'
                    src={profileImage.src}
                  >
                  </img>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <Header
                className='text-left'
                title='About Me'
                align='left'
                variant='typist'
              />
              <p className='text-white opacity-70'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>
            <div>
              <Link
                href='/about/learn-more'
                variant='default'
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className='h-[100px] w-[calc(100%+2rem)] bg-background-overlay rotate-6 mt-20 flex flex-row justify-center items-center shadow-lg'>
        <Socials />
        <div className='absolute h-[1000px] w-[calc(100%+200rem)] bg-gradient-to-t from-background-soft to-background-overlay bottom-[100%]'>
        </div>
      </div>
    </div>
  )
}

export { About }

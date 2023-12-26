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
    <div className='relative w-screen flex flex-col justify-center items-center mt-40'>
      <Container>
        <div className='flex flex-row gap-10 z-30'>
          <div className='flex flex-col'>
            <div className='relative h-[300px] w-[300px] bg-tertiary rounded-[1000px] shadow-lg'>
              <div className='absolute h-[400px] w-[300px] rounded-b-[1000px] overflow-clip bottom-[-1px]'>
                <img
                  className='absolute bottom-0 h-[360px] object-cover scale-x-[-100%] -rotate-6'
                  src={profileImage.src}
                >
                </img>
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
        <div className='absolute h-[10000px] w-[calc(100%+200rem)] bg-background-soft bottom-[100%]'>
        </div>
      </div>
    </div>
  )
}

export { About }

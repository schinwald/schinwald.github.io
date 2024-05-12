import React from 'react'
import { cn } from '@/utils/classname'
import { AiFillLinkedin as LinkedInIcon } from 'react-icons/ai'
import { AiOutlineGithub as GitHubIcon } from 'react-icons/ai'
import { AiOutlineTwitter as TwitterIcon } from 'react-icons/ai'


type SocialsProps = {
  className?: string
  variant?: 'default' | 'minimal'
}

const Socials: React.FC<SocialsProps> = ({
  className,
  variant = 'default'
}) => {
  switch (variant) {
    case 'default':
      return (
        <ul
          className={cn(
            className,
            "flex flex-row gap-8 justify-center items-center text-foreground"
          )}
        >
          <li>
            <a
              className='flex flex-row items-center gap-2'
              href="https://www.github.com/schinwald"
              target="_blank"
            >
              <GitHubIcon className='w-7 h-7' />
              <h4 className='hidden sm:block'>
                Github
              </h4>
            </a>
          </li>
          <li>
            <a
              className='flex flex-row items-center gap-2'
              href="https://www.linkedin.com/in/schinwald"
              target="_blank"
            >
              <LinkedInIcon className='w-7 h-7' />
              <h4 className='hidden sm:block'>
                LinkedIn
              </h4>
            </a>
          </li>
          <li>
            <a
              className='flex flex-row items-center gap-2'
              href="https://www.twitter.com/schinwald"
              target="_blank"
            >
              <TwitterIcon className='w-7 h-7' />
              <h4 className='hidden sm:block'>
                Twitter
              </h4>
            </a>
          </li>
        </ul>
      )
    case 'minimal':
      return (
        <ul
          className={cn(
            "flex flex-row gap-2 justify-center items-center text-foreground",
            className
          )}
        >
          <li>
            <a
              className='flex flex-row items-center gap-2'
              href="https://www.github.com/schinwald"
              target="_blank"
            >
              <GitHubIcon className='w-8 h-8' />
            </a>
          </li>
          <li>
            <a
              className='flex flex-row items-center gap-2'
              href="https://www.linkedin.com/in/schinwald"
              target="_blank"
            >
              <LinkedInIcon className='w-8 h-8' />
            </a>
          </li>
          <li>
            <a
              className='flex flex-row items-center gap-2'
              href="https://www.twitter.com/schinwald"
              target="_blank"
            >
              <TwitterIcon className='w-8 h-8' />
            </a>
          </li>
        </ul>
      )
  }
}

export { Socials }

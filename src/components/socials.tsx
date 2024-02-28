import React from 'react'
import { cn } from '@/utils/classname'
import { AiFillLinkedin as LinkedInIcon } from 'react-icons/ai'
import { AiOutlineGithub as GitHubIcon } from 'react-icons/ai'
import { AiOutlineTwitter as TwitterIcon } from 'react-icons/ai'
import { AiFillInstagram as InstagramIcon } from 'react-icons/ai'
import { FaDiscord as DiscordIcon } from 'react-icons/fa'
import { CiCircleMore as DotsIcon } from "react-icons/ci"


type SocialsProps = {
  className?: string
}

const Socials: React.FC<SocialsProps> = ({ className }) => {
  return (
    <ul
      className={cn(
        className,
        "flex flex-row gap-10 justify-center items-center text-foreground"
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
      {/* <li> */}
      {/*   <a */}
      {/*     className='flex flex-row items-center gap-2' */}
      {/*     href="" */}
      {/*     target="_blank" */}
      {/*   > */}
      {/*     <InstagramIcon className='w-7 h-7' /> */}
      {/*     <h4 className='hidden sm:block'> */}
      {/*       Instagram */}
      {/*     </h4> */}
      {/*   </a> */}
      {/* </li> */}
      {/* <li> */}
      {/*   <a */}
      {/*     className='flex flex-row items-center gap-2' */}
      {/*     href="" */}
      {/*     target="_blank" */}
      {/*   > */}
      {/*     <DiscordIcon className='w-7 h-7' /> */}
      {/*     <h4 className='hidden sm:block'> */}
      {/*       Discord */}
      {/*     </h4> */}
      {/*   </a> */}
      {/* </li> */}
      <li>
        <a
          className='flex flex-row items-center gap-2'
          href=""
          target="_blank"
        >
          <DotsIcon className='w-7 h-7' />
          <h4 className='hidden sm:block'>
            More
          </h4>
        </a>
      </li>
    </ul>
  )
}

export { Socials }

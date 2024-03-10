import { signIn, signOut } from 'auth-astro/client'
import React from 'react'
import { Button } from '@/components/primitives/ui/button'
import { BorderRotating } from '@/components/border-rotating'
import { AiOutlineGithub as GitHubIcon } from 'react-icons/ai'
import { AiOutlineGoogle as GoogleIcon } from 'react-icons/ai'
import { AiOutlineFacebook as FacebookIcon } from 'react-icons/ai'
import { FaDiscord as DiscordIcon } from 'react-icons/fa'

type AuthenticationProps = {
  className?: string
}

const Authentication: React.FC<AuthenticationProps> = () => {
  return (
    <div className='w-screen h-screen bg-background text-foreground flex flex-row justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <h2 className='z-20'>Sign-in</h2>
          <BorderRotating
            className='w-full'
          >
            <div className='flex flex-row justify-center'>
              <div className='text-center w-full max-w-[500px]'>
                <p>Authenticate with one of the providers below to ensure the integrity of your testimonial.</p>
              </div>
            </div>
            <div className='flex flex-col items-center gap-4'>
              <Button
                className='flex flex-row items-center gap-1 w-full max-w-[300px]'
                variant='outline'
                onClick={() => signIn('github')}
              >
                <GitHubIcon/>
                GitHub
              </Button>
              <Button
                className='flex flex-row items-center gap-1 w-full max-w-[300px]'
                variant='outline'
                onClick={() => signIn('google')}
              >
                <GoogleIcon/>
                Google
              </Button>
              {/* <Button */}
              {/*   className='flex flex-row items-center gap-1 w-full max-w-[300px]' */}
              {/*   variant='outline' */}
              {/*   onClick={() => signIn('facebook')} */}
              {/* > */}
              {/*   <FacebookIcon/> */}
              {/*   Facebook */}
              {/* </Button> */}
              {/* <Button */}
              {/*   className='flex flex-row items-center gap-1 w-full max-w-[300px]' */}
              {/*   variant='outline' */}
              {/*   onClick={() => signIn('discord')} */}
              {/* > */}
              {/*   <DiscordIcon/> */}
              {/*   Discord */}
              {/* </Button> */}
            </div>
          </BorderRotating>
        </div>
      </div>
    </div>
  )
}

export { Authentication }

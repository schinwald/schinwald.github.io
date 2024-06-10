import React from 'react'
import { Button } from '~/components/primitives/ui/button'
import { BorderRotating } from '~/components/border-rotating'
import { AiOutlineGithub as GitHubIcon } from 'react-icons/ai'
import { AiOutlineGoogle as GoogleIcon } from 'react-icons/ai'

const signIn = async (provider: 'google' | 'github') => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ provider })
  })

  if (!response.ok) {
    return
  }

  window.location.href = response.url
}

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
            </div>
          </BorderRotating>
        </div>
      </div>
    </div>
  )
}

export { Authentication }

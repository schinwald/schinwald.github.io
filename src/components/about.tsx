import React from 'react'
import { Header } from '@/components/header'
import { Socials } from '@/components/socials'
import profileImage from '@/assets/images/profile.webp'
import { Container } from '@/layouts/container'
import { Link } from './primitives/ui/link'

type AboutProps = {
  className?: string
}

const About: React.FC<AboutProps> = () => {
  const yearsOfExperience = (() => {
    const previousYear = new Date('2022-06-01T00:00:00')
    const currentYear = new Date()
    const years = (currentYear.getTime() - previousYear.getTime()) / (1000 * 60 * 60 * 24 * 365)
    const yearsRemainder = years % 1
    const includeHalf = yearsRemainder > 0.25 && yearsRemainder < 0.75
    if (includeHalf) return `${Math.floor(years)} and a half`
    return `${Math.round(years)}`
  })()

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
                {`
                    Hello! I am James, an experienced software engineer specializing in full-stack development. With a passion for problem-solving and innovation, I've contributed to diverse projects across [mention industries or technologies].
                    My approach to work is guided by [mention your key values or principles], ensuring a focus on quality and collaboration. Outside of coding, I enjoy [mention your hobbies or interests], finding inspiration in [mention activities or pursuits].
                    Feel free to explore my portfolio and reach out for collaboration opportunities. Thank you for visiting!
                `} 
                {/* Hello and welcome to my portfolio! My name is James, and I am a passionate and dedicated software engineer with about ${yearsOfExperience} years of experience in the industry. */}
                {/* I specialize in full-stack development, and I'm always eager to tackle new challenges and explore emerging technologies. I have had the privilege of working on a diverse range */}
                {/* of projects, from [mention notable projects or industries you've worked in]. These experiences have honed my technical skills and shaped my approach to */}
                {/* problem-solving. In my work, I prioritize [mention your key values or principles, e.g., collaboration, innovation, user-centric design, etc.]. I believe that */}
                {/* effective communication and teamwork are essential for delivering high-quality software solutions that meet both user needs and business objectives. Outside of */}
                {/* coding, you'll often find me tinkering with my operating system, building. I'm passionate about [mention any relevant causes or interests] and enjoy [mention any personal pursuits or activities]. */}
                {/* Whether you're a fellow developer, a potential employer, or simply someone curious about the world of software engineering, I invite you to explore my portfolio and learn more about my work. Feel free to reach out if you have any questions or would like to discuss potential collaborations. */}
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

import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { LuVolume2 as Volume2 } from "react-icons/lu";
import { Button } from '~/components/primitives/ui/button';
import * as experience from '~/assets/images/experience';
import * as education from '~/assets/images/education';
import { TbBriefcase2Filled as ExperienceIcon } from "react-icons/tb";
import { RiGraduationCapFill as EducationIcon } from "react-icons/ri";
import { Container } from '~/layouts/container';

export default function() {
  return (
    <div className='relative'>
      <Navigation />
      <section className='bg-background w-screen h-screen'>
        <div className='relative w-screen flex flex-col justify-center items-center'>
          <Container variant='narrow'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
              <div className='grid grid-cols-6 gap-4'>
                <div className='relative col-span-6 flex flex-col justify-end h-[300px]'>
                  <h1 className='text-foreground'>
                    Hello!
                  </h1>
                  <h1 className='absolute opacity-5 left-1/2 -translate-x-1/2 text-foreground text-[40rem] pointer-events-none'>
                    Hello!
                  </h1>
                </div>
                <div className='grid grid-cols-subgrid col-span-4 gap-4'>
                  <div className='col-span-4'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md'>
                      <div className='flex flex-col gap-4'>
                        <h3>Origin</h3>
                        <p>
                          In the early summer of 1995, my mom, Heather, gave birth to two twin boys, Matthew and James (me!).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Keyboard</h3>
                        <p>I'm currently rocking the <a className='text-primary' href="https://josefadamcik.github.io/SofleKeyboard/build_guide_rgb.html">Sofle v2.1</a>; a custom split keyboard with 58 keys. It's a great keyboard for typing, but I'm also a big fan of the split layout, as it allows me to have a more ergonomic typing experience. Here's a blog on the <a className='text-primary'>build process</a>.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Neovim</h3>
                        <p>My editor of choice is Neovim. I've been using it for a while now, and I'm really loving it. It's fast, it's extensible, and it's just the best editor I've ever used.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Obsidian</h3>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Tinkering</h3>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Woodworking</h3>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Hiking</h3>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Learning</h3>
                        <p>Spanish, </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Open Source</h3>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Animation</h3>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-2 row-span-2'>
                  <div className='flex flex-col gap-4'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-1'>
                          <h3 className='font-math mb-[0.1rem]'>
                            /ˈʃɪnˌwɔːld/
                          </h3>
                          <div className='text-primary'>
                            <Button variant='ghost' size='minimal'>
                              <Volume2 className='w-5 h-5' />
                            </Button>
                          </div>
                        </div>
                        <hr className='opacity-30 -mt-3' />
                        <p className='text-foreground'>
                          <span className='italic'>sh•in•wo•ld</span>
                          <br />
                          Try to say it with your heaviest Austrian accent.
                          <br />
                          It makes it funnier :)
                        </p>
                      </div>
                    </div>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md'>
                      <div className='flex flex-col gap-4'>
                        <h3>Experience</h3>
                        <div className='flex flex-col gap-2'>
                          <div className='border border-[#fff3] p-3 rounded-sm flex flex-col gap-4'>
                            <div className='flex flex-row items-center gap-3'>
                              <img className='w-8' src={experience.devopieLogo.url} alt={experience.devopieLogo.alt} />
                              <div>
                                <h6 className='text-md -my-2'>Devopie</h6>
                                <p className='font-thin text-sm -my-2'>Software Engineer</p>
                              </div>
                            </div>
                          </div>
                          <div className='border border-[#fff3] p-3 rounded-sm flex flex-col gap-4'>
                            <div className='flex flex-row items-center gap-3'>
                              <img className='w-8' src={experience.nauticalCommerceLogo.url} alt={experience.nauticalCommerceLogo.alt} />
                              <div>
                                <h6 className='text-md -my-2'>Nautical Commerce</h6>
                                <p className='font-thin text-sm -my-2'>Software Engineer</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md'>
                      <div className='animate-fade-in flex flex-col gap-4'>
                        <h3>Education</h3>
                        <div className='border border-[#fff3] p-3 rounded-sm flex flex-col gap-4'>
                          <div className='flex flex-row items-center gap-3'>
                            <img className='w-8' src={education.universityOfGuelphLogo.url} alt={education.universityOfGuelphLogo.alt} />
                            <div>
                              <h6 className='text-md -my-2'>University of Guelph</h6>
                              <p className='font-thin text-sm -my-2'>Bachelor of Computing</p>
                            </div>
                          </div>
                          <hr className='opacity-30' />
                          <div className='flex flex-row items-end justify-between gap-3'>
                            <p className='font-thin text-sm leading-[1rem]'>
                              Major: Computer Science
                              <br />
                              Minor: Mathematics
                            </p>
                            <p className='font-thin text-sm -my-1'>
                              GPA: 3.7
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </Container>
        </div>
      </section >
      <BackgroundGradient />
    </div >
  )
}

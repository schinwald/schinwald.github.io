import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { LuVolume2 as Volume2 } from "react-icons/lu";
import { Button } from '~/components/primitives/ui/button';
import * as experience from '~/assets/images/experience';
import * as education from '~/assets/images/education';
import {
  FaStreetView as OriginIcon,
  FaTree as OutdoorsIcon,
  FaBook as LearningIcon,
  FaCode as OpenSourceIcon,
  FaHammer as WoodworkingIcon,
  FaWrench as TinkeringIcon,
} from "react-icons/fa";
import { MdAnimation as AnimationIcon } from "react-icons/md";
import { TbBriefcase2Filled as ExperienceIcon } from "react-icons/tb";
import { RiGraduationCapFill as EducationIcon } from "react-icons/ri";
import { FaCircle as DotfilesIcon } from "react-icons/fa6";
import { Container } from '~/layouts/container';

export default function() {
  return (
    <div>
      <Navigation />
      <section className='w-screen h-screen'>
        <div className='relative overflow-hidden w-screen flex flex-col justify-center items-center'>
          <Container variant='narrow'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
              <div className='grid grid-cols-6 gap-5'>
                <div className='relative col-span-6 flex flex-col justify-end h-[300px]'>
                  <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-foreground to-tertiary'>
                    Hello!
                  </h1>
                  <h1 className='absolute opacity-5 left-1/2 -translate-x-1/2 text-foreground text-[40rem] pointer-events-none'>
                    Hello!
                  </h1>
                </div>
                <div className='grid grid-cols-subgrid col-span-4 gap-5'>
                  <div className='col-span-4'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md'>
                      <div className='flex flex-col gap-8'>
                        <article className='flex flex-col gap-4'>
                          <div className='flex flex-row items-center gap-2'>
                            <h3>Early Life</h3>
                            <OriginIcon className='w-5 h-5 text-green-600' />
                          </div>
                          <p>
                            In the early summer of 1995, my mom, Heather, gave birth to two twin boys, Matthew and James (me!).
                          </p>
                        </article>
                        <article className='flex flex-col gap-4'>
                          <div className='flex flex-row items-center gap-2'>
                            <h3>Currently</h3>
                          </div>
                        </article>
                        <article className='flex flex-col gap-4'>
                          <div className='flex flex-row items-center gap-2'>
                            <h3>Values</h3>
                          </div>
                          <p>
                            I tend to
                          </p>
                        </article>
                        <article className='flex flex-col gap-4'>
                          <div className='flex flex-row items-center gap-2'>
                            <h3>Beliefs</h3>
                          </div>
                          <p>
                            I'm agnostic. I believe there is probably something more to life than just the things we do and that there is a lot we don't know. My beliefs are my own though and I don't impose them on anyone else.
                          </p>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Learning</h3>
                          <LearningIcon className='w-5 h-5 text-violet-500' />
                        </div>
                        <p>
                          Yo también estoy aprendiendo español.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Tinkering</h3>
                          <TinkeringIcon className='w-5 h-5 text-yellow-300' />
                        </div>
                        <p>I still have a lot to learn when it comes to electrical work, but I have a <a className='text-primary'>insert model</a> and have been using it on various simple soldering projects to get better at it.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Woodworking</h3>
                          <WoodworkingIcon className='w-5 h-5 text-yellow-700' />
                        </div>
                        <p>I think this stems from my love for making stuff, but recently I've been taking up woodworking and have really been enjoying it. I made my <a className='text-primary' href="">desk</a> out of a birch vaneer plywood and applied a polyurethane coating to protect it from coffee spills.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Outdoors</h3>
                          <OutdoorsIcon className='w-5 h-5 text-green-600' />
                        </div>
                        <p>In another life I was a camp counsellor with experience portaging through Algonquin Park for weeks on end. Now days, I do more ✨glamping✨, but I would love to get back to more serious camping soon.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-4'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Animation</h3>
                          <AnimationIcon className='w-5 h-5 text-blue-500' />
                        </div>
                        <p>As a kid, I would make stick figure animations with <a className='text-primary' href="https://pivotanimator.net/">Pivot Animator</a>. I loved learning about different animating techniques and would often post my creations on forums for people to critique. To this day, I still get a lot of joy from a jaw dropping animation. I think that's why I enjoy watching <span className='underline decoration-dashed decoration-tertiary italic'>sakuga</span> in anime so much.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 row-span-1'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Dotfiles</h3>
                          <DotfilesIcon className='w-5 h-5 text-blue-500' />
                        </div>
                        <p>I have been maintaining my <a className='text-primary' href="https://github.com/schinwald/dotfiles">dotfiles</a> to keep track of my configurations.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Open Source</h3>
                          <OpenSourceIcon className='w-5 h-5 text-red-500' />
                        </div>
                        <p>I strive to make open source contributions to projects that I use. One day I would love to be the core maintainer of my own open source project.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Keyboard</h3>
                        <p>I'm currently rocking the <a className='text-primary' href="https://josefadamcik.github.io/SofleKeyboard/build_guide_rgb.html">Sofle v2.1</a>; a custom split keyboard with 58 keys. It's a great keyboard for typing, but I'm also a big fan of the split layout, as it allows me to have a more ergonomic typing experience.</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Neovim</h3>
                        <p>My editor of choice is Neovim. I've been using it for a while now, and I'm really loving it. It's fast, it's extensible, and it's just the best editor I've ever used (despite what the haters think!).</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md w-full h-full'>
                      <div className='flex flex-col gap-4'>
                        <h3>Obsidian</h3>
                        <p>I never really grew up taking notes, but Obsidian has made note-taking a breeze.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-2 row-span-2'>
                  <div className='flex flex-col gap-5'>
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
                        <span className='italic'>sh•in•wo•ld</span>
                        <p className='text-foreground'>
                          Try to say it with your heaviest Austrian accent.
                        </p>
                        <span className='font-thin'>It makes it funnier :)</span>
                      </div>
                    </div>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md'>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Experience</h3>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <div className='border border-[#fff3] p-3 rounded-sm flex flex-col gap-4'>
                            <div className='flex flex-row items-center gap-3'>
                              <img className='w-8' src={experience.nauticalCommerceLogo.url} alt={experience.nauticalCommerceLogo.alt} />
                              <div>
                                <h6 className='text-md -my-2'>Nautical Commerce</h6>
                                <p className='font-thin text-sm -my-2'>Software Engineer</p>
                              </div>
                            </div>
                          </div>
                          <div className='border border-[#fff3] p-3 rounded-sm flex flex-col gap-4'>
                            <div className='flex flex-row items-center gap-3'>
                              <img className='w-8' src={experience.devopieLogo.url} alt={experience.devopieLogo.alt} />
                              <div>
                                <h6 className='text-md -my-2'>Devopie</h6>
                                <p className='font-thin text-sm -my-2'>Software Engineer</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='relative bg-background-overlay text-foreground-overlay p-6 rounded-md'>
                      <div className='animate-fade-in flex flex-col gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Education</h3>
                        </div>
                        <div className='border border-[#fff3] p-3 rounded-sm flex flex-col gap-4'>
                          <div className='flex flex-row items-center gap-3'>
                            <img className='w-8' src={education.universityOfGuelphLogo.url} alt={education.universityOfGuelphLogo.alt} />
                            <div>
                              <h6 className='text-md -my-2'>University of Guelph</h6>
                              <p className='font-thin text-sm -my-2'>Bachelor of Computing</p>
                            </div>
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

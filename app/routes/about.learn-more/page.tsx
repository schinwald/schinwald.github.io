import { Navigation } from '~/components/navigation';
import { BackgroundGradient } from '~/components/background-gradient';
import { LuVolume2 as Volume2 } from "react-icons/lu";
import { Button } from '~/components/primitives/ui/button';
import * as Dictionary from '~/components/dictionary';
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
import * as Card from './components/card';
import { MdAnimation as AnimationIcon } from "react-icons/md";
import { TbBriefcase2Filled as ExperienceIcon } from "react-icons/tb";
import { RiGraduationCapFill as EducationIcon } from "react-icons/ri";
import { FaCircle as DotfilesIcon } from "react-icons/fa6";
import { Container } from '~/layouts/container';
import pronunciation from '~/assets/audio/pronounciation.mp3';
import { Howl } from 'howler';

export default function() {
  const pronunciationSound = new Howl({ src: pronunciation });

  return (
    <div>
      <Navigation />
      <section className='w-screen h-screen'>
        <div className='relative overflow-hidden w-screen flex flex-col justify-center items-center'>
          <Container variant='narrow'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
              <div className='grid grid-cols-6 gap-5'>
                <div className='relative col-span-6 flex flex-col justify-end h-[300px]'>
                  <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-foreground to-tertiary'>
                    Hello!
                  </h1>
                  <h1 className='absolute opacity-[2%] left-1/2 -translate-x-1/2 text-foreground text-[40rem] pointer-events-none'>
                    Hello!
                  </h1>
                </div>
                <div className='grid grid-cols-subgrid col-span-4 gap-5'>
                  <div className='col-span-4'>
                    <Card.Root>
                      <article className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Life</h3>
                          <OriginIcon className='w-5 h-5 text-green-600' />
                        </div>
                        <p>
                          I was born in the early summer of 1995 in Rhinebeck, New York, alongside my twin brother. My earliest years were spent in Red Hook, NY, before our family embarked on a unique adventure, living in Honduras and Nicaragua for a year and then moving to Buenos Aires, Argentina, for four years. My dad’s work at Tiempos del Mundo, an international newspaper, brought us to South America, where I had my first exposure to a different culture and language. I quickly picked up Spanish and embraced the local love of soccer. Watching Lionel Messi dominate headlines and pitches inspired me to play soccer as much as I could.
                        </p>
                        <p>
                          When we returned to Canada, we settled in Guelph, Ontario, where I’ve lived ever since. Thanks to speaking English at home and my mom’s French Canadian heritage, the transition felt natural. School life was a blend of creativity and independence for me. I spent hours practicing ping pong against a flipped-up table or shooting hoops at our basketball net, often playing by myself. Video games became another outlet, though sharing one computer with my two brothers led to plenty of fights over whose turn it was—especially during World of Warcraft raids. I also had a strong passion for art and once dreamed of becoming an animator, filling sketchbooks with drawings as I imagined a creative future.
                        </p>
                        <p>
                          High school introduced me to programming through basic classes in web development and Java, but these experiences didn’t immediately spark a career interest. Despite my curiosity about technology, I didn’t find much encouragement from my teachers to pursue programming as a viable path.
                        </p>
                        <p>
                          After graduating, I took time off to explore my options, working a variety of odd jobs—including serving at a banquet hall, inspecting automotive parts, and assembling hoses in a factory. These experiences, while challenging, reinforced my determination to find a career I was passionate about.
                        </p>
                        <p>
                          Eventually, I committed to software engineering, driven by my love for programming and the desire to understand the technology I use daily. I enrolled in a computer science program and quickly discovered my passion for web development, scalable applications, and even game development. I’m also deeply interested in creating streamlined development environments that enhance productivity and creativity.
                        </p>
                        <p>
                          Looking back, the journey—from my global upbringing to odd jobs and self-discovery—has shaped who I am today. I’m grateful for the experiences that brought me to a career I truly love.
                        </p>
                      </article>
                    </Card.Root>
                  </div>
                  <div className='col-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Learning</h3>
                          <LearningIcon className='w-5 h-5 text-violet-400' />
                        </div>
                        <p>
                          Estoy aprendiendo español.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Tinkering</h3>
                          <TinkeringIcon className='w-5 h-5 text-yellow-300' />
                        </div>
                        <p>I still have a lot to learn when it comes to electrical work, but I have a <Dictionary.Root><Dictionary.Word>TS100</Dictionary.Word><Dictionary.Explanation><p className='text-sm'>A soldering iron tip that can be powered by a DC input voltage between 12V-24V, via a 5.5mm barrel connector.</p></Dictionary.Explanation></Dictionary.Root> that I can use to tinker with circuits.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Woodworking</h3>
                          <WoodworkingIcon className='w-5 h-5 text-yellow-600' />
                        </div>
                        <p>I think this stems from my love for making stuff, but recently I've been taking up woodworking and have really been enjoying it. I made my <a className='text-primary' href="">desk</a> out of a birch vaneer plywood and applied a polyurethane coating to protect it from coffee spills.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Outdoors</h3>
                          <OutdoorsIcon className='w-5 h-5 text-green-600' />
                        </div>
                        <p>In another life I was a camp counsellor with experience portaging through Algonquin Park for weeks on end. Now days, I do more ✨glamping✨, but I would love to get back to more serious camping soon.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-4'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Animation</h3>
                          <AnimationIcon className='w-5 h-5 text-blue-500' />
                        </div>
                        <p>As a kid, I would make stick figure animations with <a className='text-primary' href="https://pivotanimator.net/">Pivot Animator</a>. I loved learning about different animating techniques and would often post my creations on forums for people to critique. To this day, I still get a lot of joy from a jaw dropping animation. I think that's why I enjoy watching <Dictionary.Root><Dictionary.Word>sakuga</Dictionary.Word><Dictionary.Explanation><p className='text-sm'><span className='italic'>Sakuga</span> is a Japanese term that refers to hand-drawn animations in anime production, but the western population has morphed the meaning to represent <span className='font-bold'>quality animation</span>.</p></Dictionary.Explanation></Dictionary.Root> in anime so much.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2 row-span-1'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Dotfiles</h3>
                          <DotfilesIcon className='w-5 h-5 text-blue-500' />
                        </div>
                        <p>I have been maintaining my <a className='text-primary' href="https://github.com/schinwald/dotfiles">dotfiles</a> to keep track of my configurations.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Open Source</h3>
                          <OpenSourceIcon className='w-5 h-5 text-red-500' />
                        </div>
                        <p>I strive to make open source contributions to projects that I use. One day I would love to be the core maintainer of my own open source project.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <h3>Keyboard</h3>
                        <p>I'm currently rocking the <a className='text-primary' href="https://josefadamcik.github.io/SofleKeyboard/build_guide_rgb.html">Sofle v2.1</a>; a custom split keyboard with 58 keys. It's a great keyboard for typing, but I'm also a big fan of the split layout, as it allows me to have a more ergonomic typing experience.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <h3>Neovim</h3>
                        <p>My editor of choice is Neovim. I've been using it for a while now, and I'm really loving it. It's fast, it's extensible, and it's just the best editor I've ever used (despite what the haters think!).</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className='col-span-2 row-span-2'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <h3>Obsidian</h3>
                        <p>I never really grew up taking notes, but Obsidian has made note-taking a breeze.</p>
                      </div>
                    </Card.Root>
                  </div>
                </div>
                <div className='col-span-2 row-span-2'>
                  <div className='flex flex-col gap-5'>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-1'>
                          <h3 className='font-math mb-[0.1rem]'>
                            /ˈʃɪnˌwɔːld/
                          </h3>
                          <div className='text-primary'>
                            <Button variant='ghost' size='minimal' onClick={() => pronunciationSound.play()} >
                              <Volume2 className='w-5 h-5' />
                            </Button>
                          </div>
                        </div>
                        <hr className='-my-6 border-[#fff2]' />
                        <span className='italic'>sh•in•wahl•d</span>
                        <p className='text-foreground'>
                          Try to say it with your heaviest Austrian accent. It makes it funnier :)
                        </p>
                      </div>
                    </Card.Root>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Experience</h3>
                        </div>
                        <div className='flex flex-col gap-3'>
                          <div className='transition-all duration-200 outline outline-1 outline-[#fff2] hover:outline-2 hover:outline-[#fff7] p-3 rounded-sm flex flex-row items-start gap-2 max-h-[58px] overflow-hidden cursor-pointer'>
                            <img className='w-8' src={experience.nauticalCommerceLogo.url} alt={experience.nauticalCommerceLogo.alt} />
                            <div className='flex flex-col gap-6'>
                              <div className='flex flex-col justify-between h-8 py-[2px]'>
                                <h6 className='text-md font-bold'>Nautical Commerce</h6>
                                <p className='font-thin text-sm'>Software Engineer</p>
                              </div>
                              <div className='flex flex-col justify-between h-8 py-[2px]'>
                                <h6 className='text-md font-bold'>2024 - Present</h6>
                                <p className='font-thin text-sm'>Toronto, ON</p>
                              </div>
                            </div>
                          </div>
                          <div className='transition-all duration-200 outline outline-1 outline-[#fff2] hover:outline-2 hover:outline-[#fff7] p-3 rounded-sm flex flex-row items-start gap-2 max-h-[58px] overflow-hidden cursor-pointer'>
                            <img className='w-8' src={experience.devopieLogo.url} alt={experience.devopieLogo.alt} />
                            <div className='flex flex-col gap-6'>
                              <div className='flex flex-col justify-between h-8 py-[2px]'>
                                <h6 className='text-md font-bold'>Devopie Inc.</h6>
                                <p className='font-thin text-sm'>Software Engineer</p>
                              </div>
                              <div className='flex flex-col justify-between h-8 py-[2px]'>
                                <h6 className='text-md font-bold'>2022 - 2024</h6>
                                <p className='font-thin text-sm'>Hamilton, ON</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Root>
                    <Card.Root>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-row items-center gap-2'>
                          <h3>Education</h3>
                        </div>
                        <div className='flex flex-col gap-3'>
                          <div className='transition-all duration-100 outline outline-1 outline-[#fff3] hover:outline-2 hover:outline-[#fff7] p-3 rounded-sm flex flex-row items-start gap-2 max-h-[58px] overflow-hidden cursor-pointer'>
                            <img className='w-8' src={education.universityOfGuelphLogo.url} alt={education.universityOfGuelphLogo.alt} />
                            <div className='flex flex-col gap-6'>
                              <div className='flex flex-col justify-between h-8 py-[2px]'>
                                <h6 className='text-md font-bold'>University of Guelph</h6>
                                <p className='font-thin text-sm'>Bachelor of Computing</p>
                              </div>
                              <div className='flex flex-col justify-between h-8 py-[2px]'>
                                <h6 className='text-md font-bold'>2017 - 2021</h6>
                                <p className='font-thin text-sm'>Guelph, ON</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Root>
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

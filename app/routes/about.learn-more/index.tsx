import { Howl } from "howler";
import { useEffect, useState } from "react";
import {
  FaBook as LearningIcon,
  FaCode as OpenSourceIcon,
  FaTree as OutdoorsIcon,
  FaWrench as TinkeringIcon,
  FaHammer as WoodworkingIcon,
} from "react-icons/fa";
import { FaCircle as DotfilesIcon } from "react-icons/fa6";
import { LuVolume2 as Volume2 } from "react-icons/lu";
import { MdAnimation as AnimationIcon } from "react-icons/md";
import pronunciation from "~/assets/audio/pronounciation.mp3";
import * as education from "~/assets/images/education";
import * as experience from "~/assets/images/experience";
import { BackgroundGradient } from "~/components/background-gradient";
import { Card } from "~/components/card";
import { Dictionary } from "~/components/dictionary";
import { Header } from "~/components/header";
import { NavigationBar } from "~/components/navigation-bar";
import { Button } from "~/components/primitives/ui/button";
import { Container } from "~/layouts/container";
import { Education, Experience } from "./components";
import { Mapbox, MapboxDetails, MapboxProvider } from "./components/map";
import { meta as actualMeta } from "./meta";
import { loader as actualLoader } from "./server/loader";

export const loader = await actualLoader;
export const meta = actualMeta;

export default function () {
  const pronunciationSound = new Howl({ src: pronunciation });

  const source: [number, number] = [-79.3832, 43.6532];
  const [destination, setDestination] = useState<
    [number, number] | undefined
  >();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setDestination([position.coords.longitude, position.coords.latitude]);
    });
  }, []);

  return (
    <div>
      <section className="h-screen w-screen overflow-x-hidden">
        <div className="relative flex w-screen flex-col items-center justify-center gap-20 pb-32 text-foreground">
          <NavigationBar />
          <Container variant="narrow">
            <Header
              className="row-span-1"
              title="About Me"
              align="left"
              variant="typist"
            />
            <div className="flex h-full w-full flex-col items-center justify-center gap-6">
              <div className="grid grid-cols-6 gap-5">
                <div className="col-span-4 grid grid-cols-subgrid gap-5">
                  <div className="col-span-full">
                    <Card.Root>
                      {destination ? (
                        <MapboxProvider
                          source={source}
                          destination={destination}
                        >
                          <Mapbox className="h-[300px] w-full rounded-sm p-4" />
                          <MapboxDetails>
                            {({ distance }) => {
                              const conclusion = (() => {
                                if (distance < 5) {
                                  return "Woah! We're practically neighbours!";
                                }
                                if (distance < 1000) {
                                  return "Woah! That's really close!";
                                }
                                if (distance > 3000) {
                                  return "Woah! That's so far away!";
                                }
                              })();

                              return (
                                <p>
                                  I'm based in Toronto, ON, which is{" "}
                                  <span className="italic">approximately</span>{" "}
                                  <span className="text-secondary">
                                    {Math.round(distance)} kms
                                  </span>{" "}
                                  away from your current location. {conclusion}
                                </p>
                              );
                            }}
                          </MapboxDetails>
                        </MapboxProvider>
                      ) : (
                        <>
                          <div className="h-[300px] w-full rounded-sm bg-white/10"></div>
                          <p className="">I'm based in Toronto, ON</p>
                        </>
                      )}
                    </Card.Root>
                  </div>
                  <div className="col-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-2">
                          <h3 className="text-shadow-lg">Learning</h3>
                          <LearningIcon className="size-5 text-violet-400" />
                        </div>
                        <p>Estoy aprendiendo español.</p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2 row-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-2">
                          <h3 className="text-shadow-lg">Tinkering</h3>
                          <TinkeringIcon className="size-5 text-yellow-300" />
                        </div>
                        <p>
                          I still have a lot to learn when it comes to
                          electrical work, but I have a{" "}
                          <Dictionary.Root>
                            <Dictionary.Word>TS100</Dictionary.Word>
                            <Dictionary.Explanation>
                              <p className="text-sm text-white">
                                A soldering iron tip that can be powered by a DC
                                input voltage between 12V-24V, via a 5.5mm
                                barrel connector.
                              </p>
                            </Dictionary.Explanation>
                          </Dictionary.Root>{" "}
                          that I can use to tinker with circuits.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2 row-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-2">
                          <h3 className="text-shadow-lg">Woodworking</h3>
                          <WoodworkingIcon className="size-5 text-yellow-600" />
                        </div>
                        <p>
                          I think this stems from my love for making stuff, but
                          recently I've been taking up woodworking and have
                          really been enjoying it. I made my{" "}
                          <a className="text-primary" href="/">
                            desk
                          </a>{" "}
                          out of a birch vaneer plywood and applied a
                          polyurethane coating to protect it from coffee spills.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-2">
                          <h3 className="text-shadow-lg">Outdoors</h3>
                          <OutdoorsIcon className="size-5 text-green-600" />
                        </div>
                        <p>
                          In another life I was a camp counsellor with
                          experience portaging through Algonquin Park for weeks
                          on end. Now days, I do more ✨glamping✨, but I would
                          love to get back to more serious camping soon.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-4">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-2">
                          <h3 className="text-shadow-lg">Animation</h3>
                          <AnimationIcon className="size-5 text-blue-500" />
                        </div>
                        <p>
                          As a kid, I would make stick figure animations with{" "}
                          <a
                            className="text-primary"
                            href="https://pivotanimator.net/"
                          >
                            Pivot Animator
                          </a>
                          . I loved learning about different animating
                          techniques and would often post my creations on forums
                          for people to critique. To this day, I still get a lot
                          of joy from a jaw dropping animation. I think that's
                          why I enjoy watching{" "}
                          <Dictionary.Root>
                            <Dictionary.Word>sakuga</Dictionary.Word>
                            <Dictionary.Explanation>
                              <p className="text-sm">
                                <span className="italic">Sakuga</span> is a
                                Japanese term that refers to hand-drawn
                                animations in anime production, but the western
                                population has morphed the meaning to represent{" "}
                                <span className="font-bold">
                                  quality animation
                                </span>
                                .
                              </p>
                            </Dictionary.Explanation>
                          </Dictionary.Root>{" "}
                          in anime so much.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2 row-span-1">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-2">
                          <h3 className="text-shadow-lg">Dotfiles</h3>
                          <DotfilesIcon className="size-5 text-blue-500" />
                        </div>
                        <p>
                          I have been maintaining my{" "}
                          <a
                            className="text-primary"
                            href="https://github.com/schinwald/dotfiles"
                          >
                            dotfiles
                          </a>{" "}
                          to keep track of my configurations.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-2">
                          <h3 className="text-shadow-lg">Open Source</h3>
                          <OpenSourceIcon className="size-5 text-red-500" />
                        </div>
                        <p>
                          I strive to make open source contributions to projects
                          that I use. One day I would love to be the core
                          maintainer of my own open source project.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2 row-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <h3 className="text-shadow-lg">Keyboard</h3>
                        <p>
                          I'm currently rocking the{" "}
                          <a
                            className="text-primary"
                            href="https://josefadamcik.github.io/SofleKeyboard/build_guide_rgb.html"
                          >
                            Sofle v2.1
                          </a>
                          ; a custom split keyboard with 58 keys. It's a great
                          keyboard for typing, but I'm also a big fan of the
                          split layout, as it allows me to have a more ergonomic
                          typing experience.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <h3 className="text-shadow-lg">Neovim</h3>
                        <p>
                          My editor of choice is Neovim. I've been using it for
                          a while now, and I'm really loving it. It's fast, it's
                          extensible, and it's just the best editor I've ever
                          used (despite what the haters think!).
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                  <div className="col-span-2 row-span-2">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <h3 className="text-shadow-lg">Obsidian</h3>
                        <p>
                          I never really grew up taking notes, but Obsidian has
                          made note-taking a breeze.
                        </p>
                      </div>
                    </Card.Root>
                  </div>
                </div>
                <div className="col-span-2 row-span-2">
                  <div className="flex flex-col gap-5">
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center gap-1">
                          <h3 className="mb-[0.1rem] font-math text-shadow-lg">
                            /ˈʃɪnˌwɔːld/
                          </h3>
                          <div className="text-primary">
                            <Button
                              variant="unstyled"
                              size="minimal"
                              click="squish-normally"
                              onClick={() => pronunciationSound.play()}
                            >
                              <Volume2 className="text-primary size-5" />
                            </Button>
                          </div>
                        </div>
                        <hr className="-my-6 border-[#fff2]" />
                        <span className="italic opacity-50">sh•in•wahl•d</span>
                        <p className="text-foreground">
                          Try to say it with your heaviest Austrian accent. It
                          makes it funnier :)
                        </p>
                      </div>
                    </Card.Root>
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <h3 className="text-shadow-lg">Experience</h3>
                        <div className="flex flex-col gap-4">
                          <Experience
                            logo={experience.relayFinancialLogo}
                            company="Relay"
                            occupation="Software Engineer II"
                            dates={["2025", "Present"]}
                            location="Toronto, ON"
                          />
                          <Experience
                            logo={experience.nauticalCommerceLogo}
                            company="Nautical Commerce"
                            occupation="Software Engineer"
                            dates={["2024", "2025"]}
                            location="Toronto, ON"
                          />
                          <Experience
                            logo={experience.devopieLogo}
                            company="Devopie Inc."
                            occupation="Software Engineer"
                            dates={["2022", "2024"]}
                            location="Hamilton, ON"
                          />
                        </div>
                      </div>
                    </Card.Root>
                    <Card.Root>
                      <div className="flex flex-col gap-6">
                        <h3 className="text-shadow-lg">Education</h3>
                        <div className="flex flex-col gap-4">
                          <Education
                            logo={education.universityOfGuelphLogo}
                            provider="University of Guelph"
                            certificate="Bachelor of Computing"
                            dates={["2017", "2021"]}
                            location="Guelph, ON"
                          />
                        </div>
                      </div>
                    </Card.Root>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <BackgroundGradient />
    </div>
  );
}

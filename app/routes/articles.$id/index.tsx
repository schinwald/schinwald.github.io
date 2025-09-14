import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { useInView } from "framer-motion";
import { getMDXComponent } from "mdx-bundler/client";
import {
  Children,
  createContext,
  type Dispatch,
  memo,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiSolidCircle as CircleIcon } from "react-icons/bi";
import {
  FaBookOpen as BookOpenIcon,
  FaArrowRightLong as RightArrowIcon,
} from "react-icons/fa6";
import { IoMdHeart as FullHeartIcon } from "react-icons/io";
import { IoEyeOffOutline as EyeOffIcon } from "react-icons/io5";
import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";
import { VscEye as EyeIcon } from "react-icons/vsc";
import { useLoaderData } from "react-router";
import { match } from "ts-pattern";
import placeholderSVG from "~/assets/images/placeholder.svg";
import { BackgroundGradient } from "~/components/background-gradient";
import { Callout } from "~/components/callout";
import * as Card from "~/components/card";
import { Code } from "~/components/code";
import * as Floater from "~/components/floater";
import { NavigationBar } from "~/components/navigation-bar";
import { Button } from "~/components/primitives/ui/button";
import * as Input from "~/components/primitives/ui/input";
import { Link } from "~/components/primitives/ui/link";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import {
  getPublicationStatus,
  getVisibiliy,
  safeFormat,
  safeParseISO,
} from "~/utils/date";
import { Header } from "./.components/header";
import { meta as actualMeta } from "./.meta";
import type { Loader, TableOfContents as TOC } from "./.server/loader";
import { loader as actualLoader } from "./.server/loader";

export const loader = await actualLoader;
export const meta = actualMeta;

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

type ProgressContextValues = {
  visible: Record<string, boolean>;
  setVisible: Dispatch<React.SetStateAction<Record<string, boolean>>>;
  progress: number;
};

const ProgressContext = createContext<ProgressContextValues>({
  visible: {},
  setVisible: () => {},
  progress: 0,
});

const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw Error("No progress context provider");
  }
  return context;
};

type ProgressProps = PropsWithChildren & {
  toc: TOC[];
};

const ProgressProvider: React.FC<ProgressProps> = ({ children, toc }) => {
  const mapping = toc.reduce(
    (accumulator: Record<string, boolean>, element) => {
      accumulator[element.id] = false;
      return accumulator;
    },
    {},
  );

  const [visible, setVisible] = useState(mapping);

  let progress = 0;
  for (let i = 1; i <= toc.length; i++) {
    const j = toc.length - i;
    const id = toc[j].id;
    if (visible && visible[id]) {
      progress = j;
      break;
    }
  }

  return (
    <ProgressContext.Provider value={{ visible, setVisible, progress }}>
      {children}
    </ProgressContext.Provider>
  );
};

type TableOfContentsProps = {
  toc: TOC[];
  visibility: ReturnType<typeof getVisibiliy>;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({
  toc,
  visibility,
}) => {
  const { progress } = useProgress();

  return (
    <>
      {import.meta.env.DEV ? (
        <div className="relative col-span-4 col-start-9 row-start-1 flex flex-col justify-end">
          {match(visibility)
            .with("hidden", () => (
              <p className="text-destructive flex flex-row items-center gap-2">
                <EyeOffIcon />
                Hidden
              </p>
            ))
            .with("live", () => (
              <p className="text-success flex flex-row items-center gap-2">
                <CircleIcon className="animate-pulse size-2" />
                Live
              </p>
            ))
            .with("scheduled", () => (
              <p className="text-orange-300 flex flex-row items-center gap-2">
                <CircleIcon className="animate-pulse size-2" />
                Scheduled
              </p>
            ))
            .exhaustive()}
        </div>
      ) : null}
      <div className="relative flex flex-col gap-6 col-span-4 col-start-9 row-start-2 row-span-1">
        <div className="sticky top-10 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Card.Root className="text-nowrap">
              <h6>On this page</h6>
              <div className="flex flex-row">
                <div className="w-[2px] grid grid-rows-1 grid-cols-1">
                  <div
                    className="row-span-full col-span-full w-full bg-white/40 transition-all"
                    style={{
                      height: `${((progress + 1) / toc.length) * 100}%`,
                    }}
                  />
                  <div className="row-span-full col-span-full w-full h-full bg-white/20" />
                </div>
                <ol className="list-none flex flex-col gap-2 py-1">
                  {toc.map(({ id, level, text }, index) => (
                    <li
                      key={id}
                      className={cn(
                        "py-1 transition-all ease-in-out text-white/60 hover:text-primary",
                        {
                          "pl-[0.8rem]": level === 3,
                          "pl-[1.6rem]": level === 4,
                          "pl-[2.4rem]": level === 5,
                          "text-white": index <= progress,
                        },
                      )}
                    >
                      <p className="text-sm font-medium">
                        <a href={`#${id}`}>{text}</a>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Card.Root>
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-row gap-2">
                <EyeIcon className="text-white size-6" />
                <span>12,000 views</span>
              </div>
              <div className="flex flex-row gap-2">
                <Floater.Root>
                  <Floater.Trigger asChild>
                    <Button
                      variant="ghost"
                      size="minimal"
                      click="squish-normally"
                      className="flex flex-row gap-2 text-lg"
                    >
                      <FullHeartIcon className="text-red-500 size-6" />
                    </Button>
                  </Floater.Trigger>
                  <Floater.Portal className="bottom-0">
                    <FullHeartIcon className="text-red-500 size-4 opacity-70" />
                  </Floater.Portal>
                </Floater.Root>
                <span>1,000 likes</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <span className="text-white/60">
                Did you learn something from this article? Consider buying me a
                coffee!
              </span>
              <Link
                to="https://buymeacoffee.com/schinwald"
                variant="ghost"
                size="minimal"
                className="flex flex-row gap-2 text-lg"
              >
                <BuyMeACoffeeIcon className="text-yellow-200 size-4" />
                <span>Buy Me A Coffee</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function () {
  const { code, frontmatter, toc } = useLoaderData<Loader>();
  const publishedAt = safeParseISO(frontmatter.meta.publishedAt);
  const publicationStatus = getPublicationStatus(publishedAt);
  const isHidden = Boolean(frontmatter.meta.isHidden);
  const visibility = getVisibiliy({ isHidden, publicationStatus });

  const Component = useMemo(
    () => getMDXComponent(code, MDX_GLOBAL_CONFIG),
    [code],
  );

  return (
    <div className="relative">
      <section className="w-screen h-screen">
        <div className="relative w-screen flex flex-col justify-center items-center text-foreground gap-20 pb-32">
          <NavigationBar />
          <Container variant="narrow">
            <ProgressProvider toc={toc}>
              <div className="grid grid-cols-12 auto-rows-2 gap-10">
                <div className="grid grid-cols-subgrid grid-rows-subgrid col-start-0 col-span-8 row-span-2 text-foreground-overlay">
                  <div className="flex flex-col gap-14 col-start-0 col-span-8 row-start-1 row-end-2">
                    <div className="flex flex-col items-center gap-3">
                      <time className="font-light inline-flex gap-2">
                        <span>🗓</span>
                        {safeFormat(publishedAt) ?? "TBD"}
                      </time>
                      <h2 className="text-center drop-shadow-lg">
                        {frontmatter.title}
                      </h2>
                    </div>
                  </div>
                  <div className="col-start-0 col-span-8">
                    <Card.Root size="xs" className="gap-1">
                      <Card.Header className="flex flex-col gap-4">
                        <img
                          className="object-cover object-center aspect-8/5 w-full"
                          src={frontmatter?.image?.src ?? placeholderSVG}
                          alt={frontmatter?.image?.alt}
                        />
                      </Card.Header>
                      <Card.Content className="flex flex-col p-8">
                        <div className="flex flex-col gap-4">
                          <p className="flex items-center gap-2">
                            <BookOpenIcon />
                            <span>{frontmatter.meta.readingTime}</span>
                          </p>
                          <div className="flex gap-2">
                            {frontmatter?.meta?.tags?.map((tag) => {
                              const key = `tag-${tag}`;
                              return (
                                <span
                                  key={key}
                                  className="bg-tertiary text-tertiary-foreground rounded-full text-sm px-2 py-0"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                          <hr className="opacity-20 border-dashed" />
                        </div>
                        <article className="flex flex-col gap-14 pt-14">
                          <MDXProvider
                            components={{
                              section: memo(({ children }) => {
                                const ref = useRef(null);
                                const isInView = useInView(ref, {
                                  margin: "0px 0px -50% 0px",
                                });
                                const { setVisible } = useProgress();
                                const id = children[0].props.id;

                                useEffect(() => {
                                  if (isInView) {
                                    setVisible((visible) => {
                                      const copy = { ...visible };
                                      copy[id] = true;
                                      return copy;
                                    });
                                  } else {
                                    setVisible((visible) => {
                                      const copy = { ...visible };
                                      copy[id] = false;
                                      return copy;
                                    });
                                  }
                                }, [isInView, id, setVisible]);

                                return (
                                  <section
                                    ref={ref}
                                    className="flex flex-col gap-8"
                                  >
                                    {children}
                                  </section>
                                );
                              }),
                              h1: ({ children, ...props }) => (
                                <Header type="h1" {...props}>
                                  {children}
                                </Header>
                              ),
                              h2: ({ children, ...props }) => (
                                <Header type="h2" {...props}>
                                  {children}
                                </Header>
                              ),
                              h3: ({ children, ...props }) => (
                                <Header type="h3" {...props}>
                                  {children}
                                </Header>
                              ),
                              h4: ({ children, ...props }) => (
                                <Header type="h4" {...props}>
                                  {children}
                                </Header>
                              ),
                              h5: ({ children, ...props }) => (
                                <Header type="h5" {...props}>
                                  {children}
                                </Header>
                              ),
                              h6: ({ children, ...props }) => (
                                <Header type="h6" {...props}>
                                  {children}
                                </Header>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal flex flex-col gap-4 ml-4 marker:text-tertiary">
                                  {children}
                                </ol>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc flex flex-col gap-4 ml-4 marker:text-tertiary">
                                  {children}
                                </ul>
                              ),
                              li: ({ children }) => (
                                <li className="inline-flex flex-col gap-4">
                                  {Children.map(children, (child, index) => {
                                    if (index === 0) {
                                      return (
                                        <div className="flex flex-row items-center gap-2">
                                          <CircleIcon className="text-tertiary size-[6px] -ml-4" />
                                          {child}
                                        </div>
                                      );
                                    }

                                    return child;
                                  })}
                                </li>
                              ),
                              img: ({ src, alt }) => (
                                <div className="rounded-sm overflow-clip shadow-lg shadow-black/20">
                                  <img src={src} alt={alt} className="w-full" />
                                </div>
                              ),
                              "arrow-item": ({ children }) => (
                                <li className="list-none space-y-4">
                                  {Children.map(children, (child, index) => {
                                    if (index === 0) {
                                      return (
                                        <div className="flex flex-row items-center gap-2">
                                          <RightArrowIcon className="text-tertiary size-3 -ml-5" />
                                          {child}
                                        </div>
                                      );
                                    }

                                    return child;
                                  })}
                                </li>
                              ),
                              "checklist-item": ({ isChecked, children }) => (
                                <li className="list-none space-y-4">
                                  {Children.map(children, (child, index) => {
                                    if (index === 0) {
                                      return (
                                        <div className="flex flex-row items-center gap-2">
                                          <input
                                            type="checkbox"
                                            defaultChecked={isChecked}
                                            className="-ml-5"
                                          />
                                          {child}
                                        </div>
                                      );
                                    }

                                    return child;
                                  })}
                                </li>
                              ),
                              callout: Callout,
                              code: Code,
                            }}
                          >
                            <Component />
                          </MDXProvider>
                        </article>
                      </Card.Content>
                    </Card.Root>
                  </div>
                </div>
                <TableOfContents toc={toc} visibility={visibility} />
              </div>
            </ProgressProvider>
          </Container>
          <Container variant="narrow">
            <div className="flex flex-row justify-between items-end">
              <div className="flex flex-col gap-4">
                <h3>Newsletter</h3>
                <p>
                  Subscribe to this newsletter to receive notifications when new
                  articles are published
                </p>
                <div className="flex flex-row gap-4">
                  <Input.Root className="w-[400px]">
                    <Input.Field placeholder="Enter your email" />
                  </Input.Root>
                  <Button>Subscribe</Button>
                </div>
              </div>
              <span className="text-[5rem]">🚀</span>
            </div>
          </Container>
        </div>
        <BackgroundGradient />
      </section>
    </div>
  );
}

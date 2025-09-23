import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { useInView } from "framer-motion";
import { getMDXComponent } from "mdx-bundler/client";
import { Children, memo, useEffect, useMemo, useRef } from "react";
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
import { Newsletter } from "~/components/newsletter";

import { Form } from "~/components/primitives/ui/form";
import { Link } from "~/components/primitives/ui/link";
import { ProgressProvider, useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import {
  getPublicationStatus,
  getVisibiliy,
  safeFormat,
  safeParseISO,
} from "~/utils/date";
import { Header } from "./components/header";
import { meta as actualMeta } from "./meta";
import { validators } from "./schemas/actions/subscribe-to-newsletter";
import { action as actualAction } from "./server/actions";
import type { Loader, TableOfContents as TOC } from "./server/loader";
import { loader as actualLoader } from "./server/loader";

export const loader = await actualLoader;
export const action = await actualAction;
export const meta = actualMeta;

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

type TableOfContentsProps = {
  toc: TOC[];
  visibility: ReturnType<typeof getVisibiliy>;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({
  toc,
  visibility,
}) => {
  const { id, views, likes } = useLoaderData<Loader>();
  const { progress } = useProgress();

  return (
    <>
      {import.meta.env.DEV ? (
        <div className="relative col-span-4 col-start-9 row-start-1 flex flex-col justify-end">
          {match(visibility)
            .with("hidden", () => (
              <p className="flex flex-row items-center gap-2 text-destructive">
                <EyeOffIcon />
                Hidden
              </p>
            ))
            .with("live", () => (
              <p className="flex flex-row items-center gap-2 text-success">
                <CircleIcon className="size-2 animate-pulse" />
                Live
              </p>
            ))
            .with("scheduled", () => (
              <p className="flex flex-row items-center gap-2 text-orange-300">
                <CircleIcon className="size-2 animate-pulse" />
                Scheduled
              </p>
            ))
            .exhaustive()}
        </div>
      ) : null}
      <div className="relative col-span-4 col-start-9 row-span-1 row-start-2 flex flex-col gap-6">
        <div className="sticky top-10 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Card.Root className="text-nowrap">
              <h6>On this page</h6>
              <div className="flex flex-row">
                <div className="grid w-[2px] grid-cols-1 grid-rows-1">
                  <div
                    className="col-span-full row-span-full w-full bg-white/40 transition-all"
                    style={{
                      height: `${((progress + 1) / toc.length) * 100}%`,
                    }}
                  />
                  <div className="col-span-full row-span-full h-full w-full bg-white/20" />
                </div>
                <ol className="flex list-none flex-col gap-2 py-1">
                  {toc.map(({ id, level, text }, index) => (
                    <li
                      key={id}
                      className={cn(
                        "py-1 text-white/60 transition-all ease-in-out hover:text-primary",
                        {
                          "pl-[0.8rem]": level === 3,
                          "pl-[1.6rem]": level === 4,
                          "pl-[2.4rem]": level === 5,
                          "text-white": index <= progress,
                        },
                      )}
                    >
                      <p className="font-medium text-sm">
                        <a href={`#${id}`}>{text}</a>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Card.Root>
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-row gap-2">
                <EyeIcon className="size-6 text-white" />
                <span>{views} views</span>
              </div>
              <Form.Root method="POST" className="flex flex-row gap-2">
                <input type="hidden" name="id" value={id} />
                <Floater.Root>
                  <Floater.Trigger asChild>
                    <Form.Submit
                      intent="likeArticle"
                      variant="ghost"
                      size="minimal"
                      click="squish-normally"
                      className="flex flex-row gap-2 text-lg"
                    >
                      <FullHeartIcon className="size-6 text-red-500" />
                    </Form.Submit>
                  </Floater.Trigger>
                  <Floater.Portal className="bottom-0">
                    <FullHeartIcon className="size-4 text-red-500 opacity-70" />
                  </Floater.Portal>
                </Floater.Root>
                <span>{likes} likes</span>
              </Form.Root>
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
                <BuyMeACoffeeIcon className="size-4 text-yellow-200" />
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
  const { code, frontmatter, toc, newsletterSubscriber } =
    useLoaderData<Loader>();
  const publishedAt = safeParseISO(frontmatter.meta.publishedAt);
  const publicationStatus = getPublicationStatus(publishedAt);
  const isHidden = Boolean(frontmatter.meta.isHidden);
  const visibility = getVisibiliy({ isHidden, publicationStatus });

  const Component = useMemo(
    () => getMDXComponent(code, MDX_GLOBAL_CONFIG),
    [code],
  );

  const steps = toc.map((element) => element.id);

  return (
    <div className="relative">
      <section className="h-screen w-screen">
        <div className="relative flex w-screen flex-col items-center justify-center gap-20 pb-32 text-foreground">
          <NavigationBar />
          <Container variant="narrow">
            <ProgressProvider steps={steps}>
              <div className="grid auto-rows-2 grid-cols-12 gap-10">
                <div className="col-span-8 col-start-0 row-span-2 grid grid-cols-subgrid grid-rows-subgrid text-foreground-overlay">
                  <div className="col-span-8 col-start-0 row-start-1 row-end-2 flex flex-col gap-14">
                    <div className="flex flex-col items-center gap-3">
                      <time className="inline-flex gap-2 font-light">
                        <span>🗓</span>
                        {safeFormat(publishedAt) ?? "TBD"}
                      </time>
                      <h2 className="text-center drop-shadow-lg">
                        {frontmatter.title}
                      </h2>
                    </div>
                  </div>
                  <div className="col-span-8 col-start-0">
                    <Card.Root size="xs" className="gap-1">
                      <Card.Header className="flex flex-col gap-4">
                        <img
                          className="aspect-8/5 w-full object-cover object-center"
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
                            {frontmatter?.meta?.tags?.map((tag: string) => {
                              const key = `tag-${tag}`;
                              return (
                                <span
                                  key={key}
                                  className="rounded-full bg-tertiary px-2 py-0 text-sm text-tertiary-foreground"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                          <hr className="border-dashed opacity-20" />
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
                                <ol className="ml-4 flex list-decimal flex-col gap-4 marker:text-tertiary">
                                  {children}
                                </ol>
                              ),
                              ul: ({ children }) => (
                                <ul className="ml-4 flex list-disc flex-col gap-4 marker:text-tertiary">
                                  {children}
                                </ul>
                              ),
                              li: ({ children }) => (
                                <li className="inline-flex flex-col gap-4">
                                  {Children.map(children, (child, index) => {
                                    if (index === 0) {
                                      return (
                                        <div className="flex flex-row items-center gap-2">
                                          <CircleIcon className="-ml-4 size-[6px] text-tertiary" />
                                          {child}
                                        </div>
                                      );
                                    }

                                    return child;
                                  })}
                                </li>
                              ),
                              img: ({ src, alt }) => (
                                <div className="overflow-clip rounded-sm shadow-black/20 shadow-lg">
                                  <img src={src} alt={alt} className="w-full" />
                                </div>
                              ),
                              "arrow-item": ({ children }) => (
                                <li className="list-none space-y-4">
                                  {Children.map(children, (child, index) => {
                                    if (index === 0) {
                                      return (
                                        <div className="flex flex-row items-center gap-2">
                                          <RightArrowIcon className="-ml-5 size-3 text-tertiary" />
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
            <Newsletter
              validators={validators}
              isSubscribed={Boolean(newsletterSubscriber)}
            />
          </Container>
        </div>
        <BackgroundGradient />
      </section>
    </div>
  );
}

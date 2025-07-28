import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { getMDXComponent } from "mdx-bundler/client";
import { Children, useMemo } from "react";
import { BiSolidCircle as CircleIcon } from "react-icons/bi";
import {
  FaBookOpen as BookOpenIcon,
  FaArrowRightLong as RightArrowIcon,
} from "react-icons/fa6";
import { IoMdHeart as FullHeartIcon } from "react-icons/io";
import { IoEyeOffOutline as EyeOffIcon } from "react-icons/io5";
import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";
import { useLoaderData } from "react-router";
import { match } from "ts-pattern";
import placeholderSVG from "~/assets/images/placeholder.svg";
import { BackgroundGradient } from "~/components/background-gradient";
import { Callout } from "~/components/callout";
import * as Card from "~/components/card";
import { Code } from "~/components/code";
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

type TableOfContentsProps = {
  toc: TOC[];
  tags?: string[];
  visibility: ReturnType<typeof getVisibiliy>;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({
  toc,
  tags,
  visibility,
}) => {
  return (
    <>
      {import.meta.env.DEV ? (
        <div className="relative col-span-2 col-start-11 row-start-1 flex flex-col justify-end">
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
      <div className="relative col-span-2 flex flex-col gap-6 col-start-11 row-start-2 row-span-2">
        <div className="sticky top-10 flex flex-col gap-8">
          <div className="flex gap-2">
            {tags?.map((tag) => {
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
          <div className="flex flex-col gap-4">
            <h6>On this page</h6>
            <ol className="list-none flex flex-col gap-2 border-l border-white/20">
              {toc.map(({ id, level, text }, _index) => (
                <li
                  key={id}
                  className={cn("py-2 text-nowrap transition-all ease-in-out", {
                    "pl-[1rem]": level === 3,
                    "pl-[2rem]": level === 4,
                    "pl-[3rem]": level === 5,
                    "text-primary": false,
                  })}
                >
                  <p className="text-sm font-medium">
                    <a href={`#${id}`}>{text}</a>
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Link
              to="https://buymeacoffee.com/schinwald"
              variant="ghost"
              size="minimal"
              className="flex flex-row gap-2"
            >
              <BuyMeACoffeeIcon className="text-yellow-200 size-4" />
              <span>Support</span>
            </Link>
            <Button
              variant="ghost"
              size="minimal"
              className="flex flex-row gap-2"
            >
              <FullHeartIcon className="text-red-500 size-4" />
              <span>Like</span>
            </Button>
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
        <div className="relative w-screen flex flex-col justify-center items-center text-foreground gap-28 pb-32">
          <NavigationBar />
          <Container variant="narrow">
            <div className="grid grid-cols-12 auto-rows-min gap-10">
              <div className="grid grid-cols-subgrid grid-rows-subgrid col-span-10 row-span-3 text-foreground-overlay">
                <div className="flex flex-col gap-14 col-span-10 row-start-1 row-end-2">
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
                <div className="col-span-10">
                  <Card.Root size="xs" className="gap-1">
                    <Card.Header className="flex flex-col gap-4">
                      <img
                        className="object-cover object-center aspect-8/5 w-full"
                        src={frontmatter?.image?.src ?? placeholderSVG}
                        alt={frontmatter?.image?.alt}
                      />
                    </Card.Header>
                    <Card.Content className="flex flex-col gap-10 p-8">
                      <p className="flex items-center gap-2">
                        <BookOpenIcon />
                        <span>{frontmatter.meta.readingTime}</span>
                      </p>
                      <article className="flex flex-col gap-10 col-span-9 row-start-3 row-end-3">
                        <MDXProvider
                          components={{
                            h1: ({ children, ...props }) => (
                              <Header type="h1" {...props}>
                                {" "}
                                {children}
                              </Header>
                            ),
                            h2: ({ children, ...props }) => (
                              <Header type="h2" {...props}>
                                {" "}
                                {children}
                              </Header>
                            ),
                            h3: ({ children, ...props }) => (
                              <Header type="h3" {...props}>
                                {" "}
                                {children}
                              </Header>
                            ),
                            h4: ({ children, ...props }) => (
                              <Header type="h4" {...props}>
                                {" "}
                                {children}
                              </Header>
                            ),
                            h5: ({ children, ...props }) => (
                              <Header type="h5" {...props}>
                                {" "}
                                {children}
                              </Header>
                            ),
                            h6: ({ children, ...props }) => (
                              <Header type="h6" {...props}>
                                {" "}
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
                              <li className="space-y-4">{children}</li>
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
              <TableOfContents
                toc={toc}
                tags={frontmatter?.meta?.tags}
                visibility={visibility}
              />
            </div>
          </Container>
          <Container variant="narrow">
            <div className="flex flex-row justify-between items-end">
              <div className="flex flex-col gap-4 max-w-[600px]">
                <h3>Newsletter</h3>
                <p>
                  Subscribe to this newsletter to receive notifications when new
                  articles are published
                </p>
                <div className="flex flex-row gap-4">
                  <Input.Root>
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

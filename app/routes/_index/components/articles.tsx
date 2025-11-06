import { useInView } from "framer-motion";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FaBookOpen as BookOpenIcon } from "react-icons/fa6";
import placeholderSVG from "~/assets/images/placeholder.svg";
import { Card } from "~/components/card";
import { Header } from "~/components/header";
import { Button } from "~/components/primitives/ui/button";
import { Link, LinkArrow } from "~/components/primitives/ui/link";
import { Tags } from "~/components/tags";
import { useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import { safeFormat, safeParseISO } from "~/utils/date";
import type { Frontmatter } from "~/utils/mdx/mdx.server";

type ArticleItemProps = {
  className?: string;
  data: Frontmatter;
  active: boolean;
  duration: number;
  onComplete: () => void;
  onClick: () => void;
};

const ArticleItem: React.FC<ArticleItemProps> = ({
  className,
  data,
  active,
  duration,
  onComplete,
  onClick,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [counter, setCounter] = useState(0);

  const publishedAt = safeParseISO(data.meta.publishedAt);
  const speed = duration / 1000;

  useEffect(() => {
    if (active && timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, speed);
    }

    if (!active && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setCounter(0);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setCounter(0);
      }
    };
  }, [active, speed]);

  useEffect(() => {
    if (counter === 1000 && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setCounter(0);
      onComplete();
    }
  }, [counter, onComplete]);

  return (
    <Button
      className="col-span-4 row-span-1 h-full rounded-md"
      variant="unstyled"
      size="unstyled"
      onClick={() => onClick()}
    >
      <Card.Root
        className={cn(
          { "bg-background-overlay/90 outline-2 outline-white/70": active },
          className,
        )}
        size="md"
      >
        <time className="inline-flex gap-2 font-light">
          <span>🗓</span>
          {safeFormat(publishedAt) ?? "TBD"}
        </time>
        <h3 className="min-h-10 line-clamp-2 text-shadow-lg">{data.title}</h3>
        <Tags tags={data.meta.tags} />
        <div
          className={cn("absolute inset-0 opacity-10", {
            "bg-white": active,
          })}
          style={duration === -1 ? {} : { width: `${counter / 10}%` }}
        ></div>
      </Card.Root>
    </Button>
  );
};

type ArticlesProps = {
  id: string;
  className?: string;
  data: (Frontmatter | null)[];
};

const Articles: React.FC<ArticlesProps> = ({ id, className, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "0px 0px -500px 0px",
  });
  const { setVisible } = useProgress();

  const activeArticle = data[activeIndex];
  const numberOfArticles = data.filter((article) => article).length;

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
  }, [id, isInView, setVisible]);

  return (
    <div
      id={id}
      className={cn(
        "-my-28 relative flex w-screen flex-row justify-center py-28",
        className,
      )}
    >
      <Container variant="narrow" ref={containerRef}>
        <div className="relative flex w-full max-w-(--breakpoint-md) flex-row items-end justify-between">
          <Header title="Articles" align="left" variant="cascade" />
          <Link click="squish-lightly" to="/articles" from="left">
            See More
            <LinkArrow />
          </Link>
        </div>
        <div className="grid h-[650px] w-full grid-cols-12 grid-rows-4 items-center gap-6">
          {data.map((article, index) => {
            const key = `article-${index}`;

            if (!article) {
              return (
                <div
                  key={key}
                  className="col-span-4 row-span-1 h-full rounded-md border border-[#fff2] bg-background-overlay/20"
                />
              );
            }

            return (
              <ArticleItem
                key={key}
                data={article}
                active={index === activeIndex}
                duration={numberOfArticles === 1 ? -1 : 15000}
                onComplete={() =>
                  setActiveIndex((activeIndex + 1) % numberOfArticles)
                }
                onClick={() => setActiveIndex(index)}
              />
            );
          })}
          {activeArticle ? (
            <div className="relative col-span-8 col-start-5 row-span-full flex h-full w-full flex-col rounded-md bg-background-overlay text-white">
              <div className="relative aspect-8/5 w-full overflow-hidden rounded-t-md border border-[#fff2] bg-background-overlay">
                <img
                  className="h-full w-full object-cover"
                  src={activeArticle?.image?.src ?? placeholderSVG}
                  alt={activeArticle?.image?.alt}
                />
              </div>
              <div className="flex grow flex-col justify-between rounded-b-md border-[#fff2] border-x border-b p-8">
                <div className="flex grow flex-col gap-4">
                  <p className="flex items-center gap-2">
                    <BookOpenIcon />
                    <span>{activeArticle.meta.readingTime}</span>
                  </p>
                  <article className="line-clamp-4">
                    {activeArticle.description}
                  </article>
                </div>
                <div>
                  <Link
                    to={`/articles/${activeArticle.slug}`}
                    from="left"
                    click="squish-lightly"
                  >
                    Read More <LinkArrow />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-8 col-start-5 row-span-full h-full">
              <Card.Root>
                <Card.Content className="flex h-full flex-row items-center justify-center">
                  <h3>No articles found.</h3>
                </Card.Content>
              </Card.Root>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export { Articles };

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FaBookOpen as BookOpenIcon } from "react-icons/fa6";
import placeholderSVG from "~/assets/images/placeholder.svg";
import * as Card from "~/components/card";
import { Header } from "~/components/header";
import { Button } from "~/components/primitives/ui/button";
import { Link } from "~/components/primitives/ui/link";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import { safeFormat, safeParseISO } from "~/utils/date";
import type { Article } from "~/utils/mdx/mdx.server";

type ArticleItemProps = {
  className?: string;
  data: Article;
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
      className="row-span-1 col-span-4 h-full"
      variant="unstyled"
      size="unstyled"
      onClick={() => onClick()}
    >
      <Card.Root
        className={cn(
          { "outline-4 outline-white/70 bg-background-overlay/90": active },
          className,
        )}
        size="md"
      >
        <time className="font-light inline-flex gap-2">
          <span>🗓</span>
          {safeFormat(publishedAt) ?? "TBD"}
        </time>
        <h3>{data.title}</h3>
        <div className="inline-flex gap-1 overflow-hidden">
          {data.meta.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-tertiary text-tertiary-foreground rounded-full text-sm px-2 py-0"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className={cn("absolute inset-0 opacity-10", {
            "bg-white": active,
          })}
          style={{ width: `${counter / 10}%` }}
        ></div>
      </Card.Root>
    </Button>
  );
};

type ArticlesProps = {
  className?: string;
  data: (Article | null)[];
};

const Articles: React.FC<ArticlesProps> = ({ className, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeArticle = data[activeIndex];

  return (
    <div
      id="articles"
      className={cn(
        "relative w-screen flex flex-row justify-center py-28 -my-28",
        className,
      )}
    >
      <Container variant="narrow">
        <div className="relative w-full max-w-(--breakpoint-md) flex flex-row justify-between items-end">
          <Header title="Articles" align="left" variant="cascade" />
          <Link click="squish-normally" to="/articles" from="left">
            See More
          </Link>
        </div>
        <div className="grid grid-rows-4 grid-cols-12 items-center w-full gap-6 h-[650px]">
          {data.map((article, index) => {
            const key = `article-${index}`;

            if (!article) {
              return (
                <div
                  key={key}
                  className="row-span-1 col-span-4 h-full bg-background-overlay/20 border border-[#fff2] rounded-md"
                />
              );
            }

            return (
              <ArticleItem
                key={key}
                data={article}
                active={index === activeIndex}
                duration={15000}
                onComplete={() => setActiveIndex((activeIndex + 1) % 4)}
                onClick={() => setActiveIndex(index)}
              />
            );
          })}
          {activeArticle ? (
            <div className="row-span-full col-start-5 col-span-8 relative h-full bg-background-overlay/60 rounded-md w-full flex flex-col text-white">
              <div className="relative bg-background-overlay/60 border border-[#fff2] rounded-t-md w-full aspect-8/5 overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={activeArticle?.image?.src ?? placeholderSVG}
                  alt={activeArticle?.image?.alt}
                />
              </div>
              <div className="grow p-8 border-b border-x border-[#fff2] rounded-b-md flex flex-col justify-between">
                <div className="grow flex flex-col gap-4">
                  <p className="flex items-center gap-2">
                    <BookOpenIcon />
                    <span>{activeArticle.meta.readingTime}</span>
                  </p>
                  <article>{activeArticle.excerpt}</article>
                </div>
                <div>
                  <Link to={`/articles/${activeArticle.id}`}>Read More</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-start-5 col-span-8 row-span-full h-full">
              <Card.Root>
                <Card.Content className="flex flex-row justify-center items-center h-full">
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

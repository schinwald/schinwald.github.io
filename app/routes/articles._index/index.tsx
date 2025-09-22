import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { MdKeyboardCommandKey as CommandIcon } from "react-icons/md";
import { useLoaderData } from "react-router";
import placeholderSVG from "~/assets/images/placeholder.svg";
import { BackgroundGradient } from "~/components/background-gradient";
import * as Card from "~/components/card";
import { Header } from "~/components/header";
import { NavigationBar } from "~/components/navigation-bar";
import { Newsletter } from "~/components/newsletter";
import * as Input from "~/components/primitives/ui/input";
import { Link, LinkArrow } from "~/components/primitives/ui/link";
import { Container } from "~/layouts/container";
import { safeFormat, safeParseISO } from "~/utils/date";
import type { Frontmatter as ArticleItem } from "~/utils/mdx/mdx.server";
import { meta as actualMeta } from "./meta";
import { validators } from "./schemas/actions/subscribe-to-newsletter";
import { action as actualAction } from "./server/actions";
import type { Loader } from "./server/loader";
import { loader as actualLoader } from "./server/loader";

export const loader = await actualLoader;
export const action = await actualAction;
export const meta = actualMeta;

type ArticleProps = {
  article: ArticleItem;
};

export const Article: React.FC<ArticleProps> = ({
  article: { slug, title, image, meta },
}) => {
  const publishedAt = safeParseISO(meta.publishedAt);

  return (
    <li className=" text-foreground-overlay flex flex-col gap-6 opacity-0">
      <Card.Root size="xs">
        <Card.Header>
          <Link
            to={`/articles/${slug}`}
            variant="ghost"
            size="minimal"
            className="aspect-8/5 bg-[#fff8] overflow-hidden"
          >
            <img src={image?.src ?? placeholderSVG} alt={image?.alt} />
          </Link>
        </Card.Header>
        <Card.Content className="p-4 pt-0">
          <div className="flex flex-col gap-3">
            <time className="font-light inline-flex gap-2">
              <span>🗓</span>
              {safeFormat(publishedAt) ?? "TBD"}
            </time>
            <h3>{title}</h3>
            <div className="inline-flex gap-1 overflow-hidden">
              {meta.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-tertiary text-tertiary-foreground rounded-full text-sm px-2 py-0"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </li>
  );
};

type ArticleSideProps = {
  article: ArticleItem;
};

export const ArticleSide: React.FC<ArticleSideProps> = ({
  article: { slug, title, description, image, meta },
}) => {
  const publishedAt = safeParseISO(meta.publishedAt);

  return (
    <li className=" text-foreground-overlay flex flex-row gap-4 opacity-0">
      <Link
        to={`/articles/${slug}`}
        variant="ghost"
        size="minimal"
        className="aspect-8/5 bg-[#fff8] rounded-sm overflow-hidden"
      >
        <img src={image?.src} alt={image?.alt} />
      </Link>
      <div className="flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-3">
          <time className="font-light inline-flex gap-2">
            <span>🗓</span>
            {safeFormat(publishedAt) ?? "TBD"}
          </time>
          <h3>{title}</h3>
          <div className="inline-flex gap-1 overflow-hidden">
            {meta.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-tertiary text-tertiary-foreground rounded-full text-sm px-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="line-clamp-2">{description}</p>
          <div>
            <Link
              from="left"
              to={`/articles/${slug}`}
              variant="link"
              size="minimal"
            >
              Read More
              <LinkArrow />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export const FeaturedArticles: React.FC = () => {
  const { articles } = useLoaderData<Loader>();
  const [featuredArticlesRef, animateFeaturedArticle] = useAnimate();
  const isInView = useInView(featuredArticlesRef, {
    margin: "-200px 0px",
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      animateFeaturedArticle(
        "li",
        {
          opacity: [0, 1],
          transform: ["translateY(20px)", "translateY(0px)"],
        },
        {
          duration: 0.5,
          delay: stagger(0.1),
        },
      );
    }
  }, [isInView, animateFeaturedArticle]);

  const featuredArticles = articles.filter(
    (article) => article.meta.isFeatured,
  );

  return (
    <Container variant="narrow">
      <h2>Featured</h2>
      <motion.ol
        ref={featuredArticlesRef}
        className="grid grid-cols-12 grid-rows-3 gap-6"
      >
        <li className="col-span-6 row-span-3">
          {featuredArticles[0] ? (
            <Article article={featuredArticles[0]} />
          ) : null}
        </li>
        <li className="col-span-6 row-span-1">
          {featuredArticles[1] ? (
            <ArticleSide article={featuredArticles[1]} />
          ) : null}
        </li>
        <li className="col-span-6 row-span-1">
          {featuredArticles[2] ? (
            <ArticleSide article={featuredArticles[2]} />
          ) : null}
        </li>
        <li className="col-span-6 row-span-1">
          {featuredArticles[3] ? (
            <ArticleSide article={featuredArticles[3]} />
          ) : null}
        </li>
      </motion.ol>
    </Container>
  );
};

export const AllArticles: React.FC = () => {
  const { articles } = useLoaderData<Loader>();
  const [allArticlesRef, animateAllArticles] = useAnimate();
  const isInView = useInView(allArticlesRef, {
    margin: "-200px 0px",
    once: true,
  });

  useEffect(() => {
    if (!isInView) return;
    if (articles.length === 0) return;

    animateAllArticles(
      "li",
      {
        opacity: [0, 1],
        transform: ["translateY(20px)", "translateY(0px)"],
      },
      {
        duration: 0.5,
        delay: stagger(0.1),
      },
    );
  }, [isInView, articles, animateAllArticles]);

  return (
    <Container variant="narrow">
      <div className="flex flex-row items-end justify-between text-foreground">
        <Header title="Articles" align="left" variant="typist" />
        <Input.Root className="w-[400px] flex gap-2">
          <div className="flex flex-row items-center">
            <SearchIcon className="text-black" />
          </div>
          <Input.Field
            placeholder="Search..."
            className="bg-none border-none w-full"
          />
          <p className="flex flex-row items-center gap-1 text-black">
            <CommandIcon />+
            <div className="ml-[0.2rem] rounded size-6 flex justify-center bg-black text-white text-[0.5rem]">
              K
            </div>
          </p>
        </Input.Root>
      </div>
      <motion.ol
        ref={allArticlesRef}
        className="grid grid-rows-3 grid-cols-3 gap-6"
      >
        {articles.length > 0 ? (
          articles.map((article, index) => {
            const key = `article-${index}`;
            return <Article key={key} article={article} />;
          })
        ) : (
          <div>
            <h3>No articles found.</h3>
          </div>
        )}
      </motion.ol>
    </Container>
  );
};

export default function () {
  const { newsletterSubscriber } = useLoaderData<Loader>();

  return (
    <div>
      <section className="w-screen h-screen">
        <div className="relative overflow-hidden w-screen flex flex-col justify-center items-center text-foreground gap-20 pb-32">
          <NavigationBar />
          <AllArticles />
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

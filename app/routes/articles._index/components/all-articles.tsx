import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { MdKeyboardCommandKey as CommandIcon } from "react-icons/md";
import { useLoaderData } from "react-router";
import { Header } from "~/components/header";
import * as Input from "~/components/primitives/ui/input";
import { Container } from "~/layouts/container";
import type { Loader } from "../server/loader";
import { Article } from "./article";

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

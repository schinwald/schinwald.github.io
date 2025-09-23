import placeholderSVG from "~/assets/images/placeholder.svg";
import * as Card from "~/components/card";
import { Link } from "~/components/primitives/ui/link";
import { safeFormat, safeParseISO } from "~/utils/date";
import type { Frontmatter } from "~/utils/mdx/mdx.server";

type ArticleProps = {
  article: Frontmatter;
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

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
    <li className=" flex flex-col gap-6 text-foreground-overlay opacity-0">
      <Card.Root size="xs">
        <Card.Header>
          <Link
            to={`/articles/${slug}`}
            variant="ghost"
            size="minimal"
            className="aspect-8/5 overflow-hidden bg-[#fff8]"
          >
            <img src={image?.src ?? placeholderSVG} alt={image?.alt} />
          </Link>
        </Card.Header>
        <Card.Content className="p-4 pt-0">
          <div className="flex flex-col gap-3">
            <time className="inline-flex gap-2 font-light">
              <span>🗓</span>
              {safeFormat(publishedAt) ?? "TBD"}
            </time>
            <h3>{title}</h3>
            <div className="inline-flex gap-1 overflow-hidden">
              {meta.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-tertiary px-2 py-0 text-sm text-tertiary-foreground"
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

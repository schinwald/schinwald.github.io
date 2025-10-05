import { cn } from "~/utils/classname";

type TagProps = {
  className?: string;
  tags?: string[];
};

const Tags: React.FC<TagProps> = ({ className, tags }) => {
  return (
    <div className={cn("inline-flex gap-2 overflow-hidden", className)}>
      {tags?.map((tag) => (
        <span
          key={tag}
          className="rounded-sm bg-tertiary px-2 py-0 text-sm text-tertiary-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export { Tags };

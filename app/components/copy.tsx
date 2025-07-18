import { MdCopyAll as CopyIcon } from "react-icons/md";
import * as Floater from "./floater";
import { Button } from "./primitives/ui/button";

type CopyProps = {
  clipboard?: string;
};

export const Copy: React.FC<CopyProps> = ({ clipboard }) => {
  return (
    <Floater.Root>
      <Floater.Trigger asChild>
        <Button
          variant="ghost"
          size="minimal"
          className="size-5"
          click="squish-normally"
          onClick={() => {
            navigator.clipboard.writeText(clipboard ?? "");
          }}
        >
          <CopyIcon className="size-5" />
        </Button>
      </Floater.Trigger>
      <Floater.Portal>
        <p>Copied!</p>
      </Floater.Portal>
    </Floater.Root>
  );
};

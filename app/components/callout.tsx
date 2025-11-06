import type React from "react";
import type { PropsWithChildren } from "react";
import {
  FaExclamationCircle as DangerIcon,
  FaInfoCircle as InfoIcon,
  FaBook as NoteIcon,
  FaExclamationTriangle as WarningIcon,
} from "react-icons/fa";
import { HiOutlineSparkles as TipIcon } from "react-icons/hi2";
import { match } from "ts-pattern";
import { cn } from "~/utils/classname";

type CalloutProps = {
  type: "info" | "note" | "tip" | "danger" | "warning";
  title: string;
  isCollapsable?: boolean;
};

const Callout: React.FC<PropsWithChildren<CalloutProps>> = ({
  children,
  type,
  title,
}) => {
  return (
    <div
      className={cn(
        "rounded-md border-2 border-opacity-30 bg-background-overlay px-6 py-5 shadow-black/20 shadow-lg",
        {
          "border-blue-300": type === "info",
          "border-green-400": type === "note",
          "border-purple-300": type === "tip",
          "border-4 border-red-500 border-double": type === "danger",
          "border-yellow-300 border-dashed": type === "warning",
        },
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-1">
          {match(type)
            .with("info", () => (
              <InfoIcon className="-my-2 -ml-1 size-6 p-[0.1rem] text-blue-300 opacity-50 drop-shadow-lg" />
            ))
            .with("note", () => (
              <NoteIcon className="-my-2 -ml-1 size-6 p-[0.2rem] text-green-400 opacity-50 drop-shadow-lg" />
            ))
            .with("tip", () => (
              <TipIcon className="-my-2 -ml-1 size-6 text-purple-300 opacity-50 drop-shadow-lg" />
            ))
            .with("danger", () => (
              <DangerIcon className="-my-2 -ml-1 size-6 p-[0.1rem] text-red-500 opacity-50 drop-shadow-lg" />
            ))
            .with("warning", () => (
              <WarningIcon className="-my-2 -ml-1 size-6 p-[0.1rem] text-yellow-300 opacity-50 drop-shadow-lg" />
            ))
            .exhaustive()}
          <h5 className="drop-shadow-lg">{title}</h5>
        </div>
        <p className="inline-flex gap-2 whitespace-pre-wrap">{children}</p>
      </div>
    </div>
  );
};

export { Callout };

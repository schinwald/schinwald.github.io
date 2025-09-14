import type { PropsWithChildren } from "react";
import { FaInfoCircle } from "react-icons/fa";
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipPortal,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/primitives/ui/tooltip";

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>{children}</Tooltip>
		</TooltipProvider>
	);
};

export const Word: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<TooltipTrigger asChild>
			<span className="underline decoration-wavy decoration-tertiary italic cursor-help">
				{children}
			</span>
		</TooltipTrigger>
	);
};

export const Explanation: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<TooltipPortal>
			<TooltipContent
				sideOffset={5}
				className="bg-background-soft p-6 rounded-md max-w-xs shadow-tertiary/10 shadow-lg outline outline-1 outline-tertiary"
			>
				<div className="flex flex-col items-start gap-4 text-white">
					<p className="inline-flex items-center gap-2 text-tertiary">
						<FaInfoCircle className="w-4 h-4" />
						Explanation
					</p>
					{children}
				</div>
			</TooltipContent>
		</TooltipPortal>
	);
};

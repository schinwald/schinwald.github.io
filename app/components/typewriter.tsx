import { motion } from "framer-motion";
import { cn } from "~/utils/classname";

export const Typewriter = ({
	words,
	className,
	cursorClassName,
}: {
	words: {
		text: string;
		className?: string;
	}[];
	className?: string;
	cursorClassName?: string;
}) => {
	// split text inside of words into array of characters
	const wordsArray = words.map((word) => {
		return {
			...word,
			text: word.text.split(""),
		};
	});
	const renderWords = () => {
		return (
			<div>
				{wordsArray.map((word, index) => {
					const key = `word-${index}`;
					return (
						<div key={key} className="inline-block">
							{word.text.map((char, index) => {
								const key = `char-${index}`;
								return (
									<span
										key={key}
										className={cn(
											"dark:text-white text-black ",
											word.className,
										)}
									>
										{char}
									</span>
								);
							})}
							&nbsp;
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className={cn("flex", className)}>
			<motion.div
				className="overflow-hidden pb-2"
				initial={{
					width: "0%",
				}}
				whileInView={{
					width: "fit-content",
				}}
				transition={{
					duration: 0.8,
					ease: "linear",
					delay: 0.5,
				}}
			>
				<h2 style={{ whiteSpace: "nowrap" }}>{renderWords()} </h2>{" "}
			</motion.div>
			<motion.span
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.8,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
				}}
				className={cn("block w-[4px]", cursorClassName)}
			/>
		</div>
	);
};

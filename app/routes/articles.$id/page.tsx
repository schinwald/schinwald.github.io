import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { Children } from "react";
import { BiSolidCircle as CircleIcon } from "react-icons/bi";
import { FaArrowRightLong as RightArrowIcon } from "react-icons/fa6";
import { FaBookOpen as BookOpenIcon } from "react-icons/fa6";
import { IoMdHeart as FullHeartIcon } from "react-icons/io";
import { IoEyeOffOutline as EyeOffIcon } from "react-icons/io5";
import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";
import { match } from "ts-pattern";
import { BackgroundGradient } from "~/components/background-gradient";
import { Callout } from "~/components/callout";
import { Code } from "~/components/code";
import { Navigation } from "~/components/navigation";
import { NavigationBar } from "~/components/navigation-bar";
import { Button } from "~/components/primitives/ui/button";
import { Input } from "~/components/primitives/ui/input";
import { Link } from "~/components/primitives/ui/link";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import {
	getPublicationStatus,
	getVisibiliy,
	safeFormat,
	safeParseISO,
} from "~/utils/date";
import { Header } from "./components/header";
import type { Loader } from "./loader";

const MDX_GLOBAL_CONFIG = {
	MdxJsReact: {
		useMDXComponents,
	},
};

export default function () {
	const { code, frontmatter, toc, id } = useLoaderData<Loader>();
	const publishedAt = safeParseISO(frontmatter.meta.publishedAt);
	const publicationStatus = getPublicationStatus(publishedAt);
	const isHidden = Boolean(frontmatter.meta.isHidden);
	const visibility = getVisibiliy({ isHidden, publicationStatus });

	const Component = useMemo(
		() => getMDXComponent(code, MDX_GLOBAL_CONFIG),
		[code],
	);

	return (
		<div className="relative">
			<Navigation />
			<section className="w-screen h-screen">
				<div className="relative w-screen flex flex-col justify-center items-center text-foreground gap-28 pb-32">
					<NavigationBar />
					<Container variant="narrow">
						<div className="grid grid-cols-12 auto-rows-min gap-10">
							<div className="grid grid-cols-subgrid grid-rows-subgrid col-span-9 row-span-3 text-foreground-overlay">
								<div className="flex flex-col gap-14 col-span-9 row-start-1 row-end-2">
									<div className="flex flex-col items-center gap-3">
										<time className="font-light inline-flex gap-2">
											<span>🗓</span>
											{safeFormat(publishedAt) ?? "TBD"}
										</time>
										<h2 className="text-center drop-shadow-lg">
											{frontmatter.title}
										</h2>
									</div>
								</div>
								<div className="flex flex-col gap-4 col-span-9 row-start-2 row-end-2">
									<div className="aspect-[8/5] bg-[#fff8] rounded-sm overflow-clip shadow-lg shadow-black/20">
										{frontmatter.image ? (
											<img
												src={frontmatter.image.src}
												alt={frontmatter.image.alt}
											/>
										) : null}
									</div>
									<p className="flex items-center gap-2">
										<BookOpenIcon />
										<span>{frontmatter.meta.readingTime}</span>
									</p>
								</div>
								<article className="flex flex-col gap-10 col-span-9 row-start-3 row-end-3">
									<MDXProvider
										components={{
											h1: ({ children, ...props }) => (
												<Header type="h1" {...props}>
													{" "}
													{children}
												</Header>
											),
											h2: ({ children, ...props }) => (
												<Header type="h2" {...props}>
													{" "}
													{children}
												</Header>
											),
											h3: ({ children, ...props }) => (
												<Header type="h3" {...props}>
													{" "}
													{children}
												</Header>
											),
											h4: ({ children, ...props }) => (
												<Header type="h4" {...props}>
													{" "}
													{children}
												</Header>
											),
											h5: ({ children, ...props }) => (
												<Header type="h5" {...props}>
													{" "}
													{children}
												</Header>
											),
											h6: ({ children, ...props }) => (
												<Header type="h6" {...props}>
													{" "}
													{children}
												</Header>
											),
											ol: ({ children }) => (
												<ol className="list-decimal flex flex-col gap-4 ml-4 marker:text-tertiary">
													{children}
												</ol>
											),
											ul: ({ children }) => (
												<ul className="list-disc flex flex-col gap-4 ml-4 marker:text-tertiary">
													{children}
												</ul>
											),
											li: ({ children }) => (
												<li className="space-y-4">{children}</li>
											),
											img: ({ src, alt }) => (
												<div className="rounded-sm overflow-clip shadow-lg shadow-black/20">
													<img src={src} alt={alt} className="w-full" />
												</div>
											),
											"arrow-item": ({ children }) => (
												<li className="list-none space-y-4">
													{Children.map(children, (child, index) => {
														if (index === 0) {
															return (
																<div className="flex flex-row items-center gap-2">
																	<RightArrowIcon className="text-tertiary size-3 -ml-5" />
																	{child}
																</div>
															);
														}

														return child;
													})}
												</li>
											),
											"checklist-item": ({ isChecked, children }) => (
												<li className="list-none space-y-4">
													{Children.map(children, (child, index) => {
														if (index === 0) {
															return (
																<div className="flex flex-row items-center gap-2">
																	<input
																		type="checkbox"
																		defaultChecked={isChecked}
																		className="-ml-5"
																	/>
																	{child}
																</div>
															);
														}

														return child;
													})}
												</li>
											),
											callout: Callout,
											code: Code,
										}}
									>
										<Component />
									</MDXProvider>
								</article>
							</div>
							{import.meta.env.DEV ? (
								<div className="col-span-3 col-start-10 row-start-1 flex flex-col justify-end">
									{match(visibility)
										.with("hidden", () => (
											<p className="text-destructive flex flex-row items-center gap-2">
												<EyeOffIcon />
												Hidden
											</p>
										))
										.with("live", () => (
											<p className="text-success flex flex-row items-center gap-2">
												<CircleIcon className="animate-pulse size-2" />
												Live
											</p>
										))
										.with("scheduled", () => (
											<p className="text-orange-300 flex flex-row items-center gap-2">
												<CircleIcon className="animate-pulse size-2" />
												Scheduled
											</p>
										))
										.otherwise(() => null)}
								</div>
							) : null}
							<div className="col-span-3 flex flex-col gap-6 col-start-10 row-start-2 row-span-2">
								<div className="sticky top-10 flex flex-col gap-8">
									<div className="flex gap-2">
										{frontmatter.meta?.tags?.map((tag) => (
											<span className="bg-tertiary text-tertiary-foreground rounded-full text-sm px-2 py-0">
												{tag}
											</span>
										))}
									</div>
									<div className="flex flex-col gap-4">
										<ol className="list-none -ml-[1rem] flex flex-col gap-4">
											{toc.map(({ id, level, text }, index) => (
												<li
													key={id}
													className={cn(
														"text-nowrap transition-all ease-in-out",
														{
															"ml-[1rem]": level === 3,
															"ml-[2rem]": level === 4,
															"ml-[3rem]": level === 5,
															"text-primary": false,
														},
													)}
												>
													<p>
														<a href={`#${id}`}>{text}</a>
													</p>
												</li>
											))}
										</ol>
									</div>
									<div className="flex flex-col items-start gap-3">
										<Link
											to="https://buymeacoffee.com/schinwald"
											variant="ghost"
											size="minimal"
											className="flex flex-row gap-2"
										>
											<BuyMeACoffeeIcon className="text-yellow-200 size-4" />
											<span>Buy me a coffee</span>
										</Link>
										<Button
											variant="ghost"
											size="minimal"
											className="flex flex-row gap-2"
										>
											<FullHeartIcon className="text-red-500 size-4" />
											<span>Like</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Container>
					<Container variant="narrow">
						<div className="flex flex-row justify-between items-end">
							<div className="flex flex-col gap-4 max-w-[600px]">
								<h3>Newsletter</h3>
								<p>
									Subscribe to this newsletter to receive notifications when new
									articles are published
								</p>
								<div className="flex flex-row gap-4">
									<Input placeholder="Enter your email" />
									<Button>Subscribe</Button>
								</div>
							</div>
							<span className="text-[5rem]">🚀</span>
						</div>
					</Container>
				</div>
				<BackgroundGradient />
			</section>
		</div>
	);
}

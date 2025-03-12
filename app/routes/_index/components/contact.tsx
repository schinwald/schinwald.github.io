import { zodResolver } from "@hookform/resolvers/zod";
import { useLoaderData } from "@remix-run/react";
import { useAnimate, useInView } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReCAPTCHA } from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { ClientOnly } from "remix-utils/client-only";
import { z } from "zod";
import paperAnimation from "~/assets/lotties/paper_airplane.json";
import { Header } from "~/components/header";
import { LazyLottie } from "~/components/lottie.client";
import { Button } from "~/components/primitives/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/primitives/ui/form";
import { Input } from "~/components/primitives/ui/input";
import { Textarea } from "~/components/primitives/ui/textarea";
import { Socials } from "~/components/socials";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import type { Loader } from "../loader";

type Notification = {
	status?: "success" | "error";
	message?: string;
};

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: "(Required)" })
		.email("(Must be a valid email)"),
	message: z.string().min(1, { message: "(Required)" }),
});

type ContactProps = {
	className?: string;
};

const Contact: React.FC<ContactProps> = ({ className }) => {
	const {
		data: { googleReCAPTCHASiteKey },
	} = useLoaderData<Loader>();
	const lottiePaperAirplaneRef = useRef<LottieRefCurrentProps>(null);
	const lottiePaperAirplaneContainerRef = useRef(null);
	const [notification, setNotification] = useState<Notification>({});
	const [notificationRef, animateNotification] = useAnimate();
	const isInView = useInView(lottiePaperAirplaneContainerRef, {
		margin: "-200px 0px",
	});
	const [recaptchaResponse, setReCAPTCHAResponse] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			message: "",
		},
	});

	useEffect(() => {
		if (isInView) {
			if (lottiePaperAirplaneRef.current?.animationItem?.isPaused) {
				animatePaperAirplaneEntry();
			}
		}
	}, [isInView]);

	useEffect(() => {
		if (!isSubmitting) return;
		if (recaptchaResponse.length === 0) return;

		const values = form.getValues();

		const queryString = new URLSearchParams({
			"g-recaptcha-response": recaptchaResponse,
		}).toString();

		const responsePromise = fetch(`?${queryString}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				email: values.email,
				message: values.message,
			}),
		});

		animatePaperAirplaneExit();

		lottiePaperAirplaneRef?.current?.animationItem?.addEventListener(
			"complete",
			async () => {
				lottiePaperAirplaneRef?.current?.animationItem?.removeEventListener(
					"complete",
				);

				const response = await responsePromise;

				if (response.ok) {
					form.resetField("message");

					setNotification({
						status: "success",
						message: "Sent!",
					});
				} else {
					setNotification({
						status: "error",
						message: "Error!",
					});
				}

				animateNotification([
					[
						notificationRef.current,
						{
							opacity: 0,
							display: "block",
							transform: "translateY(100%)",
						},
						{
							duration: 0,
						},
					],
					[
						notificationRef.current,
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
						{
							duration: 0.2,
							ease: "easeOut",
						},
					],
					[
						notificationRef.current,
						{
							opacity: 1,
							transform: "translateY(0%)",
						},
						{
							duration: 0.3,
						},
					],
					[
						notificationRef.current,
						{
							opacity: 0,
							display: "none",
							transform: "translateY(100%)",
						},
						{
							duration: 0.5,
							ease: "easeIn",
						},
					],
				]);

				setTimeout(() => {
					animatePaperAirplaneEntry();
					setIsSubmitting(false);
					setReCAPTCHAResponse("");
				}, 1300);
			},
		);
	}, [isSubmitting, recaptchaResponse]);

	const animatePaperAirplaneEntry = useCallback(() => {
		lottiePaperAirplaneRef?.current?.playSegments([0, 96], true);
		lottiePaperAirplaneRef?.current?.playSegments([97, 146]);
		lottiePaperAirplaneRef?.current?.animationItem?.setLoop(true);
	}, [lottiePaperAirplaneRef]);

	const animatePaperAirplaneExit = useCallback(() => {
		lottiePaperAirplaneRef?.current?.playSegments([147, 200]);
		lottiePaperAirplaneRef?.current?.animationItem?.setLoop(false);
	}, [lottiePaperAirplaneRef]);

	const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
		setIsSubmitting(true);
	}, []);

	return (
		<div
			id="contact"
			className={cn(
				"relative w-screen flex flex-col items-center gap-10 py-20 -my-20",
				className,
			)}
		>
			<Container variant="narrow">
				<div className="relative flex flex-row justify-start">
					<Header
						className="text-left"
						title="Contact"
						align="left"
						variant="cascade"
					/>
				</div>
			</Container>
			<Container variant="hybrid">
				<div className="flex flex-col md:flex-row">
					<div className="relative flex flex-row md:flex-col justify-between p-8 md:p-12 bg-background rounded-t-md md:rounded-none md:rounded-l-md w-full h-[130px] md:h-auto md:w-[40%] overflow-hidden">
						<div className="relative">
							<div className="absolute top-0 right-0 bottom-0 left-0 flex flex-row justify-start items-start z-20">
								<h2 className="leading-10 text-foreground -rotate-6">
									<span className="text-3xl">Let's</span>
									<br></br>
									<span>Connect!</span>
								</h2>
							</div>
						</div>
						<div className="relative mb-2 mr-16 md:m-0 md:ml-0 md:mb-60 lg:m-0 lg:ml-10 lg:mb-60">
							<div
								ref={lottiePaperAirplaneContainerRef}
								className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] md:w-[600px] lg:w-[600px] pointer-events-none"
							>
								<ClientOnly>
									{() => (
										<LazyLottie
											lottieRef={lottiePaperAirplaneRef}
											animationData={paperAnimation}
											autoplay={false}
										/>
									)}
								</ClientOnly>
							</div>
						</div>
						<div className="absolute bottom-0 right-0 -translate-y-full -translate-x-1/2 mt-2">
							<h2
								ref={notificationRef}
								className={cn(
									"w-full hidden",
									notification.status === "success" && "text-success",
									notification.status === "error" && "text-destructive",
								)}
							>
								{notification.message}
							</h2>
						</div>
					</div>
					<div className="bg-background-overlay overflow-hidden rounded-b-md md:rounded-none md:rounded-r-md w-full md:w-[60%] relative">
						<div
							className={cn(
								"absolute left-0 top-0 right-0 bottom-0 bg-opacity-90 bg-background-overlay flex justify-center items-center",
								isSubmitting ? "" : "hidden",
							)}
						>
							<ReCAPTCHA
								sitekey={googleReCAPTCHASiteKey}
								onChange={(value) => {
									if (value) {
										setReCAPTCHAResponse(value);
									}
								}}
							/>
						</div>
						<Form {...form}>
							<form
								className="p-8 md:p-12 flex flex-col gap-4 md:gap-5"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row justify-start gap-2">
												<FormLabel>Email</FormLabel>
												<FormMessage className="leading-none" />
											</div>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row justify-start gap-2">
												<FormLabel>Message</FormLabel>
												<FormMessage className="leading-none" />
											</div>
											<FormControl>
												<Textarea rows={8} {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<div className="flex flex-col items-center md:items-start gap-5 mt-2">
									<div className="flex flex-row justify-center md:justify-start">
										<Button type="submit" variant="default" click="scale">
											Submit
										</Button>
									</div>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</Container>
			<Container variant="narrow">
				<Socials />
			</Container>
		</div>
	);
};

export { Contact };

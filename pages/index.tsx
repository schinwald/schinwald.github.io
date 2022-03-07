import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/modules/pages/Home.module.scss';
import { Header, Carousel, Figure, Link, Badge } from 'components/primitives';
import { Navigation, Logo, Socials, Terminal, Guide, Contact } from 'components';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Slider from 'react-slick';
import { UnorderedList } from 'components/layouts/UnorderedList';
import { BadgeList } from '@components/layouts';
import { useGitHub } from 'hooks/useGitHub';
import { ThemeProvider } from 'hooks/context';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home: NextPage = () => {
	const { github, loading, error } = useGitHub(['eval2021', 'weather-or-not', 'pets'])

	useEffect(() => {
		// const scrollTriggers = Array<ScrollTrigger>()	

		// const transitions = [
		// 	{
		// 		elements: gsap.utils.toArray('.scrolling--fade-in--up') as Array<gsap.DOMTarget>,
		// 		setOptions: {
		// 			opacity: 0,
		// 			y: 10
		// 		},
		// 		animationOptions: {
		// 			ease: 'power1',
		// 			opacity: 1,
		// 			y: 0
		// 		}
		// 	},
		// 	{
		// 		elements: gsap.utils.toArray('.scrolling--fade-in--right') as Array<gsap.DOMTarget>,
		// 		setOptions: {
		// 			opacity: 0,
		// 			x: 50
		// 		},
		// 		animationOptions: {
		// 			ease: 'power1',
		// 			opacity: 1,
		// 			x: 0
		// 		}
		// 	},
		// 	{
		// 		elements: gsap.utils.toArray('.scrolling--fade-in--left') as Array<gsap.DOMTarget>,
		// 		setOptions: {
		// 			opacity: 0,
		// 			x: -50
		// 		},
		// 		animationOptions: {
		// 			ease: 'power1',
		// 			opacity: 1,
		// 			x: 0
		// 		}
		// 	}
		// ]

		// for (const transition of transitions) {
		// 	for (let i = 0; i < transition.elements.length; i++) {
		// 		gsap.set(transition.elements[i], transition.setOptions)
				
		// 		const animation = gsap.to(transition.elements[i], transition.animationOptions)

		// 		const scrollTrigger = ScrollTrigger.create({
		// 			scroller: `.${styles['container']}`,
		// 			animation: animation,
		// 			trigger: transition.elements[i],
		// 			toggleActions: 'play reverse play reverse',
		// 			start: 'top bottom',
		// 			end: 'bottom top',
		// 			markers: true
		// 		})
	
		// 		scrollTriggers.push(scrollTrigger)
		// 	}
		// }
	
		// return () => {
		// 	for (const scrollTrigger of scrollTriggers) {
		// 		scrollTrigger.kill()
		// 	}
		// }
	})

	useEffect(() => {
		// const scrollTriggers = Array<ScrollTrigger>()	

		// let sections = gsap.utils.toArray(`.${styles['layout']}`) as Array<gsap.DOMTarget>

		// for (let i = 0; i < sections.length; i++) {
		// 	let scrollTrigger: ScrollTrigger;

		// 	scrollTrigger = ScrollTrigger.create({
		// 		scroller: `.${styles['container']}`,
		// 		trigger: sections[i],
		// 		start: 'bottom bottom',
		// 		scrub: true,
		// 		markers: true
		// 	})

		// 	scrollTriggers.push(scrollTrigger)
		// }

		// return () => {
		// 	for (const scrollTrigger of scrollTriggers) {
		// 		scrollTrigger.kill()
		// 	}
		// }
	})
	
	const projects = {
		carousel: {
			subheadersRef: useRef<Slider>(null),
			figuresRef: useRef<Slider>(null),
			descriptionRef: useRef<Slider>(null)
		}
	}

	const artwork = {
		carousel: {
			subheadersRef: useRef<Slider>(null),
			figuresRef: useRef<Slider>(null),
			descriptionRef: useRef<Slider>(null)
		}
	}

	const blogs = {
		carousel: {
			subheadersRef: useRef<Slider>(null),
			figuresRef: useRef<Slider>(null),
			descriptionRef: useRef<Slider>(null)
		}
	}

	return <>
		<Head>
			{/* meta data */}
			<meta name="description" content="A portfolio website for the author (James Schinwald)." />
			{/* title and icons */}
			<title>James Schinwald</title>
			<link rel="shortcut icon" href="images/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png" />
			<link rel="manifest" href="images/site.webmanifest" />
		</Head>
		<ThemeProvider theme="light">
			<div className={styles["container"]}>
				<section id="introduction" className={[styles["introduction"], styles["section"]].filter(Boolean).join(' ')} aria-label="Introduction">
					<div className={[styles["layout"], styles["lean"], styles["lean--right"]].filter(Boolean).join(' ')}>
						<Navigation className={[styles["navigation"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Logo className={[styles["logo"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Figure className={[styles["figure"], 'scrolling--fade-in--left'].filter(Boolean).join(' ')}>
							<Image
								src="/images/pages/home/introduction.png"
								alt="Picture of the author (James Schinwald)."
								layout="responsive"
								objectFit="cover"
								width={1111}
								height={2535}
								quality={100}
								priority={true} />
						</Figure>
						<Socials className={[styles["socials"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Terminal className={[styles["terminal"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<article className={[styles["article"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')}>
							<p>I strive to be better with each passing day. While things don&#39;t always go as planned, I truly believe that through perseverance anything is possible. I am forever grateful for the support of those around me.</p>
						</article>
					</div>
				</section>
				<section id={"about"} className={[styles["about"], styles["section"]].filter(Boolean).join(' ')} aria-label="About" >
					<div className={[styles["layout"], styles["lean"], styles["lean--left"]].filter(Boolean).join(' ')}>
						<Guide className={styles["guide"]} container={`.${styles['container']}`} target="#about" text="Scroll Down" direction="down" />
						<Navigation className={[styles["navigation"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Logo className={[styles["logo"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Figure className={[styles["figure"], 'scrolling--fade-in--right'].filter(Boolean).join(' ')}>
							<Image
								src="/images/pages/home/about.png"
								alt="Picture of the author (James Schinwald)."
								layout="responsive"
								objectFit="contain"
								width={537}
								height={650}
								quality={30}
								priority={false} />
						</Figure>
						<Header className={[styles["header"], 'scrolling--fade-in--left'].filter(Boolean).join(' ')} type="h1" justify="right" underline={true} icon={{ type: "fontawesome", name: "hashtag", position: "left" }}>
							About
						</Header>
						<article className={[styles["article"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')}>
							<p>I am a recent graduate with a solid background in software development and excellent communication skills. Passionate about learning and growing, I am looking to join a high performing and dynamic team where I can refine my skill set.</p>
						</article>
					</div>
				</section>
				<section id={"projects"} className={[styles["projects"], styles["section"]].filter(Boolean).join(' ')} aria-label="Projects" >
					<div className={[styles["layout"], styles["lean"], styles["lean--right"]].filter(Boolean).join(' ')}>
						<Guide className={styles["guide"]} container={`.${styles['container']}`} target="#projects" text="Scroll Down" direction="down" />
						<Navigation className={[styles["navigation"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Logo className={[styles["logo"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Header className={[styles["header"], 'scrolling--fade-in--right'].filter(Boolean).join(' ')} type="h1" justify="left" underline={true} icon={{ type: "fontawesome", name: "hashtag", position: "right" }}>
							Projects
						</Header>
						<Carousel className={[styles["subheaders"], 'shadow shadow--text', 'scrolling--fade-in--left'].filter(Boolean).join(' ')} sliderRef={projects.carousel.subheadersRef} linkedRef={projects.carousel.figuresRef} arrows={true} fade={true}>
							{ !loading && github.repos.map((repo, index) => {
								return <Header key={index} className={styles["header"]} type="h2" justify="center">
									{repo.name}
								</Header>
							}) }
						</Carousel>
						<Carousel className={[styles["figures"], 'scrolling--fade-in--left'].filter(Boolean).join(' ')} sliderRef={projects.carousel.figuresRef} linkedRef={projects.carousel.descriptionRef} draggable={true}>
							{ !loading && github.repos.map((repo, index) => {
								return (
									<div key={index} className={styles["figures__container"]}>
										<Figure className={styles["figures__picture"]}>
											<Image
												src={repo.production.logo.image_url}
												alt={`Picture of the ${repo.name} github repository`}
												layout="fill"
												objectFit="contain"
												quality={30}
												priority={false} />
										</Figure>
										<video className={styles["figures__video"]} poster={repo.production.preview.image_url} controls={true}>
											<source src={repo.production.preview.video_url} type="video/mp4" />
										</video>
									</div>
								)
							}) }
						</Carousel>
						<Carousel className={[styles["descriptions"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} sliderRef={projects.carousel.descriptionRef} linkedRef={projects.carousel.subheadersRef} fade={true}>
							{ !loading && github.repos.map((repo, index) => {
								return (
									<article key={index}>
										<h6>Description:</h6>
										<p>{repo.description}</p>
										<h6>Technologies:</h6>
										<BadgeList className={styles["technology__badges"]} direction="horizontal">
											{ repo.development.tags.map((tag, index) => {
												return <Badge key={index} icon={{ type: "devicon", name: `${tag.name}-${tag.style} colored`, position: "left" }}>{tag.name}</Badge>
											}) }
										</BadgeList>
										<h6>GitHub:</h6>
										<BadgeList className={styles["github_badges"]} direction="horizontal">
											<Badge icon={{ type: "fontawesome", name: 'code-commit', position: "left" }}>
												<span>Commits</span>
												<span>{repo.development.commits}</span>
											</Badge>
											<Badge icon={{ type: "fontawesome", name: 'code-fork', position: "left" }}>
												<span>Forks</span>
												<span>{repo.development.forks}</span>
											</Badge>
											<Badge icon={{ type: "fontawesome", name: 'eye', position: "left" }}>
												<span>Watchers</span>
												<span>{repo.development.watchers}</span>
											</Badge>
											<Badge icon={{ type: "fontawesome", name: 'star', position: "left" }}>
												<span>Stars</span>
												<span>{repo.development.stars}</span>
											</Badge>
											{ repo.development.license && 
												<Badge icon={{ type: "fontawesome", name: 'scale', position: "left" }}>
													<span>{repo.development.license}</span>
												</Badge>
											}
										</BadgeList>
										<UnorderedList direction="horizontal">
											<Link href={repo.development.homepage_url} icon={{ type: "fontawesome", name: "github", position: "left"}} underline={true} rel="external">Source Code</Link>
											<Link href={repo.production.homepage_url} icon={{ type: "fontawesome", name: "link", position: "left"}} underline={true} rel="external">Demo</Link>
										</UnorderedList>
									</article>
								)
							}) }
						</Carousel>
					</div>
				</section>
				<section id={"artwork"} className={[styles["artwork"], styles["section"]].filter(Boolean).join(' ')} aria-label="Blog" >
					<div className={[styles["layout"], styles["lean"], styles["lean--left"]].filter(Boolean).join(' ')}>
						<Guide className={styles["guide"]} container={`.${styles['container']}`} target="#artwork" text="Scroll Down" direction="down" />
						<Navigation className={[styles["navigation"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Logo className={[styles["logo"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Header className={[styles["header"], 'scrolling--fade-in--left'].filter(Boolean).join(' ')} type="h1" justify="right" underline={true} icon={{ type: "fontawesome", name: "hashtag", position: "left" }}>
							Artwork
						</Header>
						<Carousel className={[styles["subheaders"], 'shadow shadow--text', 'scrolling--fade-in--right'].filter(Boolean).join(' ')} sliderRef={blogs.carousel.subheadersRef} linkedRef={artwork.carousel.figuresRef} arrows={true} fade={true}>
							<Header className={styles["header"]} type="h2" justify="center">
								Animations
							</Header>
						</Carousel>
						<Carousel className={[styles["figures"], 'scrolling--fade-in--right'].filter(Boolean).join(' ')} sliderRef={blogs.carousel.figuresRef} linkedRef={artwork.carousel.descriptionRef} draggable={true}>
							<Figure className={styles["figures__picture"]}>
								{/* <Image
									src="/images/pages/home/medium.png"
									alt="Picture of the medium.com website banner"
									layout="fill"
									objectFit="contain"
									quality={30}
									priority={false} /> */}
							</Figure>
						</Carousel>
						<Carousel className={[styles["descriptions"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} sliderRef={blogs.carousel.descriptionRef} linkedRef={artwork.carousel.subheadersRef} fade={true}>
							<article>
								<h6>Description:</h6>
								<p>This section is currently under construction.</p>
								<UnorderedList direction="horizontal">
									<Link href="" icon={{ type: "fontawesome", name: "reading", position: "left"}} underline={true} rel="external">Read More</Link>
								</UnorderedList>
							</article>
						</Carousel>
					</div>
				</section>
				<section id={"blogs"} className={[styles["blogs"], styles["section"]].filter(Boolean).join(' ')} aria-label="Blogs" >
					<div className={[styles["layout"], styles["lean"], styles["lean--right"]].filter(Boolean).join(' ')}>
						<Guide className={styles["guide"]} container={`.${styles['container']}`} target="#blogs" text="Scroll Down" direction="down" />
						<Navigation className={[styles["navigation"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Logo className={[styles["logo"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Header className={[styles["header"], 'scrolling--fade-in--right'].filter(Boolean).join(' ')} type="h1" justify="left" underline={true} icon={{ type: "fontawesome", name: "hashtag", position: "right" }}>
							Blogs
						</Header>
						<Carousel className={[styles["subheaders"], 'shadow shadow--text', 'scrolling--fade-in--left'].filter(Boolean).join(' ')} sliderRef={blogs.carousel.subheadersRef} linkedRef={blogs.carousel.figuresRef} arrows={true} fade={true}>
							<Header className={styles["header"]} type="h2" justify="center">
								Miscellaneous
							</Header>
							<Header className={styles["header"]} type="h2" justify="center">
								Programming
							</Header>
						</Carousel>
						<Carousel className={[styles["figures"], 'scrolling--fade-in--left'].filter(Boolean).join(' ')} sliderRef={blogs.carousel.figuresRef} linkedRef={blogs.carousel.descriptionRef} draggable={true}>
							<Figure className={styles["figures__picture"]}>
								<Image
									src="/images/pages/home/medium.png"
									alt="Picture of the medium.com website banner"
									layout="fill"
									objectFit="contain"
									quality={30}
									priority={false} />
							</Figure>
							<Figure className={styles["figures__picture"]}>
								<Image
									src="/images/pages/home/dev.png"
									alt="Picture of the dev.to website banner"
									layout="fill"
									objectFit="contain"
									quality={30}
									priority={false} />
							</Figure>
						</Carousel>
						<Carousel className={[styles["descriptions"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} sliderRef={blogs.carousel.descriptionRef} linkedRef={blogs.carousel.subheadersRef} fade={true}>
							<article>
								<h6>Description:</h6>
								<p>
									An open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic. Here I will talk about various things that I find interesting in my day to day life.
								</p>
								<UnorderedList direction="horizontal">
									<Link href="" icon={{ type: "fontawesome", name: "reading", position: "left"}} underline={true} rel="external">Read More</Link>
								</UnorderedList>
							</article>
							<article>
								<h6>Description:</h6>
								<p>
									A constructive and inclusive social network for software developers. Here I will talk about all things programming related! I hope to create tutorials and share code snippets with readers.
								</p>
								<UnorderedList direction="horizontal">
									<Link href="" icon={{ type: "fontawesome", name: "reading", position: "left"}} underline={true} rel="external">Read More</Link>
								</UnorderedList>
							</article>
						</Carousel>
					</div>
				</section>
				<section id={"resume"} className={[styles["resume"], styles["section"]].filter(Boolean).join(' ')} aria-label="Resume" >
					<div className={[styles["layout"], styles["lean"], styles["lean--left"]].filter(Boolean).join(' ')}>
						<Guide className={styles["guide"]} container={`.${styles['container']}`} target="#resume" text="Scroll Down" direction="down" />
						<Navigation className={[styles["navigation"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Logo className={[styles["logo"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Header className={[styles["header"], 'scrolling--fade-in--left'].filter(Boolean).join(' ')} type="h1" justify="right" underline={true} icon={{ type: "fontawesome", name: "hashtag", position: "left" }}>
							Resume
						</Header>
						<Figure className={[styles["file"], 'scrolling--fade-in--right'].filter(Boolean).join(' ')}>
							<iframe src="//assets.ctfassets.net/8q0xl0zz73ut/5PqdVv20aomIRmlNyxdtGf/1719e206c78a6093746212a9a1cfc6f3/Resume_-_James_Schinwald.pdf" width="100%" height="100%"></iframe>
						</Figure>
						<article className={[styles["article"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')}>
							<p>I have been passionate about software development for many years and I am thrilled to be able to pursue it as a career!</p>
							<h6>Having trouble viewing my resume?</h6>
							<UnorderedList direction="horizontal">
								<Link href="//assets.ctfassets.net/8q0xl0zz73ut/5PqdVv20aomIRmlNyxdtGf/1719e206c78a6093746212a9a1cfc6f3/Resume_-_James_Schinwald.pdf" icon={{ type: "fontawesome", name: "link", position: "left"}} underline={true} rel="external">Open</Link>
								<Link href="//assets.ctfassets.net/8q0xl0zz73ut/5PqdVv20aomIRmlNyxdtGf/1719e206c78a6093746212a9a1cfc6f3/Resume_-_James_Schinwald.pdf" icon={{ type: "fontawesome", name: "download", position: "left"}} underline={true} download="Resume - James Schinwald">Download</Link>
							</UnorderedList>
						</article>
					</div>
				</section>
				<section id={"contact"} className={[styles["contact"], styles["section"]].filter(Boolean).join(' ')} aria-label="Contact" >
					<div className={[styles["layout"], styles["lean"], styles["lean--right"]].filter(Boolean).join(' ')}>
						<Guide className={styles["guide"]} container={`.${styles['container']}`} target="#contact" text="Scroll Down" direction="down" />
						<Navigation className={[styles["navigation"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Logo className={[styles["logo"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
						<Header className={[styles["header"], 'scrolling--fade-in--right'].filter(Boolean).join(' ')} type="h1" justify="left" underline={true} icon={{ type: "fontawesome", name: "hashtag", position: "right" }}>
							Contact
						</Header>
						<Contact className={[styles["form"], 'scrolling--fade-in--up'].filter(Boolean).join(' ')} />
					</div>
				</section>
			</div>
		</ThemeProvider>
	</>
}

export default Home

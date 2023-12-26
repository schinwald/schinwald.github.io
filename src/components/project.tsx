import React, { useEffect, useRef } from 'react'
import { useAnimate, useInView, motion } from 'framer-motion'
import { cn } from '@/utils'
import { Button } from './primitives/ui/button'
import { Overlay } from '@/components/overlay'
import { Link } from './primitives/ui/link'

type Props = {
	className?: string
	title: string
	justify: 'left' | 'right'
}

const Project: React.FC<Props> = ({ className, title, justify, ...props }) => {
	const [markerRef, animateMarker] = useAnimate()
	const [headerRef, animateHeader] = useAnimate()
	const [overlayRef, animateOverlay] = useAnimate()
	const containerRef = useRef<HTMLDivElement>(null)
	const isInView = useInView(containerRef, { margin: "600px 0px -300px 0px", once: true })

	useEffect(() => {
		if (isInView) {
			animateMarker(markerRef.current, {
				opacity: 1,
				scale: '100%'
			}, {
				duration: 0.2,
				ease: 'easeOut',
			})

			animateHeader(headerRef.current, {
				x: '0%'
			}, {
				duration: 0.3,
				ease: 'easeOut',
				delay: 0.3,
			})
		}
	}, [isInView])

	function handleJustification<T>({ left, right }: { left: T, right: T }): T {
		switch (justify) {
			case 'left': return left
			case 'right': return right
		}
	}

	return (
		<div
			ref={containerRef}
			className={cn(
				handleJustification({ left: 'item-start', right: 'item-end' }),
				'flex flex-col gap-6'
			)}
		>
			<div
				className={cn(
					handleJustification({ left: 'flex-row', right: 'flex-row-reverse' }),
					'flex'
				)}
			>
				<motion.div
					ref={markerRef}
					className='h-10 aspect-square bg-tertiary z-30'
					style={{ opacity: 0, scale: '0%' }}
				>
				</motion.div>
				<div className='overflow-hidden'>
					<motion.div
						ref={headerRef}
						className={cn(
							handleJustification({ left: 'border-r', right: 'border-l' }),
							'h-10 border-t border-b flex flex-row justify-center items-center px-4'
						)}
						style={{ x: handleJustification({ left: '-100%', right: '100%' }) }}
					>
						<h4 className='text-foreground'>{title}</h4>
					</motion.div>
				</div>
			</div>
			<div
				className={cn(
					handleJustification({ left: 'justify-start', right: 'justify-end' }),
					'overflow-clip flex flex-row'
				)}
			>
				<motion.div
					className={cn(
						handleJustification({ left: 'flex-row', right: 'flex-row-reverse' }),
						'flex h-[300px] w-full sm:w-[500px]'
					)}
					onHoverStart={() => {
						animateOverlay(overlayRef.current, {
							opacity: [0, 1]
						}, {
							duration: 0.2,
							ease: 'easeOut'
						})
					}}
					onHoverEnd={() => {
						animateOverlay(overlayRef.current, {
							opacity: [1, 0]
						}, {
							duration: 0.2,
							ease: 'easeOut'
						})
					}}
				>
					<div className='relative overflow-hidden w-full h-full'>
						<Overlay
							ref={overlayRef}
							className='opacity-0'
							position='absolute'
						>
							<div className='absolute w-full h-full py-10 px-12 flex flex-col justify-start z-10 gap-2'>
								<div>
									<Link
										href='/hello'
										variant='outline'
										size='sm'
									>
										Demo
									</Link>
								</div>
								<p className='text-white line-clamp-[8]'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
								</p>
							</div>
							<div className='absolute w-full h-full bg-background opacity-80'></div>
						</Overlay>
						<img className='object-cover -rotate-6 scale-150' src='https://github.com/schinwald/cartera/blob/main/preview.jpg?raw=true'></img>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export { Project }

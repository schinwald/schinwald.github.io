import React from 'react'
import { Header } from '@/components/header'
import { Project } from '@/components/project'
import { Container } from '@/layouts/container'

type Props = {
	className?: string
}

const Projects: React.FC<Props> = ({ className, ...props }) => {
	return (
		<div className='relative w-screen flex flex-row justify-center'>
			<Container variant='narrow'>
				<div className='w-full max-w-screen-md flex flex-row justify-start'>
					<Header
						className='text-left'
						title='Projects'
						align='left'
						variant='cascade'
					/>
				</div>
				<Project
					title='Cartera'
					justify='left'
				/>
				<Project
					title='Cartera'
					justify='right'
				/>
				<Project
					title='Cartera'
					justify='left'
				/>
				<Project
					title='Cartera'
					justify='right'
				/>
			</Container >
		</div>
	)
}

export { Projects }

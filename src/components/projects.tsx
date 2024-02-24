import React from 'react'
import { Header } from '@/components/header'
import { Project } from '@/components/project'
import { Container } from '@/layouts/container'

type ProjectsProps = {
	className?: string
}

const Projects: React.FC<ProjectsProps> = ({ className }) => {
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
					repository='https://github.com/schinwald/cartera'
					image={{
						url: 'https://github.com/schinwald/cartera/blob/main/preview.jpg?raw=true'
					}}
				/>
				<Project
					title='Pets'
					justify='right'
					repository='https://github.com/schinwald/pets'
					image={{
						url: 'https://github.com/schinwald/pets/blob/main/preview.jpg?raw=true'
					}}
				/>
				<Project
					title='Weather or Not'
					justify='left'
					repository='https://github.com/schinwald/weather-or-not'
					image={{
						url: 'https://github.com/schinwald/weather-or-not/blob/main/preview.jpg?raw=true'
					}}
				/>
				<Project
					title='Express Otter'
					justify='right'
					repository='https://github.com/schinwald/express-otter'
					image={{
						url: 'https://github.com/schinwald/express-otter/blob/development/logo.png?raw=true'
					}}
				/>
			</Container >
		</div>
	)
}

export { Projects }

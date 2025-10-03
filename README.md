# Portfolio Website

A modern, responsive personal portfolio website built with React Router, featuring dynamic content, authentication, and seamless deployment.

This is currently hosted on [https://schinwald.dev](https://schinwald.dev)

## Features

- Dynamic content management via Supabase
- Authentication with OAuth (Google, GitHub)
- MDX-powered blog/articles
- Interactive components
- SEO optimized with meta tags

## Getting Started

### Requirements

- `pnpm` for package management
- `psql` for the database

Run the setup script to get you up and running:
```sh
./setup.sh
```

## Development

Start the development server:
```sh
pnpm dev
```

Database connection string:
`postgresql://postgres@localhost:5432/portfolio`

Feel free to connect with psql or with your database software of choice:
```sh
psql postgresql://postgres@localhost:5432/portfolio
```

## Deployment

Push migrations to Supabase:
```sh
pnpm db:push
```

Build and start the server (this should be done by CI/CD):
```sh
pnpm build
pnpm start
```

## License

This project is licensed under the MIT License.

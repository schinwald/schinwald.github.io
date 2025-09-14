## Development

```sh
cp .env.example .env
```

Update the environment variables with the correct values

```sh
createdb -O postgres portfolio
```

```sh
pnpm db:migrate
pnpm db:seed
```

Run the Vite dev server:

```sh
pnpm dev
```

## Deployment

First, build your app for production:

```sh
pnpm build
```

Then run the app in production mode:

```sh
pnpm start
```

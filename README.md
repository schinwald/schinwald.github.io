## Development

```sh
cp .env.example .env
```

Update the environment variables with the correct values

Setup the database locally:
```sh
createdb -O postgres portfolio
```

Make sure that it's working:
```sh
psql -U postgres -d portfolio
```

Setup Supabase:
```sh
pnpm exec supabase init
pnpm exec supabase link
```

Run the migrations and seed:
```sh
pnpm db:migrate
pnpm db:seed
```

Run the Vite dev server:
```sh
pnpm dev
```

## Deployment

Push migrations to Supabase:

```sh
pnpm db:push
```

First, build your app for production:

```sh
pnpm build
```

Then run the app in production mode:

```sh
pnpm start
```

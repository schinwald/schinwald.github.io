#! /bin/bash

# Install all dependencies
pnpm install

# Copy the environment variable format from the example
cp .env.example .env

# Create the database locally as a postgres user
createdb -O postgres portfolio

# Run migrations and populate database with seed data
pnpm db:migrate
pnpm db:seed

# Setup supabase
pnpx exec supabase init
pnpx exec supabase link

# Open environment variables
$EDITOR .env

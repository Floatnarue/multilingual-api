# Ednovator <!-- omit in toc -->

Ednovator is a platform for educators to create and share educational content for schools and institutions.

# Table of Contents <!-- omit in toc -->

- [Global setup](#global-setup)
- [Database setup](#database-setup)
- [Service setup](#service-setup)
  - [@api/core](#apicore)

# Pre-requisites <!-- omit in toc -->

1. [pnpm](https://pnpm.io/)
2. Docker ([Docker Desktop](https://www.docker.com/products/docker-desktop/) / [OrbStack](https://orbstack.dev/))

# Global setup

1. First, install Javascript dependencies

   ```sh
   pnpm i
   ```

   > Make sure to use correct version of `pnpm`

# Database setup

1. Start the local database

   ```sh
   docker-compose up -d
   ```

2. Setup environment files to point to the local database

   ```sh
   cp api-core/.env.sample api-core/.env
   ```

3. Migrate the database

   ```sh
   pnpm prisma migrate dev
   ```

4. Generate Prisma Client

   ```sh
   pnpm prisma generate
   ```

# Service setup

## @api-core

1. Start the service

   ```sh
   pnpm run start:dev
   ```

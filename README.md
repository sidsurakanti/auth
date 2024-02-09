Auth implimentation using Next.js 14 and  Auth.js.

## Overview

I made this simple auth implementation to recycle and reuse and use for my other projects.

> 📝 This version only offers only for email and password sign in. I plan to add on to this very soon.

### What I learned
- Authentication
- Auth.js
- Working with Next.js middleware

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository

```shell
git clone https://github.com/sidsurakanti/auth.git
```

Navigate to the project directory

```shell
cd auth
```

Install dependencies

```shell
npm install
```

Add `.env.local` file using `.env.example`

```py
# auth secret for next auth
# you can generate one by running this in your terminal: $ openssl rand -base64 32
AUTH_SECRET=
# vercel postgres env variables
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

Start the dev server

```shell
npm run dev
```

Your application should now be running on `http://localhost:3000`.

### Technologies used

- [Next.js 14](https://nextjs.org/)
- [Auth.js](https://authjs.dev/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [shadcn/ui](https://ui.shadcn.com)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

### Usage

1. Have a look through the code and use the parts you need
2. That's it

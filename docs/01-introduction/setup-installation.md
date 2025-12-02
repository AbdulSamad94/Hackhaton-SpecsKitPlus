---
sidebar_position: 2
---

# Setup & Installation

To create a new Next.js application, we recommend using `create-next-app`, which sets up everything automatically for you.

## Creating a New Project

```bash
npx create-next-app@latest
```

On installation, you'll see the following prompts:

```txt
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
```

After the prompts, `create-next-app` will create a folder with your project name and install the required dependencies.

## Project Structure

Your new Next.js project will have the following structure:

```
my-app/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── (static files)
├── next.config.js
├── package.json
└── tsconfig.json (if using TypeScript)
```

## Running the Development Server

1.  Run `npm run dev` to start the development server.
2.  Visit `http://localhost:3000` to view your application.
3.  Edit `app/page.tsx` (or `pages/index.tsx`) and save the file to see the result in your browser.

## Production Build

To create a production build:

```bash
npm run build
npm start
```

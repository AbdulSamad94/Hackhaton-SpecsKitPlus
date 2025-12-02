---
sidebar_position: 2
---

# Tailwind CSS

Tailwind CSS is a utility-first CSS framework that works exceptionally well with Next.js.

## Installation

1.  Install Tailwind CSS:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2.  Configure `tailwind.config.js`:
    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3.  Add Tailwind directives to your Global CSS file:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

4.  Start using utility classes in your application:
    ```tsx
    export default function Page() {
      return <h1 className="text-3xl font-bold underline">Hello world!</h1>
    }
    ```

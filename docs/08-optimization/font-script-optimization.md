---
sidebar_position: 2
---

# Font & Script Optimization

## Font Optimization

`next/font` will automatically optimize your fonts (including custom fonts) and remove external network requests for improved privacy and performance.

```tsx
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

## Script Optimization

The Script component, `next/script`, allows you to load third-party scripts anywhere in your application.

```tsx
import Script from 'next/script'
 
export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="lazyOnload" />
    </>
  )
}
```

### Strategies

-   `beforeInteractive`: Load before any Next.js code
-   `afterInteractive`: (default) Load after some hydration
-   `lazyOnload`: Load during idle time
-   `worker`: (experimental) Load in a web worker

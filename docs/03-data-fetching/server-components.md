---
sidebar_position: 1
---

# Server Components

Next.js extends the native `fetch` Web API to allow you to configure the caching and revalidating behavior for each fetch request on the server.

You can use `fetch` with `async`/`await` in Server Components, in Route Handlers, and in Server Actions.

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main>{/* ... */}</main>
}
```

## Static Data Fetching (Default)

By default, `fetch` will automatically fetch and cache data indefinitely.

```tsx
fetch('https://...') // cache: 'force-cache' is the default
```

## Dynamic Data Fetching

To fetch fresh data on every fetch request, use the `cache: 'no-store'` option.

```tsx
fetch('https://...', { cache: 'no-store' })
```

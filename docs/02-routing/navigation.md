---
sidebar_position: 3
---

# Navigation

There are two ways to navigate between routes in Next.js:

1.  Using the `<Link>` Component
2.  Using the `useRouter` hook

## `<Link>` Component

`<Link>` is a built-in component that extends the HTML `<a>` tag to provide prefetching and client-side navigation between routes.

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

## `useRouter` Hook

The `useRouter` hook allows you to programmatically change routes inside Client Components.

```tsx
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

## Prefetching

Prefetching is a way to preload a route in the background before the user visits it. Next.js automatically prefetches routes when they appear in the viewport.

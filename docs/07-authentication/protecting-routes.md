---
sidebar_position: 2
---

# Protecting Routes

You can protect routes using Middleware or by checking the session in Server Components.

## Middleware

```tsx
// middleware.ts
export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard"] }
```

## Server Components

```tsx
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return <div>Protected Dashboard</div>
}
```

## Client Components

```tsx
'use client'
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <p>Loading...</p>
  }
  
  if (status === "unauthenticated") {
    redirect('/api/auth/signin')
  }
  
  return <div>Protected Dashboard</div>
}
```

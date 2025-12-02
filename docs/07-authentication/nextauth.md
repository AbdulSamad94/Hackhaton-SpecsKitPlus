---
sidebar_position: 1
---

# NextAuth.js

NextAuth.js is a complete open-source authentication solution for Next.js applications.

## Installation

```bash
npm install next-auth
```

## Configuration

Create a route handler for NextAuth.

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
})

export { handler as GET, handler as POST }
```

## Using Sessions

```tsx
import { getServerSession } from "next-auth/next"

export default async function Dashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return <div>Protected Dashboard</div>
}
```

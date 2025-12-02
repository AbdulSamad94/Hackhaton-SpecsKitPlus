---
sidebar_position: 1
---

# Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

## Creating Route Handlers

Route Handlers are defined in a `route.js` or `route.ts` file inside the `app` directory.

```tsx
// app/api/hello/route.ts
export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}
```

Route Handlers can be nested inside the `app` directory, similar to `page.js` and `layout.js`. But there cannot be a `route.js` file at the same route segment level as `page.js`.

## Supported HTTP Methods

The following HTTP methods are supported: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`.

```tsx
// app/api/items/route.ts
import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...')
  const data = await res.json()
 
  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}
```

---
sidebar_position: 2
---

# Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Middleware runs before cached content and routes are matched.

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: '/about/:path*',
}
```

## Use Cases

- Authentication and Authorization
- Server-side redirects
- Path rewrites
- Bot detection
- Logging and analytics
- Feature flagging

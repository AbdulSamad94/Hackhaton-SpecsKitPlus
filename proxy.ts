import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // If the user visits the root path '/', rewrite to '/docs/intro' (or just '/docs/')
    if (request.nextUrl.pathname === '/') {
        return NextResponse.rewrite(new URL('/docs/intro', request.url));
    }
}

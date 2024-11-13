import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './app/lib/authentication';

export function middleware(request: NextRequest) {
    if (!isAuthenticated()) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:function*'
    ],
}
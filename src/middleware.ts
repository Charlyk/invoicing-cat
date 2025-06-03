import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Skip locales
    const PUBLIC_FILE = /\.(.*)$/;
    if (
        pathname.startsWith('/en') ||
        pathname.startsWith('/ro') ||
        pathname.startsWith('/ru') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    // Redirect root to default locale
    const locale = 'en';
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

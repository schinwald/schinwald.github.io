import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export const config = {
    api: {
        bodyParser: false,
    }
};

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const res = NextResponse.next()
    return res
}
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    let searchParam = new URL(req.url).search;
    let url = process.env.BACKEND_URL + '/posts';
    const response = await fetch(url + searchParam);
    const data = await response.json();
    return NextResponse.json({ data })
}
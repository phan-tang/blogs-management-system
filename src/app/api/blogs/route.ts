import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-static';

export async function GET(req: NextRequest) {
    let url = process.env.BACKEND_URL + '/posts';
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json({ data })
}
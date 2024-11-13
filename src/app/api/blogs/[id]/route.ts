import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-static';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const blogId = (await params).id;
    let url = process.env.BACKEND_URL + `/posts/${blogId}`;
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json({ data })
}
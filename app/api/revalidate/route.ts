import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check secret token if configured
    const secret = req.nextUrl.searchParams.get("secret");
    if (process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const type = body._type;
    if (type) {
      (revalidateTag as any)(type);
      return NextResponse.json({ revalidated: true, tag: type, now: Date.now() });
    }

    return NextResponse.json({ message: "No _type found in body" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

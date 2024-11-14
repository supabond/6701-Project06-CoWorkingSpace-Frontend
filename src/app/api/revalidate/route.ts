import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { tags } = await request.json();
        if (!tags || !Array.isArray(tags)) {
            return NextResponse.json({ message: "Tags are required and should be an array" }, { status: 400 });
        }

        console.log(tags);

        // Revalidate each tag
        tags.forEach(tag => revalidateTag(tag));

        return NextResponse.json({ message: "Revalidated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error revalidating tags:", error);
        return NextResponse.json({ message: "Failed to revalidate" }, { status: 500 });
    }
}
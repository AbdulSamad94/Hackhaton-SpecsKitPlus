import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { softwareBackground, hardwareBackground } = body;

    try {
        await db
            .update(user)
            .set({
                softwareBackground,
                hardwareBackground,
                updatedAt: new Date(),
            })
            .where(eq(user.id, session.user.id));

        return Response.json({ success: true });
    } catch (error) {
        console.error("Failed to update profile:", error);
        return Response.json({ error: "Failed to update profile" }, { status: 500 });
    }
}

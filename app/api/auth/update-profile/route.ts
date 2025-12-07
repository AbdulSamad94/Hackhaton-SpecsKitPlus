import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updateProfileSchema = z.object({
        softwareBackground: z.string().max(1000).optional(),
        hardwareBackground: z.string().max(1000).optional(),
    });

    const parseResult = updateProfileSchema.safeParse(body);

    if (!parseResult.success) {
        return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { softwareBackground, hardwareBackground } = parseResult.data;

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

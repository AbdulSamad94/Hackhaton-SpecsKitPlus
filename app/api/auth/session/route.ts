import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
        return Response.json({ session: null, user: null });
    }

    return Response.json({
        session: session.session,
        user: session.user,
    });
}

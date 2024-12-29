import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        jwt.verify(token, secret);
        return NextResponse.json({ isAuthenticated: true }, { status: 200 });
    } catch (error) {
        console.error("Token validation failed:", error);
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
}

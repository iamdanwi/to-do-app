import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        // Redirect to login if token is missing
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Validate the token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        jwt.verify(token, secret);

        // Allow the request to proceed
        return NextResponse.next();
    } catch (error) {
        console.error("Token validation failed:", error);
        // Redirect to login if token is invalid
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// Apply middleware only to specific routes
export const config = {
    matcher: ["/dashboard/:path*"], // Protect dashboard and sub-routes
};

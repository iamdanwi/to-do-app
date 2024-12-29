import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Clear the session cookie
        const response = NextResponse.json(
            { message: "User logged out successfully.", success: true },
            { status: 200 }
        );

        // Set the cookie to expire immediately
        response.cookies.set("session", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            expires: new Date(0), // Expire immediately
            path: "/", // Cookie available across the site
        });

        return response;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { error: "An error occurred during logout.", details: errorMessage },
            { status: 500 }
        );
    }
}
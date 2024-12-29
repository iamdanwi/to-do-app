import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Validate the request body
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ error: "User does not exist." }, { status: 400 });
        }

        // Validate the password
        const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
        }

        // Check if JWT_SECRET is configured
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

        // Return success response with token
        const response = NextResponse.json({
            message: "User logged in successfully.",
            success: true,
            token
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
        }
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

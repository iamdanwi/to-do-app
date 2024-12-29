import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/user.model";

// Ensure database is connected
connectDB();

// POST handler for the API route
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { email } = reqBody;

        // Validate email
        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required." },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 }
            );
        }

        // Extract userId
        const userId = existingUser._id;

        // Send verification email
        await sendEmail({ email, emailType: "verify", userId });

        // Respond with success
        return NextResponse.json({
            success: true,
            message: "Verification email sent successfully.",
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.error("Error in resendVerificationEmail:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}

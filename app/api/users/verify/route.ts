import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function POST(request: NextRequest) {
    try {
        // console.log(request);
        const reqBody = await request.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ error: "Verification token is missing." }, { status: 400 });
        }

        const user = await User.findOne({ verifyToken: token, verifyTokenExpire: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid verification token." }, { status: 400 });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully." }, { status: 200 });




    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
        }
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
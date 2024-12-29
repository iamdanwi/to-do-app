import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists." }, { status: 400 });
        }

        const genSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, genSalt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        // Send verification email
        await sendEmail({ email, emailType: "verify", userId: savedUser._id });

        return NextResponse.json({ message: "User registered successfully.", success: true }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error during user registration:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

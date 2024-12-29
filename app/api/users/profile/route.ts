import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/user.model";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized. Invalid token." }, { status: 401 });
        }

        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Profile fetched successfully",
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized. Invalid token." }, { status: 401 });
        }

        const reqBody = await req.json();
        const { username, email } = reqBody;

        if (!username || !email) {
            return NextResponse.json(
                { error: "Name and email are required." },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (email !== user.email) {
            const emailInUse = await User.findOne({ email });
            if (emailInUse) {
                return NextResponse.json(
                    { error: "Email is already in use." },
                    { status: 400 }
                );
            }
        }

        user.username = username;
        user.email = email;
        user.updatedAt = new Date();
        await user.save();

        return NextResponse.json({
            message: "Profile updated successfully",
            success: true,
            user: { nuserame: user.username, email: user.email }
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

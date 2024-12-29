import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/user.model";

connectDB();

export default async function GET(req: NextRequest) {
    const userId = await getDataFromToken(req);
    const user = User.findOne({ _id: userId }).select("-password");

    if (!user) {
        return NextResponse.error();
    }

    return NextResponse.json(user);
}
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default async function getDataFromToken(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        return decoded.userId;
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

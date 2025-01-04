// route.ts
import { NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import { Task } from "@/models/task.model";

// Connect to the database
await connectDB();

export async function GET() {
    try {
        // Fetch all tasks excluding the __v field
        const tasks = await Task.find({}, { __v: 0 });
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
    }
}

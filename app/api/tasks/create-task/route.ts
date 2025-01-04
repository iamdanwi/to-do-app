import connectDB from "@/dbConfig/dbConfig";
import { Task } from "@/models/task.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { taskTitle, taskDescription, taskDueDate, taskPriority } = reqBody;

        // Retrieve token from the cookies
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized. Please login." }, { status: 401 });
        }

        // Verify and decode the token to get the userId
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        const userId = decoded.userId;

        // Create a new task and associate it with the logged-in user
        const task = new Task({
            task_title: taskTitle,
            task_description: taskDescription,
            due_date: taskDueDate,
            task_priority: taskPriority,
            user: userId, // Associate task with the logged-in user
        });

        // Save the task to the database
        await task.save();

        // Return success response
        return NextResponse.json(
            { message: "Task created successfully", success: true },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Error during task creation:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Internal server error." },
            { status: 500 }
        );
    }
}

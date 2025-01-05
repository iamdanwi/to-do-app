import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import { Task } from "@/models/task.model";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest, { params }: { params: { taskId: string } }) {
    const { taskId } = params; // Get the taskId from the URL parameters
    const { task_status } = await req.json(); // Get the updated task status from the request body

    if (!task_status) {
        return NextResponse.json({ message: "Task status is required" }, { status: 400 });
    }

    try {
        // Connect to the database
        await connectDB();

        // Update the task status in the database
        const updatedTask = await Task.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(taskId) }, // Find the task by ID
            { $set: { task_status } }, // Update the task status
            { new: true } // Return the updated document
        );

        // If the task was not found, return a 404 error
        if (!updatedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        // Return the updated task
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error("Error updating task status:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

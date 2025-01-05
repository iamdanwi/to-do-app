import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import connectDB from "@/dbConfig/dbConfig";
import { Task } from "@/models/task.model";

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
    const { taskId } = params;

    try {
        await connectDB(); // Ensure you're connected to the DB

        // Validate ObjectId
        if (!isValidObjectId(taskId)) {
            return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
        }

        // Delete the task from the database
        const result = await Task.deleteOne({ _id: taskId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
    }
}

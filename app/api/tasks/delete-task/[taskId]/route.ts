import { NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import { Task } from "@/models/task.model";

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
    const { taskId } = params;

    try {
        // Connect to the database
        await connectDB();

        // Find and delete the task
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // If task not found, return a 404 response
        if (!deletedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
    }
}

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        task_title: {
            type: String,
            required: [true, "Please enter task title."],
        },
        task_description: {
            type: String,
            required: [true, "Please enter task description."],
        },
        due_date: {
            type: Date,
            required: [true, "Please enter task due date."],
        },
        task_priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        task_status: {
            type: String,
            enum: ["todo", "in-progress", "completed"],
            default: "todo",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

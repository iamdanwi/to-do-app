"use client";

import { useState } from "react";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { TaskType } from "@/types/task.types";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TaskDialog } from "./task_dailog";

interface TaskCardProps {
    task: TaskType;
    onStatusChange: (taskId: string, status: TaskType["task_status"]) => void;
    onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const statusColors = {
        todo: "bg-slate-100 text-slate-700",
        "in-progress": "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
    };

    const priorityColors = {
        Low: "bg-slate-100 text-slate-700",
        Medium: "bg-yellow-100 text-yellow-700",
        High: "bg-red-100 text-red-700",
    };

    // Handle status change for the task
    const handleStatusChange = async (taskId: string, newStatus: TaskType["task_status"]) => {
        try {
            await fetch(`/api/tasks/update-task/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task_status: newStatus }),
            });

            // Update task status locally after the API call
            onStatusChange(taskId, newStatus);
        } catch (error) {
            console.error("Error updating task status:", error);
            setError("Failed to update task status. Please try again.");
        }
    };

    return (
        <>
            <Card className="group relative hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <h3 className="font-semibold leading-none tracking-tight">
                            {task.task_title}
                        </h3>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                                Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleStatusChange(task._id, "todo")}
                                disabled={task.task_status === "todo"}
                            >
                                Mark as Todo
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleStatusChange(task._id, "in-progress")}
                                disabled={task.task_status === "in-progress"}
                            >
                                Mark as In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleStatusChange(task._id, "completed")}
                                disabled={task.task_status === "completed"}
                            >
                                Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => onDelete(task._id)}
                            >
                                Delete Task
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    {task.task_description && (
                        <p className="text-sm text-muted-foreground mb-4">
                            {task.task_description}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className={cn(statusColors[task.task_status])}>
                            {task.task_status
                                ? task.task_status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
                                : "Unknown Status"}
                        </Badge>
                        <Badge variant="secondary" className={cn(priorityColors[task.task_priority])}>
                            {task.task_priority
                                ? task.task_priority.charAt(0).toUpperCase() + task.task_priority.slice(1)
                                : "Unknown Priority"}{" "}
                            Priority
                        </Badge>
                    </div>
                    {error && <div className="text-red-600 mt-2">{error}</div>} {/* Error message */}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center space-x-4"></div>
                    {task.due_date && (
                        <div className="text-sm text-muted-foreground">
                            Due {format(new Date(task.due_date), "MMM d")}
                        </div>
                    )}
                </CardFooter>
            </Card>

            <TaskDialog
                mode="edit"
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                defaultValues={task}
            />
        </>
    );
}

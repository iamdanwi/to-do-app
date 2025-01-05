"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { TaskType } from "@/types/task.types";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/task-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { NewTaskDialog } from "@/components/new-task-dailog";

export default function TaskManager() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [filter, setFilter] = useState<TaskType["task_status"] | "all">("all");

    // Fetch tasks from API
    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch("/api/tasks/retrieve-task");
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, []);

    // Handle task creation and update state
    const handleCreateTask = (newTask: TaskType) => {
        setTasks((prevTasks) => [newTask, ...prevTasks]); // Add new task to the front of the list
    };

    const handleStatusChange = async (taskId: string, newStatus: TaskType["task_status"]) => {
        try {
            await fetch(`/api/tasks/update-task/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task_status: newStatus }),
            });

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, task_status: newStatus } : task
                )
            );
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId: string) => {
        try {
            await fetch(`/api/tasks/delete-task/${taskId}`, { method: "DELETE" });
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Filter tasks based on the selected filter
    const filteredTasks = filter === "all" ? tasks : tasks.filter((task) => task.task_status === filter);

    return (
        <div className="w-full space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                    <p className="text-muted-foreground">Manage and track your tasks</p>
                </div>
                <Button onClick={() => setIsNewTaskOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Task
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <Select value={filter} onValueChange={(value) => setFilter(value as TaskType["task_status"] | "all")}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map((task) => (
                    <TaskCard
                        key={task._id}  // Ensure task._id is unique
                        task={task}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                    />
                ))}
                {filteredTasks.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No tasks found. Create a new task to get started.
                    </div>
                )}
            </div>


            <NewTaskDialog
                open={isNewTaskOpen}
                onOpenChange={setIsNewTaskOpen}
                onCreate={handleCreateTask}  // Pass the task creation handler here
            />
        </div>
    );
}

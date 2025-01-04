"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ListTodo, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TaskType } from "@/types/task.types";

export default function DashboardPage() {
    const [tasks, setTasks] = useState<TaskType[]>([]);

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

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.task_status === "completed").length;
    const pendingTasks = tasks.filter((task) => task.task_status !== "completed").length;

    return (
        <div className="h-full w-full">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your tasks.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-6">
                        <div className="flex items-center gap-2">
                            <ListTodo className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Total Tasks</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-3xl font-bold">{totalTasks}</div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Completed</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-3xl font-bold">{completedTasks}</div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Pending</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-3xl font-bold">{pendingTasks}</div>
                        </div>
                    </Card>
                </div>

                {/* Recent Tasks */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold">Recent Tasks</h2>
                    </div>
                    <div className="px-6">
                        <div className="divide-y">
                            {tasks.slice(0, 3).map((task) => (
                                <div className="flex items-center justify-between py-4" key={task._id}>
                                    <div>
                                        <div className="font-medium">{task.task_title}</div>
                                        <div className="font-medium text-muted-background">{task.task_description}</div>
                                        <div className="text-sm text-muted-foreground">Due {new Date(task.due_date).toLocaleDateString()}</div>
                                    </div>
                                    <Badge className={`bg-${task.task_status === "completed" ? "green" : "orange"}-50 text-${task.task_status === "completed" ? "green" : "orange"}-700`}>
                                        {task.task_status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

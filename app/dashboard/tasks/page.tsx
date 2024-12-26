import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from 'lucide-react'

export default function TasksPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                    <p className="text-muted-foreground">Manage and organize your tasks</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Tasks</CardTitle>
                            <CardDescription>A list of all your tasks</CardDescription>
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Tasks</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                title: "Update landing page design",
                                description: "Implement new hero section and improve mobile responsiveness",
                                status: "In Progress",
                                priority: "High",
                                dueDate: "2024-01-05",
                            },
                            {
                                title: "Create user documentation",
                                description: "Write comprehensive guide for new features",
                                status: "Completed",
                                priority: "Medium",
                                dueDate: "2024-01-03",
                            },
                            {
                                title: "Review pull requests",
                                description: "Review and merge pending PRs for the frontend",
                                status: "Pending",
                                priority: "High",
                                dueDate: "2024-01-04",
                            },
                            {
                                title: "Update dependencies",
                                description: "Update all npm packages to latest versions",
                                status: "Completed",
                                priority: "Low",
                                dueDate: "2024-01-02",
                            },
                            {
                                title: "Fix navigation bug",
                                description: "Debug and fix the mobile navigation issue",
                                status: "In Progress",
                                priority: "High",
                                dueDate: "2024-01-06",
                            },
                        ].map((task) => (
                            <div
                                key={task.title}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium leading-none">{task.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {task.description}
                                    </p>
                                    <div className="flex gap-2 text-sm">
                                        <span className="text-muted-foreground">Due {task.dueDate}</span>
                                        <span>•</span>
                                        <span className={
                                            task.priority === "High"
                                                ? "text-red-600"
                                                : task.priority === "Medium"
                                                    ? "text-yellow-600"
                                                    : "text-green-600"
                                        }>
                                            {task.priority} Priority
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-sm ${task.status === "Completed"
                                    ? "text-green-600"
                                    : task.status === "In Progress"
                                        ? "text-blue-600"
                                        : "text-yellow-600"
                                    }`}>
                                    {task.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


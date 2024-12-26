import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ListTodo } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your tasks.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            +2 from yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            +3 from yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">
                            -1 from yesterday
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Tasks */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Tasks</CardTitle>
                    <CardDescription>Your recently added and updated tasks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                title: "Update landing page design",
                                status: "In Progress",
                                dueDate: "2024-01-05",
                            },
                            {
                                title: "Create user documentation",
                                status: "Completed",
                                dueDate: "2024-01-03",
                            },
                            {
                                title: "Review pull requests",
                                status: "Pending",
                                dueDate: "2024-01-04",
                            },
                        ].map((task) => (
                            <div
                                key={task.title}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium leading-none">{task.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Due {task.dueDate}
                                    </p>
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


import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ListTodo, CheckCircle, Clock } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="h-full w-full">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here&apos;s an overview of your tasks.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-6">
                        <div className="flex items-center gap-2">
                            <ListTodo className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Total Tasks</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-3xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Completed</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-3xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Pending</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-3xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">-1 from yesterday</p>
                        </div>
                    </Card>
                </div>

                {/* Recent Tasks */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold">Recent Tasks</h2>
                        <p className="text-sm text-muted-foreground">
                            Your recently added and updated tasks
                        </p>
                    </div>
                    <div className="px-6">
                        <div className="divide-y">
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <div className="font-medium">Update landing page design</div>
                                    <div className="text-sm text-muted-foreground">Due 2024-01-05</div>
                                </div>
                                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">In Progress</Badge>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <div className="font-medium">Create user documentation</div>
                                    <div className="text-sm text-muted-foreground">Due 2024-01-03</div>
                                </div>
                                <Badge className="bg-green-50 text-green-700 hover:bg-green-50">Completed</Badge>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <div className="font-medium">Review pull requests</div>
                                    <div className="text-sm text-muted-foreground">Due 2024-01-04</div>
                                </div>
                                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-50">Pending</Badge>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function NotificationsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with your tasks and team activities</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Notifications</CardTitle>
                            <CardDescription>Your latest updates and alerts</CardDescription>
                        </div>
                        <Bell className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                icon: CheckCircle,
                                title: "Task Completed",
                                description: "Project documentation has been marked as complete",
                                time: "2 minutes ago",
                                type: "success"
                            },
                            {
                                icon: Clock,
                                title: "Task Due Soon",
                                description: "Frontend development task is due in 2 hours",
                                time: "1 hour ago",
                                type: "warning"
                            },
                            {
                                icon: AlertCircle,
                                title: "Task Overdue",
                                description: "Backend API integration is overdue by 1 day",
                                time: "5 hours ago",
                                type: "error"
                            },
                            {
                                icon: Bell,
                                title: "New Task Assigned",
                                description: "You have been assigned to review the new feature",
                                time: "1 day ago",
                                type: "info"
                            }
                        ].map((notification, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 rounded-lg border p-4"
                            >
                                <div className={`mt-1 ${notification.type === "success" ? "text-green-500" :
                                    notification.type === "warning" ? "text-yellow-500" :
                                        notification.type === "error" ? "text-red-500" :
                                            "text-blue-500"
                                    }`}>
                                    <notification.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="font-medium leading-none">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


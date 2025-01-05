"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react'

type Notification = {
    _id: string;
    title: string;
    description: string;
    time: string;
    type: "success" | "warning" | "error" | "info";
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // Fetch notifications from the API route
        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/notifications")
                if (!response.ok) throw new Error('Failed to fetch notifications')
                const data = await response.json()
                setNotifications(data)
            } catch (error) {
                console.error("Error fetching notifications:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchNotifications()
    }, [])

    if (loading) {
        return <div>Loading...</div> // Show a loading state while fetching data
    }

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
                        {notifications.map((notification, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted transition"
                            >
                                <div
                                    className={`mt-1 ${notification.type === "success"
                                        ? "text-green-500"
                                        : notification.type === "warning"
                                            ? "text-yellow-500"
                                            : notification.type === "error"
                                                ? "text-red-500"
                                                : "text-blue-500"
                                        }`}
                                >
                                    {notification.type === "success" && <CheckCircle className="h-5 w-5" />}
                                    {notification.type === "warning" && <Clock className="h-5 w-5" />}
                                    {notification.type === "error" && <AlertCircle className="h-5 w-5" />}
                                    {notification.type === "info" && <Bell className="h-5 w-5" />}
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

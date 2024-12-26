import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPage() {
    return (
        <div className="max-w-4xl container mx-auto space-y-8">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">View and manage your tasks in calendar view</p>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr,300px]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription>Your tasks organized by date</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                className="rounded-md border"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Tasks due soon</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Team Meeting",
                                        date: "Today, 2:00 PM",
                                    },
                                    {
                                        title: "Project Review",
                                        date: "Tomorrow, 10:00 AM",
                                    },
                                    {
                                        title: "Client Presentation",
                                        date: "Jan 5, 3:30 PM",
                                    },
                                ].map((task) => (
                                    <div
                                        key={task.title}
                                        className="flex flex-col space-y-1 rounded-lg border p-4"
                                    >
                                        <p className="font-medium leading-none">{task.title}</p>
                                        <p className="text-sm text-muted-foreground">{task.date}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


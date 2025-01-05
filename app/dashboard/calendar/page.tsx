"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { format } from "date-fns";

// Helper function to generate calendar days
function generateCalendarDays(currentMonth: Date) {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days = [];
    const startDay = firstDay.getDay();

    // Add previous month's days
    for (let i = 0; i < startDay; i++) {
        const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
        days.push({
            date: prevMonthLastDay.getDate() - (startDay - i - 1),
            isCurrentMonth: false,
        });
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({
            date: i,
            isCurrentMonth: true,
            isToday:
                new Date().getDate() === i &&
                new Date().getMonth() === currentMonth.getMonth() &&
                new Date().getFullYear() === currentMonth.getFullYear(),
        });
    }

    // Add next month's days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
        days.push({
            date: i,
            isCurrentMonth: false,
        });
    }

    return days;
}

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    interface Task {
        _id: string;
        task_title: string;
        due_date: string;
    }

    const [tasks, setTasks] = useState<Task[]>([]);
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const days = generateCalendarDays(currentMonth);

    // Fetch tasks due in the current month
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("/api/tasks/retrieve-task"); // Modify this endpoint as needed
                const data = await response.json();
                const filteredTasks = data.filter((task: Task) => {
                    const dueDate = new Date(task.due_date);
                    return (
                        dueDate.getMonth() === currentMonth.getMonth() &&
                        dueDate.getFullYear() === currentMonth.getFullYear()
                    );
                });
                setTasks(filteredTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [currentMonth]);

    // Calendar navigation
    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    // Get month details
    const month = currentMonth.toLocaleString("default", { month: "long" });
    const year = currentMonth.getFullYear();

    return (
        <div className="h-full w-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                <p className="text-muted-foreground">View and manage your tasks in calendar view</p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,280px]">
                <Card>
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                        <p className="text-sm text-muted-foreground">Your tasks organized by date</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Month Navigation */}
                            <div className="flex items-center justify-between">
                                <Button variant="ghost" className="h-8 w-8 p-0" onClick={prevMonth}>
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Previous month</span>
                                </Button>
                                <div className="font-medium">
                                    {month} {year}
                                </div>
                                <Button variant="ghost" className="h-8 w-8 p-0" onClick={nextMonth}>
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="sr-only">Next month</span>
                                </Button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-px text-sm">
                                {/* Week day headers */}
                                {weekDays.map((day) => (
                                    <div key={day} className="flex h-8 items-center justify-center font-medium">
                                        {day}
                                    </div>
                                ))}

                                {/* Calendar days */}
                                {days.map((day, index) => {
                                    const taskDueToday = tasks.find(
                                        (task) => new Date(task.due_date).getDate() === day.date
                                    );
                                    return (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className={cn(
                                                "h-12 hover:bg-muted",
                                                !day.isCurrentMonth && "text-muted-foreground",
                                                day.isToday &&
                                                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                                            )}
                                        >
                                            {day.date}
                                            {taskDueToday && (
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {taskDueToday.task_title}
                                                </div>
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                        <p className="text-sm text-muted-foreground">Tasks due soon</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tasks.slice(0, 3).map((task) => (
                                <div key={task._id} className="space-y-2">
                                    <div className="font-medium">{task.task_title}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {new Date(task.due_date).toLocaleDateString()} {/* This will show only the date */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

"use client"

import { useState } from "react"
import { format } from "date-fns"
import { MoreHorizontal, MessageSquare, UserCircle2 } from 'lucide-react'
import { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { TaskDialog } from "./task_dailog"
// import { TaskDialog } from "./task-dialog"

interface TaskCardProps {
    task: Task
    onStatusChange: (taskId: string, status: Task['status']) => void
    onDelete: (taskId: string) => void
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const statusColors = {
        todo: "bg-slate-100 text-slate-700",
        "in-progress": "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
    }

    const priorityColors = {
        low: "bg-slate-100 text-slate-700",
        medium: "bg-yellow-100 text-yellow-700",
        high: "bg-red-100 text-red-700",
    }

    return (
        <>
            <Card className="group relative hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <h3 className="font-semibold leading-none tracking-tight">
                            {task.title}
                        </h3>
                        {task.category && (
                            <Badge
                                variant="secondary"
                                className="bg-opacity-15"
                                style={{
                                    backgroundColor: task.category.color + "26", // 15% opacity
                                    color: task.category.color,
                                }}
                            >
                                {task.category.name}
                            </Badge>
                        )}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                                Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task.id, 'todo')}
                                disabled={task.status === 'todo'}
                            >
                                Mark as Todo
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task.id, 'in-progress')}
                                disabled={task.status === 'in-progress'}
                            >
                                Mark as In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task.id, 'completed')}
                                disabled={task.status === 'completed'}
                            >
                                Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => onDelete(task.id)}
                            >
                                Delete Task
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    {task.description && (
                        <p className="text-sm text-muted-foreground mb-4">
                            {task.description}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className={cn(statusColors[task.status])}>
                            {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        <Badge variant="secondary" className={cn(priorityColors[task.priority])}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </Badge>
                        {task.isRecurring && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                Recurring
                            </Badge>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                            {task.assignedTo?.map((user) => (
                                <Avatar
                                    key={user.id}
                                    className="h-6 w-6 border-2 border-background"
                                >
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                            {!task.assignedTo?.length && (
                                <UserCircle2 className="h-6 w-6 text-muted-foreground" />
                            )}
                        </div>
                        {task.comments.length > 0 && (
                            <div className="flex items-center text-muted-foreground">
                                <MessageSquare className="mr-1 h-4 w-4" />
                                <span className="text-xs">{task.comments.length}</span>
                            </div>
                        )}
                    </div>
                    {task.dueDate && (
                        <div className="text-sm text-muted-foreground">
                            Due {format(task.dueDate, 'MMM d')}
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
    )
}


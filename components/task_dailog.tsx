"use client"

import { useState } from "react"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { TaskType, User } from "@/types/task.types"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sampleUsers: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com" },
]

interface TaskDialogProps {
    mode: "create" | "edit"
    open: boolean
    onOpenChange: (open: boolean) => void
    defaultValues?: TaskType
    onSubmit?: (formData: FormData) => void
}

export function TaskDialog({
    mode,
    open,
    onOpenChange,
    defaultValues,
    onSubmit,
}: TaskDialogProps) {
    const [dueDate, setDueDate] = useState<Date | undefined>(defaultValues?.due_date ? new Date(defaultValues.due_date) : undefined)
    const [taskPriority, setTaskPriority] = useState<"Low" | "Medium" | "High">(defaultValues?.task_priority || "Medium")
    const [taskStatus, setTaskStatus] = useState(defaultValues?.task_status || "todo")
    const [assignedUser, setAssignedUser] = useState<User | null>(
        defaultValues?.user ? sampleUsers.find(user => user.id === defaultValues.user) || null : null
    )

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if (dueDate) formData.set('due_date', dueDate.toISOString())
        formData.set('task_priority', taskPriority)
        formData.set('task_status', taskStatus)
        formData.set('user', assignedUser?.id || "")
        onSubmit?.(formData)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Create New Task" : "Edit Task"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Add a new task to your list"
                            : "Update your task details"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="task_title">Title</Label>
                            <Input
                                id="task_title"
                                name="task_title"
                                placeholder="Enter task title"
                                defaultValue={defaultValues?.task_title}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="task_description">Description</Label>
                            <Textarea
                                id="task_description"
                                name="task_description"
                                placeholder="Enter task description"
                                defaultValue={defaultValues?.task_description}
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Due Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !dueDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={dueDate}
                                            onSelect={setDueDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select
                                    value={taskPriority}
                                    onValueChange={(value) => setTaskPriority(value as "Low" | "Medium" | "High")}
                                    name="task_priority"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={taskStatus}
                                    onValueChange={(value: "todo" | "in-progress" | "completed") => setTaskStatus(value)}
                                    name="task_status"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">Todo</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Assigned To</Label>
                            <Select
                                value={assignedUser?.id || ""}
                                onValueChange={(value) =>
                                    setAssignedUser(
                                        sampleUsers.find((user) => user.id === value) || null
                                    )
                                }
                                name="user"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select user" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sampleUsers.map((user) => (
                                        <SelectItem key={user.id} value={user.id}>
                                            <div className="flex items-center">
                                                <Avatar className="mr-2 h-6 w-6">
                                                    <AvatarImage
                                                        src={user.avatar || ''}
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback>
                                                        {user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {user.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">
                            {mode === "create" ? "Create Task" : "Update Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

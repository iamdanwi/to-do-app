"use client"

import { useState } from "react"
import { CalendarIcon, Plus, X } from 'lucide-react'
import { format } from "date-fns"
import { Task, TaskCategory, User } from "@/types/task.types"
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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data - In a real app, these would come from your backend
const sampleCategories: TaskCategory[] = [
    { id: "1", name: "Work", color: "#0ea5e9" },
    { id: "2", name: "Personal", color: "#8b5cf6" },
    { id: "3", name: "Shopping", color: "#f59e0b" },
    { id: "4", name: "Health", color: "#10b981" },
]

const sampleUsers: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com" },
]

interface TaskDialogProps {
    mode: "create" | "edit"
    open: boolean
    onOpenChange: (open: boolean) => void
    defaultValues?: Task
    onSubmit?: (formData: FormData) => void
}

export function TaskDialog({
    mode,
    open,
    onOpenChange,
    defaultValues,
    onSubmit,
}: TaskDialogProps) {
    const [selectedUsers, setSelectedUsers] = useState<User[]>(
        defaultValues?.assignedTo || []
    )
    const [dueDate, setDueDate] = useState<Date | undefined>(
        defaultValues?.dueDate
    )
    const [isRecurring, setIsRecurring] = useState(defaultValues?.isRecurring || false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if (isRecurring) {
            formData.set('recurring', 'true')
        }
        if (dueDate) {
            formData.set('dueDate', dueDate.toISOString())
        }
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
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter task title"
                                defaultValue={defaultValues?.title}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter task description"
                                defaultValue={defaultValues?.description}
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
                                <Select defaultValue={defaultValues?.priority || "medium"} name="priority">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select defaultValue={defaultValues?.category?.id} name="category">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sampleCategories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            <div className="flex items-center">
                                                <div
                                                    className="mr-2 h-2 w-2 rounded-full"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                {category.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Assigned To</Label>
                            <div className="flex flex-wrap gap-2">
                                {selectedUsers.map((user) => (
                                    <Badge
                                        key={user.id}
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        <Avatar className="h-4 w-4">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>
                                                {user.name.split(" ").map((n) => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        {user.name}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 p-0 hover:bg-transparent"
                                            onClick={() =>
                                                setSelectedUsers(
                                                    selectedUsers.filter((u) => u.id !== user.id)
                                                )
                                            }
                                        >
                                            <X className="h-3 w-3" />
                                            <span className="sr-only">Remove {user.name}</span>
                                        </Button>
                                    </Badge>
                                ))}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-7"
                                        >
                                            <Plus className="mr-1 h-4 w-4" />
                                            Add Member
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56 p-2">
                                        <div className="space-y-1">
                                            {sampleUsers
                                                .filter(
                                                    (user) =>
                                                        !selectedUsers.find((u) => u.id === user.id)
                                                )
                                                .map((user) => (
                                                    <Button
                                                        key={user.id}
                                                        type="button"
                                                        variant="ghost"
                                                        className="w-full justify-start"
                                                        onClick={() =>
                                                            setSelectedUsers([...selectedUsers, user])
                                                        }
                                                    >
                                                        <Avatar className="mr-2 h-6 w-6">
                                                            <AvatarImage
                                                                src={user.avatar}
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
                                                    </Button>
                                                ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="recurring"
                                name="recurring"
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="recurring">Make this a recurring task</Label>
                        </div>

                        {isRecurring && (
                            <div className="space-y-2">
                                <Label>Recurring Schedule</Label>
                                <Select
                                    defaultValue={defaultValues?.recurringSchedule || "weekly"}
                                    name="recurringSchedule"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select schedule" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
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


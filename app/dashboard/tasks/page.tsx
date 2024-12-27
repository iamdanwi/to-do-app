"use client"

import { useState } from "react"
import { Plus } from 'lucide-react'
import { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { TaskCard } from "@/components/task-card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TaskDialog } from "@/components/task_dailog"

// Sample data - In a real app, this would come from your backend
const sampleTasks: Task[] = [
    {
        id: "1",
        title: "Update landing page design",
        description: "Implement new hero section and improve mobile responsiveness",
        status: "in-progress",
        priority: "high",
        dueDate: new Date("2024-01-05"),
        category: { id: "1", name: "Work", color: "#0ea5e9" },
        createdBy: {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        },
        assignedTo: [
            { id: "1", name: "John Doe", email: "john@example.com" },
            { id: "2", name: "Jane Smith", email: "jane@example.com" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [
            {
                id: "1",
                content: "Making good progress on this",
                createdAt: new Date(),
                user: { id: "1", name: "John Doe", email: "john@example.com" },
            },
        ],
    },
    {
        id: "2",
        title: "Write documentation",
        description: "Create comprehensive documentation for the new API endpoints",
        status: "todo",
        priority: "medium",
        dueDate: new Date("2024-01-10"),
        category: { id: "1", name: "Work", color: "#0ea5e9" },
        createdBy: {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
    },
    {
        id: "3",
        title: "Review pull requests",
        description: "Review and merge pending pull requests",
        status: "completed",
        priority: "low",
        category: { id: "1", name: "Work", color: "#0ea5e9" },
        createdBy: {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
        isRecurring: true,
        recurringSchedule: "weekly",
    },
]

const sampleCategories = [
    { id: "1", name: "Work", color: "#0ea5e9" },
    { id: "2", name: "Personal", color: "#f7971e" },
]

type FilterStatus = Task['status'] | 'all'

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(sampleTasks)
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false)
    const [filter, setFilter] = useState<FilterStatus>('all')

    const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ))
    }

    const handleDeleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const handleNewTask = (formData: FormData) => {
        const newTask: Task = {
            id: `task-${tasks.length + 1}`,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            status: 'todo',
            priority: formData.get('priority') as Task['priority'],
            dueDate: formData.get('dueDate') ? new Date(formData.get('dueDate') as string) : undefined,
            category: sampleCategories.find(c => c.id === formData.get('category')),
            assignedTo: [], // In a real app, this would be populated from form data
            createdBy: {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
            },
            createdAt: new Date(),
            updatedAt: new Date(),
            comments: [],
            isRecurring: formData.get('recurring') === 'true',
            recurringSchedule: formData.get('recurringSchedule') as string,
        }
        setTasks([...tasks, newTask])
        setIsNewTaskOpen(false)
    }

    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(task => task.status === filter)

    return (
        <div className="w-full space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                    <p className="text-muted-foreground">
                        Manage and track your tasks
                    </p>
                </div>
                <Button onClick={() => setIsNewTaskOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Task
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <Select
                    value={filter}
                    onValueChange={(value: FilterStatus) => setFilter(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                    />
                ))}
                {filteredTasks.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No tasks found. Create a new task to get started.
                    </div>
                )}
            </div>

            <TaskDialog
                mode="create"
                open={isNewTaskOpen}
                onOpenChange={setIsNewTaskOpen}
                onSubmit={handleNewTask}
            />
        </div>
    )
}


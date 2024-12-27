export interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

export interface Comment {
    id: string
    content: string
    createdAt: Date
    user: User
}

export interface TaskCategory {
    id: string
    name: string
    color: string
}

export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatus = 'todo' | 'in-progress' | 'completed'

export interface Task {
    id: string
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    dueDate?: Date
    category?: TaskCategory
    assignedTo?: User[]
    createdBy: User
    createdAt: Date
    updatedAt: Date
    comments: Comment[]
    isRecurring?: boolean
    recurringSchedule?: string
}


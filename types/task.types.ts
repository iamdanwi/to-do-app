export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface TaskCategory {
    id: string;
    name: string;
    color: string;
}

// task.types.ts
export interface TaskType {
    _id: string;
    task_title: string;
    task_description: string;
    due_date: string;
    task_priority: "low" | "Medium" | "High";
    task_status: "todo" | "in-progress" | "completed";
    user: string;
    createdAt?: string;
    updatedAt?: string;
}

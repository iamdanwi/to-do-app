"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { LayoutDashboard, ListTodo, Calendar, Settings, Bell, Search, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarProvider,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { NewTaskDialog } from "@/components/new-task-dailog"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false)

    return (
        <SidebarProvider defaultOpen>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarHeader className="border-b">
                        <div className="flex h-14 items-center px-4">
                            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                                <ListTodo className="h-6 w-6" />
                                <span>TaskMaster</span>
                            </Link>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="search"
                                    placeholder="Search tasks..."
                                    className="h-9"
                                />
                                <Button variant="outline" size="icon" className="shrink-0">
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Search</span>
                                </Button>
                            </div>
                            <Button
                                className="w-full justify-start gap-2"
                                onClick={() => setIsNewTaskOpen(true)}
                            >
                                <PlusCircle className="h-4 w-4" />
                                New Task
                            </Button>
                        </div>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>Overview</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/tasks">
                                        <ListTodo className="h-4 w-4" />
                                        <span>Tasks</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/calendar">
                                        <Calendar className="h-4 w-4" />
                                        <span>Calendar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="border-t p-4">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/notifications">
                                        <Bell className="h-4 w-4" />
                                        <span>Notifications</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard/settings">
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <main className="flex-1 w-screen">
                    <div className="flex h-14 items-center border-b px-8">
                        <SidebarTrigger />
                    </div>
                    <div className="container mx-auto p-8">
                        {children}
                    </div>
                </main>
                <NewTaskDialog
                    open={isNewTaskOpen}
                    onOpenChange={setIsNewTaskOpen}
                />
            </div>
        </SidebarProvider>
    )
}

"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LayoutDashboard, ListTodo, Calendar, Search, PlusCircle, Menu, LogOut } from "lucide-react";
import { NewTaskDialog } from "@/components/new-task-dailog";
import axios from "axios";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/api/auth/check");
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/login");
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const navigation = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Tasks", href: "/dashboard/tasks", icon: ListTodo },
        { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    ];
    // { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    // { name: "Settings", href: "/dashboard/settings", icon: Settings },

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/users/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                router.push("/");
            } else {
                const data = await response.json();
                console.error(data.error);
            }
        } catch (error: unknown) {
            console.error("An error occurred during logout.", (error as Error).message);
        }
    };

    // Render a loader while authentication is being checked
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    // Prevent rendering the dashboard if the user is not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50/50">
            {/* Desktop Sidebar */}
            <div className="hidden w-72 flex-shrink-0 flex-col border-r bg-white lg:flex">
                <div className="flex h-14 items-center border-b px-4">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                        <ListTodo className="h-6 w-6" />
                        <span>TaskMaster</span>
                    </Link>
                </div>

                <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
                    <div className="flex gap-2">
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

                    <nav className="flex-1 space-y-2 overflow-y-auto">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn("w-full justify-start gap-2",
                                        pathname === item.href && "bg-secondary"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </nav>

                    <Button
                        variant={"outline"}
                        className="w-full justify-start gap-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                <SheetContent side="left" className="w-72 p-0">
                    <SheetHeader className="border-b p-4">
                        <SheetTitle className="flex items-center gap-2">
                            <ListTodo className="h-6 w-6" />
                            TaskMaster
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <div className="flex gap-2">
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
                            onClick={() => {
                                setIsNewTaskOpen(true);
                                setIsMobileNavOpen(false);
                            }}
                        >
                            <PlusCircle className="h-4 w-4" />
                            New Task
                        </Button>

                        <nav className="flex flex-1 flex-col gap-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileNavOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className={cn("w-full justify-start gap-2",
                                            pathname === item.href && "bg-secondary"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </nav>

                        <Button
                            variant={"outline"}
                            className="w-full justify-start gap-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-14 items-center border-b bg-white px-4 lg:px-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsMobileNavOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </header>
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>

            <NewTaskDialog
                open={isNewTaskOpen}
                onOpenChange={setIsNewTaskOpen}
            />
        </div>
    );
}

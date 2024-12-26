import Link from "next/link"
import { ListTodo } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <ListTodo className="mr-2 h-6 w-6" />
                    TaskMaster
                </div>
                {/* Decorative SVG Pattern */}
                <div className="relative z-20 py-32">
                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                    <div className="relative flex items-center justify-center">
                        <svg
                            className="h-48 w-48 text-white/20"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1_2)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80ZM50 70C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70Z"
                                    fill="currentColor"
                                />
                                <circle cx="50" cy="50" r="15" fill="currentColor" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_2">
                                    <rect width="100" height="100" fill="currentColor" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Since implementing TaskMaster, our team&apos;s efficiency has increased by 40%. It&apos;s become an essential part of our daily workflow.&rdquo;
                        </p>
                        <footer className="text-sm">Alex Thompson, Team Lead</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    <Card>
                        <form action="#" className="space-y-4">
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Sign in to your TaskMaster account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="name@example.com" required type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" required type="password" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor="remember" className="text-sm text-muted-foreground">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-primary underline-offset-4 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Sign In</Button>
                            </CardFooter>
                        </form>
                    </Card>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}


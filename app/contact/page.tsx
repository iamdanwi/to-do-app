"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ListTodo } from 'lucide-react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the form data to your server
        console.log("Form submitted:", formData)
        // Reset form after submission
        setFormData({ name: "", email: "", message: "" })
        alert("Thank you for your message. We'll get back to you soon!")
    }

    return (
        <div className="flex flex-col min-h-screen container mx-auto">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <ListTodo className="h-6 w-6" />
                        <span className="font-bold">TaskMaster</span>
                    </Link>
                </div>
            </header>

            <main className="flex-1 container py-6 md:py-12">
                <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Name
                            </label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">
                                Message
                            </label>
                            <Textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col gap-4 md:h-24 md:flex-row md:items-center">
                    <div className="flex items-center gap-4 md:gap-2 md:flex-row">
                        <ListTodo className="h-6 w-6" />
                        <p className="text-sm leading-loose text-muted-foreground md:text-base">
                            Built by TaskMaster. The source code is available on GitHub.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}


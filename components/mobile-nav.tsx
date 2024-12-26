"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import Link from "next/link"

interface MobileNavProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                    <Link
                        href="#features"
                        onClick={() => setIsOpen(false)}
                        className="block px-2 py-1 text-lg"
                    >
                        Features
                    </Link>
                    <Link
                        href="#pricing"
                        onClick={() => setIsOpen(false)}
                        className="block px-2 py-1 text-lg"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#testimonials"
                        onClick={() => setIsOpen(false)}
                        className="block px-2 py-1 text-lg"
                    >
                        Testimonials
                    </Link>
                    <Link
                        href="#about"
                        onClick={() => setIsOpen(false)}
                        className="block px-2 py-1 text-lg"
                    >
                        About
                    </Link>
                    <div className="border-t mt-4 pt-4 space-y-4">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                            <Button className="w-full">Sign up</Button>
                        </Link>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}


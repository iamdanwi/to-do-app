import Link from "next/link"
import { ListTodo } from 'lucide-react'

export default function PrivacyPolicy() {
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
                <div className="prose dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
                    <p>
                        Welcome to TaskMaster. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
                    <p>
                        We collect information that you provide directly to us when you use our service. This may include:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Personal information (such as name and email address)</li>
                        <li>Account information</li>
                        <li>User-generated content (such as tasks and projects)</li>
                        <li>Usage data and analytics</li>
                    </ul>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect for various purposes, including:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Providing and maintaining our service</li>
                        <li>Improving and personalizing user experience</li>
                        <li>Communicating with you about our service</li>
                        <li>Ensuring the security and integrity of our service</li>
                    </ul>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
                    <p>
                        You have certain rights relating to your personal information, including:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>The right to access, update, or delete your information</li>
                        <li>The right to rectification</li>
                        <li>The right to object to processing</li>
                        <li>The right of restriction</li>
                        <li>The right to data portability</li>
                        <li>The right to withdraw consent</li>
                    </ul>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <p className="mt-2">
                        <strong>Email:</strong> privacy@taskmaster.com<br />
                        <strong>Address:</strong> 123 Task Street, Productivity City, PC 12345
                    </p>
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


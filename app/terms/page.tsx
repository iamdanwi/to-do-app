import Link from "next/link"
import { ListTodo } from 'lucide-react'

export default function TermsOfService() {
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
                    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using TaskMaster&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
                    <p>
                        TaskMaster provides a task management platform designed to help individuals and teams organize and track their tasks and projects.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
                    <p>
                        To use certain features of the service, you must create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
                    <p>
                        You retain all rights to any content you submit, post, or display on or through the service. By submitting, posting, or displaying content, you grant TaskMaster a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your content.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Prohibited Uses</h2>
                    <p>
                        You agree not to use the service:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>For any unlawful purpose or to solicit others to perform or participate in any unlawful acts</li>
                        <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                        <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                        <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                        <li>To submit false or misleading information</li>
                    </ul>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
                    <p>
                        TaskMaster shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the service.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on this page.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <p className="mt-2">
                        <strong>Email:</strong> terms@taskmaster.com<br />
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


"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ListTodo, Clock, Share2, Zap, Shield, Smartphone, Star, Check } from 'lucide-react'
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-dvh container mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Link href="/">
            <div className="flex gap-2 items-center mr-4 font-semibold">
              <ListTodo className="h-6 w-6" />
              <span>TaskMaster</span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-6 text-sm font-medium flex-1">
            <Link href="#features" className="transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="#testimonials" className="transition-colors hover:text-foreground/80">
              Testimonials
            </Link>
            <Link href="#about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden flex-1 justify-end">
            <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 flex flex-col items-center gap-4 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
            <Badge className="mb-4" variant="secondary">✨ Launching Soon</Badge>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Manage your tasks with ease,{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                boost your productivity
              </span>
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              TaskMaster helps you organize your work and life. Create, track, and complete tasks efficiently with our intuitive interface.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">See How It Works</Button>
            </Link>
          </div>
          <div className="mt-8 w-full max-w-[980px] rounded-lg border bg-gradient-to-b from-background to-muted/50 p-4">
            <Image
              src="/dashboardMockup.png"
              width={1000}
              height={500}
              alt="TaskMaster Dashboard Preview"
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-b bg-muted/50">
          <div className="container px-4 py-12">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold">10k+</h3>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold">1M+</h3>
                <p className="text-muted-foreground">Tasks Completed</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold">99.9%</h3>
                <p className="text-muted-foreground">Uptime</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container px-4 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Powerful Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to manage your tasks effectively
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <CheckCircle className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Task Management</h3>
                <p className="text-muted-foreground">
                  Create, edit, and organize your tasks with ease. Set priorities, due dates, and categories.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <Clock className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Real-time Updates</h3>
                <p className="text-muted-foreground">
                  Stay synchronized with instant task updates. Never miss a deadline with smart notifications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <Share2 className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Collaboration</h3>
                <p className="text-muted-foreground">
                  Share and collaborate on tasks with team members. Assign tasks and track progress together.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Smart Automation</h3>
                <p className="text-muted-foreground">
                  Automate repetitive tasks and workflows. Save time with intelligent task suggestions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <Shield className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Security</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with end-to-end encryption. Your data is always safe with us.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <Smartphone className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Mobile Ready</h3>
                <p className="text-muted-foreground">
                  Access your tasks on any device. Our responsive design works seamlessly across all platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="border-t bg-muted/50">
          <div className="container px-4 py-12 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Get started with TaskMaster in three simple steps
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16 mt-8">
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="font-bold text-xl">Sign Up</h3>
                <p className="text-center text-muted-foreground">
                  Create your free account in seconds. No credit card required.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="font-bold text-xl">Create Tasks</h3>
                <p className="text-center text-muted-foreground">
                  Add your tasks and organize them into projects or categories.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="font-bold text-xl">Stay Productive</h3>
                <p className="text-center text-muted-foreground">
                  Track your progress and complete tasks efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container px-4 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the perfect plan for you or your team
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-8">
            {/* Free Plan */}
            <Card className="flex flex-col">
              <CardContent className="flex flex-col flex-1 p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-xl">Free</h3>
                  <p className="text-muted-foreground">Perfect for individuals</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Up to 10 tasks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Basic task management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Mobile access</span>
                    </li>
                  </ul>
                  <Link href="/signup" className="mt-auto">
                    <Button className="w-full" variant="outline">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* Pro Plan */}
            <Card className="flex flex-col relative border-primary">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="secondary">Most Popular</Badge>
              </div>
              <CardContent className="flex flex-col flex-1 p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-xl">Pro</h3>
                  <p className="text-muted-foreground">Perfect for professionals</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$9</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Unlimited tasks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Advanced task management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Custom categories</span>
                    </li>
                  </ul>
                  <Link href="/signup" className="mt-auto">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* Team Plan */}
            <Card className="flex flex-col">
              <CardContent className="flex flex-col flex-1 p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-xl">Team</h3>
                  <p className="text-muted-foreground">Perfect for teams</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Team collaboration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Admin controls</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                  <Link href="/signup" className="mt-auto">
                    <Button className="w-full" variant="outline">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="border-t bg-muted/50">
          <div className="container px-4 py-12 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Loved by Professionals
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Here&apos;s what our users have to say about TaskMaster
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3 mt-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      &quot;TaskMaster has completely transformed how I manage my daily tasks. The interface is intuitive and the features are exactly what I needed.&quot;
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Image
                        src={`/person1.jpg?height=40&width=40`}
                        width={40}
                        height={40}
                        alt="User avatar"
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-muted-foreground">Product Manager</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="">
          <div className="container px-4 py-12 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Ready to boost your productivity?
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Join thousands of users who are already managing their tasks more efficiently.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link href="#pricing">
                  <Button variant="outline" size="lg">View Pricing</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-t bg-muted/50">
          <div className="container px-4 py-12 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                About TaskMaster
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Empowering individuals and teams to achieve more through efficient task management
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 mt-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  At TaskMaster, we&apos;re on a mission to simplify task management and boost productivity for individuals and teams worldwide. We believe that with the right tools, anyone can achieve their goals and make the most of their time.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Our Story</h3>
                <p className="text-muted-foreground">
                  Founded in 2023, TaskMaster was born out of a passion for productivity and a desire to create a tool that adapts to the way people work. Our team of dedicated professionals has worked tirelessly to develop a platform that&apos;s both powerful and user-friendly.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Our Values</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Simplicity in design</li>
                  <li>Continuous innovation</li>
                  <li>User-centric approach</li>
                  <li>Transparency and reliability</li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Join Our Journey</h3>
                <p className="text-muted-foreground">
                  We&apos;re constantly evolving and improving TaskMaster based on user feedback and technological advancements. Join us on our mission to revolutionize task management and unlock your full potential.
                </p>
                <Link href="/signup">
                  <Button variant="outline">Get Started Today</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container px-4 flex flex-col gap-8 md:h-24 md:flex-row md:items-center">
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="flex items-center gap-2">
              <ListTodo className="h-6 w-6" />
              <span className="font-semibold">TaskMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskMaster. All rights reserved.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:justify-end md:gap-6">
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Contact
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Twitter
              </Link>
              <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                GitHub
              </Link>
              <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


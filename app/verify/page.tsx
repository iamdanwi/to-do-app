"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



function VerifyContent() {
    const router = useRouter();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string | boolean>(false);
    const [verifying, setVerifying] = useState(false);

    const verifyUser = async (token: string) => {
        setVerifying(true); // Start the loading state
        try {
            const response = await axios.post("/api/users/verify", { token });
            if (response.status === 200) {
                setVerified(true);
                toast.success("Email verified successfully! Redirecting to login...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error || "Verification failed.");
                toast.error(error.response.data.error || "Verification failed.");

            } else {
                setError("An unexpected error occurred.");
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setVerifying(false); // End the loading state
        }
    }

    const searchParams = useSearchParams();
    useEffect(() => {
        const urlToken = searchParams.get("token") as string;
        if (urlToken) {
            setToken(urlToken);
        }
    }, [searchParams]);

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href="/" className="flex items-center gap-2">
                        TaskMaster
                    </Link>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;TaskMaster has transformed how we manage our projects. The intuitive interface and powerful features have significantly boosted our productivity.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis, Product Manager</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card>
                        <CardHeader className="text-center">
                            {verified ? (
                                <div className="flex flex-col items-center gap-2">
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                    <CardTitle>Email Verified!</CardTitle>
                                    <CardDescription>
                                        Your email has been successfully verified. Redirecting you to login...
                                    </CardDescription>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center gap-2">
                                    <XCircle className="h-8 w-8 text-red-500" />
                                    <CardTitle>Verification Failed</CardTitle>
                                    <CardDescription>{error}</CardDescription>
                                </div>
                            ) : (
                                <>
                                    <CardTitle>Verify Your Email</CardTitle>
                                    <CardDescription>
                                        Click the button below to verify your email address
                                    </CardDescription>
                                </>
                            )}
                        </CardHeader>
                        <CardContent>
                            {!verified && !error && (
                                <Button
                                    className="w-full"
                                    onClick={() => verifyUser(token)}
                                    disabled={verifying || !token}
                                >
                                    {verifying ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify Email'
                                    )}
                                </Button>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <div className="text-sm text-muted-foreground text-center">
                                Lost your verification link?{" "}
                                <Link
                                    href="/resend-verification"
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    Resend verification email
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}


export default function VerfiyPage() {
    return (
        <Suspense fallback={`<Loader2 className="mr-2 h-4 w-4 animate-spin" />`}>
            <VerifyContent />
        </Suspense>
    );
}